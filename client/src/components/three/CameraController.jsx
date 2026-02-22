import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const CameraController = () => {
    const targetPosition = useRef(new THREE.Vector3(0, 5, 12)); // Base camera position
    const currentPosition = useRef(new THREE.Vector3(0, 5, 12));

    useFrame((state) => {
        // Calculate parallax target based on mouse pointer (-1 to +1)
        // Multipliers define how far the camera swings
        const parallaxX = state.pointer.x * 3;
        const parallaxY = state.pointer.y * 3; // Inverted mostly feels better, but we leave it direct here

        targetPosition.current.set(
            parallaxX,
            5 + parallaxY,
            12
        );

        // Exponential smoothing (lerp) for buttery smooth camera movement
        currentPosition.current.lerp(targetPosition.current, 0.05);

        // Apply position
        state.camera.position.copy(currentPosition.current);

        // Always look at the center of the grid (0,0,0) with a slight offset
        state.camera.lookAt(0, 1, 0);
    });

    return null;
};

export default CameraController;
