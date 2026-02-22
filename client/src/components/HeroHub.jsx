import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Noise, Glitch } from '@react-three/postprocessing';
import { BlurPass, Resizer, KernelSize, BlendFunction } from 'postprocessing';
import GridPlatform from './three/GridPlatform';
import ParticleField from './three/ParticleField';
import CameraController from './three/CameraController';
import ProjectNode from './three/ProjectNode';
import DataCore from './three/DataCore';
import axios from 'axios';

const HeroHub = ({ onNodeClick }) => {
    const [liveProjects, setLiveProjects] = useState([]);
    const [isMobile, setIsMobile] = useState(false);

    // Initial load: determine if mobile and fetch GitHub data
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);

        const fetchGithubData = async () => {
            try {
                // Fetch live public repositories for the user
                const res = await axios.get('https://api.github.com/users/sanket200511/repos?sort=updated&per_page=6');

                // Colors to randomly assign to GitHub projects
                const cyberColors = ['#ff0055', '#00f0ff', '#ffaa00', '#00ff88', '#b000ff', '#ffffff'];

                // Map the GitHub data into the format our 3D nodes expect
                const mappedProjects = res.data.map((repo, idx) => {
                    // Generate a random orbit position (avoiding dead center)
                    const angle = (idx / res.data.length) * Math.PI * 2;
                    const radius = isMobile ? 3 : 5 + Math.random() * 2;
                    const x = Math.cos(angle) * radius;
                    const z = Math.sin(angle) * radius;
                    const y = Math.random() * 3;

                    return {
                        id: repo.id.toString(),
                        title: repo.name,
                        category: repo.language || 'Code',
                        description: repo.description || 'No description provided.',
                        githubUrl: repo.html_url,
                        color: cyberColors[idx % cyberColors.length],
                        position: [x, y, z]
                    };
                });

                setLiveProjects(mappedProjects);
            } catch (error) {
                console.error("Failed to fetch GitHub Data, using fallbacks:", error);
                setLiveProjects([
                    { id: '1', title: 'ShieldCall', category: 'AI/ML', color: '#ff0055', position: [3, 1, 2] },
                    { id: '2', title: 'CityWatch', category: 'IoT', color: '#00f0ff', position: [-3, 2, -2] },
                    { id: '3', title: 'CrisisForge', category: 'Robotics', color: '#ffaa00', position: [0, 3, -4] }
                ]);
            }
        };

        fetchGithubData();

        return () => window.removeEventListener('resize', checkMobile);
    }, [isMobile]);

    return (
        <div id="hub" className="relative w-full h-screen bg-black overflow-hidden pt-24 md:pt-0">
            {/* HUD Overlay - Adjusted margin top to clear desktop Navbar */}
            <div className="absolute top-24 md:top-28 left-4 md:left-8 z-10 pointer-events-none mix-blend-screen w-full pr-4 text-glow-extreme">
                <h1 className="text-white font-black text-3xl md:text-5xl lg:text-7xl tracking-tighter break-words drop-shadow-[0_0_15px_rgba(0,240,255,0.8)] uppercase">
                    SANKET <span className="text-primary">KURVE</span>
                </h1>
                <p className="text-secondary font-mono mt-2 tracking-widest text-xs md:text-sm lg:text-base glitch-text-minor">
                    [FULL-STACK ENGINEER] // [SYSTEM ARCHITECT]
                </p>
            </div>

            {/* 3D Canvas */}
            <Canvas
                camera={{
                    position: [0, 5, isMobile ? 15 : 10], // Pull camera back on mobile
                    fov: isMobile ? 75 : 60
                }}
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
                        {liveProjects.map((proj) => (
                            <ProjectNode
                                key={proj.id}
                                project={proj}
                                onClick={() => onNodeClick(proj)}
                            />
                        ))}
                    </group>

                    {!isMobile && <CameraController />}

                    {/* Epic Cyberpunk Post-Processing - Removed disableNormalPass to re-enable 3D Clicks */}
                    <EffectComposer multisampling={0}>
                        <Bloom
                            intensity={isMobile ? 1.0 : 2.5}
                            luminanceThreshold={0.1}
                            luminanceSmoothing={0.9}
                            kernelSize={KernelSize.HUGE}
                        />
                        <ChromaticAberration
                            offset={[0.003, 0.003]}
                            blendFunction={BlendFunction.NORMAL}
                        />
                        <Noise opacity={0.08} />
                        {/* More aggressive glitch on Desktop */}
                        <Glitch
                            delay={[1.5, 5]}
                            duration={[0.1, 0.4]}
                            strength={[0.02, 0.1]}
                            active
                        />
                    </EffectComposer>
                </Suspense>

                <OrbitControls
                    enablePan={false}
                    enableZoom={!isMobile} // Disable zoom on mobile to prevent scrolling issues
                    minDistance={3}
                    maxDistance={20}
                    maxPolarAngle={Math.PI / 2 - 0.1} // Prevent looking completely from below
                />
            </Canvas>

            {/* Scroll indicator */}
            <div
                className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-10 font-mono text-gray-500 animate-bounce cursor-pointer flex flex-col items-center"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            >
                <span className="text-xs md:text-sm">[SCROLL FOR ACCESS]</span>
                <span className="mt-1 md:mt-2">↓</span>
            </div>
        </div>
    );
};

export default HeroHub;
