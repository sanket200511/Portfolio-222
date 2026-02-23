import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { soundManager } from '../../utils/audioEngine';

const DataCore = () => {
    const outerCoreRef = useRef();
    const innerCoreRef = useRef();
    const ringsRef = useRef();

    // Gamification State
    const [clicks, setClicks] = useState(0);
    const [miners, setMiners] = useState(0);
    const [isOverridden, setIsOverridden] = useState(false);

    useEffect(() => {
        const handleMiner = (e) => setMiners(e.detail);
        const handleOverride = () => {
            setIsOverridden(true);
            soundManager.playAlert();
            window.dispatchEvent(new CustomEvent('SHOW_EASTER_EGG_MODAL'));
        };

        window.addEventListener('SPAWN_VISUAL_MINER', handleMiner);
        window.addEventListener('SYSTEM_OVERRIDE', handleOverride);
        return () => {
            window.removeEventListener('SPAWN_VISUAL_MINER', handleMiner);
            window.removeEventListener('SYSTEM_OVERRIDE', handleOverride);
        };
    }, []);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        // Speed up rotation based on clicks and miners
        const speedMultiplier = isOverridden ? 5 : 1 + (clicks * 0.01) + (miners * 0.5);

        if (outerCoreRef.current) {
            outerCoreRef.current.rotation.x = t * 0.2 * speedMultiplier;
            outerCoreRef.current.rotation.y = t * 0.3 * speedMultiplier;
            // Pulsing scale gets more violent with clicks
            const pulse = isOverridden ?
                1.5 + Math.sin(t * 10) * 0.2 :
                1 + Math.sin(t * 2) * 0.05 + Math.min(clicks * 0.005, 0.5);
            outerCoreRef.current.scale.set(pulse, pulse, pulse);
        }

        if (innerCoreRef.current) {
            innerCoreRef.current.rotation.x = -t * 0.5 * speedMultiplier;
            innerCoreRef.current.rotation.y = -t * 0.4 * speedMultiplier;
        }

        if (ringsRef.current) {
            ringsRef.current.rotation.z = t * 0.1 * speedMultiplier;
            ringsRef.current.rotation.x = Math.sin(t * 0.5 * speedMultiplier) * 0.2;
        }
    });

    const handleCoreClick = () => {
        soundManager.playKeyStroke(); // Tick sound
        setClicks(prev => prev + 1);

        // Tell GameOverlay to increase hash score
        const power = 1 + (isOverridden ? 50 : 0);
        window.dispatchEvent(new CustomEvent('ADD_HASH', { detail: power }));

        // Randomly spawn small click particles (handled by particle swarm later if needed)
    };

    // Colors determine final state
    const primaryColor = isOverridden ? "#ffd700" : "#00f0ff";
    const secondaryColor = isOverridden ? "#ffffff" : "#ff0055";

    return (
        <group
            position={[0, 2, 0]}
            onClick={handleCoreClick}
        >
            {/* Outer Wireframe Core */}
            <mesh ref={outerCoreRef}>
                <icosahedronGeometry args={[1.5, 1]} />
                <meshBasicMaterial
                    color={secondaryColor}
                    wireframe={true}
                    transparent
                    opacity={0.3 + Math.min(clicks * 0.005, 0.5)}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* Inner Solid Core */}
            <mesh ref={innerCoreRef}>
                <octahedronGeometry args={[0.8, 0]} />
                <meshStandardMaterial
                    color={primaryColor}
                    emissive={primaryColor}
                    emissiveIntensity={isOverridden ? 5 : 2 + Math.min(clicks * 0.01, 3)}
                    roughness={0.2}
                    metalness={0.8}
                />
            </mesh>

            {/* Build Visual Miners around the core */}
            {Array.from({ length: miners }).map((_, i) => (
                <MinerSatellite key={i} index={i} total={miners} isOverridden={isOverridden} />
            ))}

            {/* Orbital Data Rings */}
            <group ref={ringsRef}>
                {[1, 2, 3].map((ring, i) => (
                    <mesh key={i} rotation={[Math.PI / 2 + (i * 0.2), 0, 0]}>
                        <torusGeometry args={[2 + i * 0.5, 0.02, 16, 100]} />
                        <meshBasicMaterial
                            color={isOverridden ? "#ffaa00" : (i % 2 === 0 ? "#00ff88" : "#ffaa00")}
                            transparent
                            opacity={0.5}
                            blending={THREE.AdditiveBlending}
                        />
                    </mesh>
                ))}
            </group>

            {/* Intense Core Glow */}
            <mesh scale={isOverridden ? 1.5 : 1 + Math.min(clicks * 0.005, 0.5)}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshBasicMaterial
                    color={primaryColor}
                    transparent
                    opacity={0.15 + Math.min(clicks * 0.005, 0.4)}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>
        </group>
    );
};

// Component for orbiting auto-miners
const MinerSatellite = ({ index, total, isOverridden }) => {
    const meshRef = useRef();
    const offset = (index / total) * Math.PI * 2;
    const radius = 3 + (index * 0.2); // slight staggering
    const speed = 1 + (index * 0.1);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.position.x = Math.cos(t * speed + offset) * radius;
            meshRef.current.position.z = Math.sin(t * speed + offset) * radius;
            meshRef.current.position.y = Math.sin(t * speed * 2 + offset) * 0.5;
            meshRef.current.rotation.x += 0.05;
            meshRef.current.rotation.y += 0.05;
        }
    });

    return (
        <mesh ref={meshRef}>
            <boxGeometry args={[0.2, 0.2, 0.2]} />
            <meshBasicMaterial
                color={isOverridden ? "#ffffff" : "#00ff88"}
                wireframe={true}
            />
        </mesh>
    );
};

export default DataCore;
