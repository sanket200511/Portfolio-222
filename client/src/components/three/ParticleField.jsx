import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleField = ({ isOverridden }) => {
    const count = 5000;
    const meshRef = useRef();
    const { size, viewport } = useThree();
    const aspect = size.width / viewport.width;

    // Initialize particles with random positions
    const { positions, velocities, originalPositions } = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const vel = new Float32Array(count * 3);
        const orig = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            // Widen spread, push deep into background
            const x = (Math.random() - 0.5) * 80;
            const y = (Math.random() - 0.5) * 80;
            const z = (Math.random() - 0.5) * 40 - 20;
            pos[i * 3] = x;
            pos[i * 3 + 1] = y;
            pos[i * 3 + 2] = z;
            orig[i * 3] = x;
            orig[i * 3 + 1] = y;
            orig[i * 3 + 2] = z;

            vel[i * 3] = (Math.random() - 0.5) * 0.05;
            vel[i * 3 + 1] = (Math.random() - 0.5) * 0.05;
            vel[i * 3 + 2] = (Math.random() - 0.5) * 0.05;
        }
        return { positions: pos, velocities: vel, originalPositions: orig };
    }, [count]);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame((state) => {
        // Mouse position normalized (-1 to +1)
        const mouseX = (state.pointer.x * viewport.width) / 2;
        const mouseY = (state.pointer.y * viewport.height) / 2;

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            // Current positions
            let px = positions[i3];
            let py = positions[i3 + 1];
            let pz = positions[i3 + 2];

            // Original positions for rubber-band return
            const ox = originalPositions[i3];
            const oy = originalPositions[i3 + 1];
            const oz = originalPositions[i3 + 2];

            // Distance from mouse in 2D space (ignoring Z for interaction ease)
            const dx = mouseX - px;
            const dy = mouseY - py;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Repulsion force from mouse
            const interactionRadius = 5;
            if (dist < interactionRadius) {
                const force = (interactionRadius - dist) / interactionRadius;
                velocities[i3] -= (dx / dist) * force * 0.02;
                velocities[i3 + 1] -= (dy / dist) * force * 0.02;
            }

            // Return force to original position
            velocities[i3] += (ox - px) * 0.001;
            velocities[i3 + 1] += (oy - py) * 0.001;
            velocities[i3 + 2] += (oz - pz) * 0.001;

            // Friction
            velocities[i3] *= 0.95;
            velocities[i3 + 1] *= 0.95;
            velocities[i3 + 2] *= 0.95;

            // Apply velocity
            positions[i3] += velocities[i3];
            positions[i3 + 1] += velocities[i3 + 1];
            positions[i3 + 2] += velocities[i3 + 2];

            // Update dummy instance
            dummy.position.set(positions[i3], positions[i3 + 1], positions[i3 + 2]);

            // Rotate slowly based on time
            dummy.rotation.x = state.clock.elapsedTime * 0.2 + i;
            dummy.rotation.y = state.clock.elapsedTime * 0.3 + i;

            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);
        }
        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[null, null, count]}>
            <icosahedronGeometry args={[0.05, 0]} />
            <meshBasicMaterial color={isOverridden ? "#ffd700" : "#00f0ff"} transparent opacity={0.6} blending={THREE.AdditiveBlending} />
        </instancedMesh>
    );
};

export default ParticleField;
