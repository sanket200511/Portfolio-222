import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const DataCore = () => {
    const outerCoreRef = useRef();
    const innerCoreRef = useRef();
    const ringsRef = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        if (outerCoreRef.current) {
            outerCoreRef.current.rotation.x = t * 0.2;
            outerCoreRef.current.rotation.y = t * 0.3;
            // Pulsing scale
            const scale = 1 + Math.sin(t * 2) * 0.05;
            outerCoreRef.current.scale.set(scale, scale, scale);
        }

        if (innerCoreRef.current) {
            innerCoreRef.current.rotation.x = -t * 0.5;
            innerCoreRef.current.rotation.y = -t * 0.4;
        }

        if (ringsRef.current) {
            ringsRef.current.rotation.z = t * 0.1;
            ringsRef.current.rotation.x = Math.sin(t * 0.5) * 0.2;
        }
    });

    return (
        <group position={[0, 2, 0]}>
            {/* Outer Wireframe Core */}
            <mesh ref={outerCoreRef}>
                <icosahedronGeometry args={[1.5, 1]} />
                <meshBasicMaterial
                    color="#ff0055"
                    wireframe={true}
                    transparent
                    opacity={0.3}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* Inner Solid Core */}
            <mesh ref={innerCoreRef}>
                <octahedronGeometry args={[0.8, 0]} />
                <meshStandardMaterial
                    color="#00f0ff"
                    emissive="#00f0ff"
                    emissiveIntensity={2}
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
                            color={i % 2 === 0 ? "#00ff88" : "#ffaa00"}
                            transparent
                            opacity={0.5}
                            blending={THREE.AdditiveBlending}
                        />
                    </mesh>
                ))}
            </group>

            {/* Intense Core Glow */}
            <mesh>
                <sphereGeometry args={[1, 32, 32]} />
                <meshBasicMaterial color="#00f0ff" transparent opacity={0.15} blending={THREE.AdditiveBlending} />
            </mesh>
        </group>
    );
};

export default DataCore;
