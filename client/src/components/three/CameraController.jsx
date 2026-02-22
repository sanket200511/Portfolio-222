import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const CameraController = () => {
    const parallaxOffset = useRef(new THREE.Vector3(0, 0, 0));

    useFrame((state) => {
        // Calculate very subtle parallax target
        const targetX = state.pointer.x * 0.5;
        const targetY = state.pointer.y * 0.5;

        // Smoothly move the parallax offset
        parallaxOffset.current.x = THREE.MathUtils.lerp(parallaxOffset.current.x, targetX, 0.05);
        parallaxOffset.current.y = THREE.MathUtils.lerp(parallaxOffset.current.y, targetY, 0.05);

        // Apply slight position nudge to the camera (additive, so it doesn't break OrbitControls)
        state.camera.position.x += (parallaxOffset.current.x - state.camera.position.x * 0.02) * 0.1;
        state.camera.position.y += (parallaxOffset.current.y - state.camera.position.y * 0.02) * 0.1;

        // Always look at the center of the grid (0,0,0) with a slight offset
        state.camera.lookAt(0, 1, 0);
    });

    return null;
};

export default CameraController;
