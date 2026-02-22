import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Noise, Glitch } from '@react-three/postprocessing';
import { BlurPass, Resizer, KernelSize, BlendFunction } from 'postprocessing';
import GridPlatform from './three/GridPlatform';
import ParticleField from './three/ParticleField';
import CameraController from './three/CameraController';
import ProjectNode from './three/ProjectNode';
import DataCore from './three/DataCore';

// Placeholder data for testing 3D nodes before API integration
const fallbackProjects = [
    { id: '1', title: 'ShieldCall', category: 'AI/ML', color: '#ff0055', position: [3, 1, 2] },
    { id: '2', title: 'CityWatch', category: 'IoT', color: '#00f0ff', position: [-3, 2, -2] },
    { id: '3', title: 'CrisisForge', category: 'Robotics', color: '#ffaa00', position: [0, 3, -4] },
    { id: '4', title: 'Hajeeri', category: 'Full-Stack', color: '#00ff88', position: [4, 0, -1] }
];

const HeroHub = ({ onNodeClick }) => {
    return (
        <div className="relative w-full h-screen bg-black overflow-hidden">
            {/* HUD Overlay */}
            <div className="absolute top-8 left-8 z-10 pointer-events-none mix-blend-screen">
                <h1 className="text-primary font-mono text-2xl md:text-4xl tracking-widest font-bold">
                    SANKET SHRIKANT KURVE
                </h1>
                <p className="text-secondary font-mono mt-2 tracking-widest text-sm md:text-base">
                    [FULL-STACK ENGINEER] / [SYSTEM ARCHITECT]
                </p>
            </div>

            {/* 3D Canvas */}
            <Canvas
                camera={{ position: [0, 5, 10], fov: 60 }}
                gl={{ antialias: true, alpha: false }}
            >
                <color attach="background" args={['#050508']} />

                <ambientLight intensity={0.2} />
                <directionalLight position={[10, 10, 5]} intensity={1} color="#00f0ff" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff0055" />

                <Suspense fallback={null}>
                    <GridPlatform />
                    <ParticleField />
                    <DataCore />

                    <group position={[0, -1, 0]}>
                        {fallbackProjects.map((proj) => (
                            <ProjectNode
                                key={proj.id}
                                project={proj}
                                onClick={() => onNodeClick(proj)}
                            />
                        ))}
                    </group>

                    <CameraController />

                    {/* Epic Cyberpunk Post-Processing */}
                    <EffectComposer multisampling={0}>
                        <Bloom
                            intensity={1.5}
                            luminanceThreshold={0.2}
                            luminanceSmoothing={0.9}
                            kernelSize={KernelSize.LARGE}
                        />
                        <ChromaticAberration
                            offset={[0.002, 0.002]}
                            blendFunction={BlendFunction.NORMAL}
                        />
                        <Noise opacity={0.05} />
                        {/* Short random glitches to make it feel alive */}
                        <Glitch
                            delay={[2, 10]}
                            duration={[0.1, 0.3]}
                            strength={[0.01, 0.05]}
                            active
                        />
                    </EffectComposer>
                </Suspense>

                <OrbitControls
                    enablePan={false}
                    enableZoom={true}
                    minDistance={3}
                    maxDistance={15}
                    maxPolarAngle={Math.PI / 2 - 0.1} // Prevent looking completely from below
                />
                <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
            </Canvas>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 font-mono text-gray-500 animate-bounce cursor-pointer flex flex-col items-center">
                <span>[SCROLL FOR ACCESS]</span>
                <span className="mt-2">↓</span>
            </div>
        </div>
    );
};

export default HeroHub;
