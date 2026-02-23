import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { EffectComposer, Glitch } from '@react-three/postprocessing';


import GridPlatform from './three/GridPlatform';
import ParticleField from './three/ParticleField';
import CameraController from './three/CameraController';
import ProjectNode from './three/ProjectNode';
import DataCore from './three/DataCore';
import GameOverlay from './GameOverlay';
import axios from 'axios';
import TextScramble from './TextScramble';

const HeroHub = ({ onNodeClick }) => {
    const [liveProjects, setLiveProjects] = useState([]);
    const [isMobile, setIsMobile] = useState(false);
    const [isOverridden, setIsOverridden] = useState(false);

    // Initial load: determine if mobile and fetch GitHub data
    useEffect(() => {
        const handleOverride = () => setIsOverridden(true);
        window.addEventListener('SYSTEM_OVERRIDE', handleOverride);

        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);

        const fetchGithubData = async () => {
            try {
                // Fetch up to 100 repositories to ensure we catch the specific ones
                const res = await axios.get('https://api.github.com/users/sanket200511/repos?sort=updated&per_page=100');

                // Explicitly allowed project keywords
                const allowedKeywords = ['citywatch', 'shieldcall', 'crisisforge', 'medical', 'football'];

                // Filter out forks and ONLY include allowed projects
                const filteredRepos = res.data.filter(repo => {
                    if (repo.fork) return false; // Exclude forks

                    const name = repo.name.toLowerCase();
                    return allowedKeywords.some(keyword => name.includes(keyword));
                }).slice(0, 6); // Take up to 6

                // Colors to randomly assign to GitHub projects
                const cyberColors = ['#ff0055', '#00f0ff', '#ffaa00', '#00ff88', '#b000ff', '#ffffff'];

                // Map the GitHub data into the format our 3D nodes expect
                const mappedProjects = filteredRepos.map((repo, idx) => {
                    // Generate a random orbit position (avoiding dead center)
                    const angle = (idx / filteredRepos.length) * Math.PI * 2;
                    const radius = isMobile ? 3 : 5 + Math.random() * 2;
                    const x = Math.cos(angle) * radius;
                    const z = Math.sin(angle) * radius;
                    const y = Math.random() * 3;

                    let customDesc = repo.description;
                    if (!customDesc || customDesc === 'No description provided.') {
                        const nameLower = repo.name.toLowerCase();
                        if (nameLower.includes('shieldcall')) customDesc = 'Standalone fraud detection AI algorithm analyzing voice patterns to flag and block threats.';
                        else if (nameLower.includes('citywatch')) customDesc = 'Real-time urban crime-prevention platform managing real-time data flow for safety reporting.';
                        else if (nameLower.includes('crisisforge')) customDesc = 'Advanced disaster relief and tactical coordination matrix.';
                        else if (nameLower.includes('football')) customDesc = 'Machine learning model predicting football transfer market valuations.';
                        else if (nameLower.includes('medical')) customDesc = 'Predictive diagnostic AI leveraging SVM & Random Forest models on 22+ health parameters.';
                        else customDesc = 'Encrypted data node containing classified source code algorithms.';
                    }

                    return {
                        id: repo.id.toString(),
                        title: repo.name,
                        category: repo.language || 'Code',
                        description: customDesc,
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

        return () => {
            window.removeEventListener('resize', checkMobile);
            window.removeEventListener('SYSTEM_OVERRIDE', handleOverride);
        };
    }, [isMobile]);

    return (
        <div id="hub" className="relative w-full h-screen bg-[#050508] overflow-hidden pt-24 md:pt-0">

            {/* HUD Overlay - Adjusted margin top to clear desktop Navbar */}
            <div className="absolute top-24 md:top-28 left-4 md:left-8 z-10 pointer-events-none mix-blend-screen w-full pr-4 text-glow-extreme">
                <h1 className={`font-black text-3xl md:text-5xl lg:text-7xl tracking-tighter break-words uppercase ${isOverridden ? 'text-[#ffd700] drop-shadow-[0_0_15px_rgba(255,215,0,0.8)]' : 'text-white drop-shadow-[0_0_15px_rgba(0,240,255,0.8)]'}`}>
                    <TextScramble text="SANKET" delay={0.5} duration={1.5} /> <span className={isOverridden ? 'text-white' : 'text-primary'}><TextScramble text="KURVE" delay={1.2} duration={1.5} /></span>
                </h1>
                <p className={`font-mono mt-2 tracking-widest text-xs md:text-sm lg:text-base glitch-text-minor ${isOverridden ? 'text-[#ffaa00]' : 'text-secondary'}`}>
                    {isOverridden ? '[MAINFRAME OVERRIDDEN]' : '[FULL-STACK DEVELOPER] // [SYSTEM ARCHITECT]'}
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

                <ambientLight intensity={0.1} />
                <directionalLight position={[10, 10, 5]} intensity={0.4} color={isOverridden ? "#ffaa00" : "#00f0ff"} />
                <pointLight position={[-10, -10, -10]} intensity={0.2} color={isOverridden ? "#ffffff" : "#ff0055"} />

                <Suspense fallback={null}>
                    <GridPlatform isOverridden={isOverridden} />
                    <ParticleField isOverridden={isOverridden} />
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

                </Suspense>

                <EffectComposer multisampling={0}>
                    <Glitch
                        delay={[2.5, 6]}
                        duration={[0.1, 0.3]}
                        strength={[0.01, 0.04]}
                        active
                    />
                </EffectComposer>

                <OrbitControls
                    enablePan={false}
                    enableZoom={!isMobile} // Disable zoom on mobile to prevent scrolling issues
                    minDistance={3}
                    maxDistance={20}
                    maxPolarAngle={Math.PI / 2 - 0.1} // Prevent looking completely from below
                />
            </Canvas>

            <GameOverlay />

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
