import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { soundManager } from '../../utils/audioEngine';

const DataCore = () => {
    const outerCoreRef = useRef();
    const innerCoreRef = useRef();
    const ringsRef = useRef();

    // Gamification State
    const [clicks, setClicks] = useState(0);
    const [isMeltdown, setIsMeltdown] = useState(false);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        // Speed up rotation based on clicks
        const speedMultiplier = isMeltdown ? 10 : 1 + (clicks * 0.5);

        if (outerCoreRef.current) {
            outerCoreRef.current.rotation.x = t * 0.2 * speedMultiplier;
            outerCoreRef.current.rotation.y = t * 0.3 * speedMultiplier;
            // Pulsing scale gets more violent with clicks
            const pulse = isMeltdown ?
                1 + Math.sin(t * 20) * 0.5 :
                1 + Math.sin(t * 2) * 0.05 + (clicks * 0.02);
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
        if (isMeltdown) return;

        soundManager.playKeyStroke(); // Tick sound
        const newClicks = clicks + 1;
        setClicks(newClicks);

        if (newClicks >= 10) {
            triggerMeltdown();
        }
    };

    const triggerMeltdown = () => {
        setIsMeltdown(true);
        soundManager.playAlert();
        window.dispatchEvent(new CustomEvent('TRIGGER_RED_ALERT'));

        // Modal logic can be tied to another global event that App.jsx listens for
        window.dispatchEvent(new CustomEvent('SHOW_EASTER_EGG_MODAL'));

        // Reset after meltdown sequence
        setTimeout(() => {
            setIsMeltdown(false);
            setClicks(0);
        }, 8000);
    };

    return (
        <group
            position={[0, 2, 0]}
            onClick={handleCoreClick}
            onPointerOver={() => document.body.style.cursor = 'crosshair'}
            onPointerOut={() => document.body.style.cursor = 'none'}
        >
            {/* Outer Wireframe Core */}
            <mesh ref={outerCoreRef}>
                <icosahedronGeometry args={[1.5, 1]} />
                <meshBasicMaterial
                    color={isMeltdown ? "#ff0000" : "#ff0055"}
                    wireframe={true}
                    transparent
                    opacity={0.3 + (clicks * 0.05)}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* Inner Solid Core */}
            <mesh ref={innerCoreRef}>
                <octahedronGeometry args={[0.8, 0]} />
                <meshStandardMaterial
                    color={isMeltdown ? "#ffffff" : "#00f0ff"}
                    emissive={isMeltdown ? "#ff0000" : "#00f0ff"}
                    emissiveIntensity={isMeltdown ? 5 : 2 + clicks}
                    roughness={0.2}
                    metalness={0.8}
                />
            </mesh>

            {/* Orbital Data Rings */}
            <group ref={ringsRef}>
                {[1, 2, 3].map((ring, i) => (
                    <mesh key={i} rotation={[Math.PI / 2 + (i * 0.2), 0, 0]}>
                        <torusGeometry args={[2 + i * 0.5, 0.02, 16, 100]} />
                        <meshBasicMaterial
                            color={isMeltdown ? "#ff0000" : (i % 2 === 0 ? "#00ff88" : "#ffaa00")}
                            transparent
                            opacity={0.5}
                            blending={THREE.AdditiveBlending}
                        />
                    </mesh>
                ))}
            </group>

            {/* Intense Core Glow */}
            <mesh scale={isMeltdown ? 2 : 1 + (clicks * 0.1)}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshBasicMaterial
                    color={isMeltdown ? "#ff0000" : "#00f0ff"}
                    transparent
                    opacity={0.15 + (clicks * 0.02)}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>
        </group>
    );
};

export default DataCore;
