import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Grid } from '@react-three/drei';
import * as THREE from 'three';

const GridPlatform = () => {
    const gridRef = useRef();

    useFrame((state) => {
        if (gridRef.current) {
            // Subtle pulsing effect on the material opacity
            const t = state.clock.getElapsedTime();
            gridRef.current.material.opacity = 0.2 + Math.sin(t) * 0.1;
        }
    });

    return (
        <group position={[0, -2, 0]}>
            <Grid
                ref={gridRef}
                args={[30, 30]}
                cellSize={1}
                cellThickness={1}
                cellColor="#00f0ff"
                sectionSize={5}
                sectionThickness={1.5}
                sectionColor="#0055ff"
                fadeDistance={25}
                fadeStrength={1}
            />

            {/* Glow under the grid */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
                <planeGeometry args={[30, 30]} />
                <meshBasicMaterial
                    color="#00f0ff"
                    transparent
                    opacity={0.05}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>
        </group>
    );
};

export default GridPlatform;
