import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleField = ({ count = 500 }) => {
    const meshRef = useRef();

    // Generate random positions and initial phases for particles
    const [positions, phases] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const ph = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            // Spread particles in a cylinder volume
            const radius = 2 + Math.random() * 15;
            const theta = Math.random() * 2 * Math.PI;
            const y = (Math.random() - 0.5) * 10;

            pos[i * 3] = radius * Math.cos(theta); // x
            pos[i * 3 + 1] = y;                    // y
            pos[i * 3 + 2] = radius * Math.sin(theta); // z

            ph[i] = Math.random() * Math.PI * 2;
        }
        return [pos, ph];
    }, [count]);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.getElapsedTime();

        // Animate positions for subtle drift
        const posAttribute = meshRef.current.geometry.attributes.position;
        for (let i = 0; i < count; i++) {
            const idx = i * 3 + 1; // get Y coordinate

            // Floating up and down based on phase
            const originalY = positions[idx];
            posAttribute.array[idx] = originalY + Math.sin(time * 0.5 + phases[i]) * 0.5;
        }
        posAttribute.needsUpdate = true;

        // Slow rotation of entire particle field
        meshRef.current.rotation.y = time * 0.05;
    });

    return (
        <points ref={meshRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                color="#00f0ff"
                transparent
                opacity={0.6}
                blending={THREE.AdditiveBlending}
                sizeAttenuation={true}
            />
        </points>
    );
};

export default ParticleField;
