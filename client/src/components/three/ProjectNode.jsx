import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

const ProjectNode = ({ project, onClick }) => {
    const meshRef = useRef();
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
        if (!meshRef.current) return;

        const time = state.clock.getElapsedTime();
        // Idle bobbing / rotation
        meshRef.current.rotation.x = time * 0.5;
        meshRef.current.rotation.y = time * 0.3;

        // Hover scale animation
        const targetScale = hovered ? 1.5 : 1;
        meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    });

    return (
        <group
            position={project.position}
            onClick={(e) => { e.stopPropagation(); onClick(); }}
            onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
            onPointerOut={(e) => { e.stopPropagation(); setHovered(false); document.body.style.cursor = 'auto'; }}
        >
            <mesh ref={meshRef}>
                <octahedronGeometry args={[0.5, 0]} />
                <meshStandardMaterial
                    color={project.color}
                    emissive={project.color}
                    emissiveIntensity={hovered ? 2 : 0.5}
                    wireframe={true}
                />
            </mesh>

            {/* Node Label via HTML Overlay - Add pointerEvents none to wrapper to prevent raycast blocking */}
            <Html position={[0, -0.8, 0]} center zIndexRange={[100, 0]} style={{ pointerEvents: 'none' }}>
                <div
                    className={`transition-all duration-300 font-mono text-center pointer-events-none
            ${hovered ? 'opacity-100 scale-110' : 'opacity-20 scale-100'}`}
                >
                    <div className="text-xs text-white bg-black/50 px-2 py-1 rounded border border-white/20 backdrop-blur-sm shadow-[0_0_10px_rgba(0,0,0,0.5)] max-w-[150px] whitespace-normal break-words mx-auto">
                        <span style={{ color: project.color }}>[{project.category}]</span><br />
                        {project.title}
                    </div>
                </div>
            </Html>

            {/* Core glow */}
            <mesh>
                <sphereGeometry args={[0.2, 16, 16]} />
                <meshBasicMaterial color={project.color} transparent opacity={0.8} />
            </mesh>
        </group>
    );
};

export default ProjectNode;
