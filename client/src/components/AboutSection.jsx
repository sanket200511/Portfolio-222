import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Terminal from './Terminal';
import axios from 'axios';
import TextScramble from './TextScramble';

const AboutSection = () => {
    const [githubStats, setGithubStats] = useState({
        repos: 0,
        stars: 0,
        topLanguage: 'SCANNING...'
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const userRes = await axios.get('https://api.github.com/users/sanket200511');
                const reposRes = await axios.get('https://api.github.com/users/sanket200511/repos?per_page=100');

                let totalStars = 0;
                let langCount = {};

                reposRes.data.forEach(repo => {
                    totalStars += repo.stargazers_count;
                    if (repo.language) {
                        langCount[repo.language] = (langCount[repo.language] || 0) + 1;
                    }
                });

                // Find most used language
                let topLang = 'N/A';
                let max = 0;
                for (const [lang, count] of Object.entries(langCount)) {
                    if (count > max) {
                        max = count;
                        topLang = lang;
                    }
                }

                setGithubStats({
                    repos: userRes.data.public_repos,
                    stars: totalStars,
                    topLanguage: topLang
                });
            } catch (err) {
                console.error("Failed to parse GitHub profile metrics.");
            }
        };
        fetchStats();
    }, []);
    return (
        <section id="about" className="w-full bg-black relative flex items-center py-16 md:py-24 border-t border-white/10 z-10">
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Left Column: Text */}
                <div className="flex flex-col gap-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5 }}
                        className="inline-block border border-primary/30 bg-primary/10 text-primary px-3 py-1 text-xs font-mono tracking-widest w-max mb-2"
                    >
            // IDENTITY_MATRIX
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-3xl md:text-6xl leading-tight md:leading-none font-black font-sans tracking-tighter text-white mb-4 uppercase glitch-text-minor break-words w-full"
                    >
                        <TextScramble text="Engineer by day," delay={0} duration={1.5} /> <br className="hidden md:block" />
                        <span className="text-primary"><TextScramble text="Accessing the grid" delay={0.5} duration={1.5} /></span>
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="prose prose-invert prose-base md:prose-lg text-gray-400 font-sans leading-relaxed"
                    >
                        <p>
                            I am <span className="text-white font-medium">Sanket Shrikant Kurve</span>, a relentless Full-Stack Developer specializing in crafting highly scalable backend architectures and immersive frontend experiences.
                        </p>
                        <p>
                            With an arsenal encompassing <strong>Python, React, Node.js, and SQL</strong>, my logic is absolute. Whether utilizing <strong>Scikit-learn and Pandas</strong> for predictive modeling or architecting secure backends, I transform raw data into operational intelligence.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="mt-4 md:mt-8 flex gap-2 md:gap-4 font-mono text-xs md:text-sm"
                    >
                        <div className="border border-[#ff0055]/30 p-2 md:p-4 w-full text-center bg-black/50 backdrop-blur-sm group hover:border-[#ff0055] transition-colors cyber-glitch-hover">
                            <div className="text-[#ff0055] text-xl md:text-2xl font-bold mb-1">{githubStats.repos}</div>
                            <div className="text-gray-500 uppercase tracking-widest text-[8px] md:text-[10px] group-hover:text-white">Active Constructs</div>
                        </div>
                        <div className="border border-[#00f0ff]/30 p-2 md:p-4 w-full text-center bg-black/50 backdrop-blur-sm group hover:border-[#00f0ff] transition-colors cyber-glitch-hover">
                            <div className="text-[#00f0ff] text-xl md:text-2xl font-bold mb-1">{githubStats.stars}</div>
                            <div className="text-gray-500 uppercase tracking-widest text-[8px] md:text-[10px] group-hover:text-white">Total Stargazers</div>
                        </div>
                        <div className="border border-[#00ff88]/30 p-2 md:p-4 w-full text-center bg-black/50 backdrop-blur-sm group hover:border-[#00ff88] transition-colors cyber-glitch-hover">
                            <div className="text-[#00ff88] text-xl md:text-2xl font-bold mb-1 truncate">{githubStats.topLanguage}</div>
                            <div className="text-gray-500 uppercase tracking-widest text-[8px] md:text-[10px] group-hover:text-white">Primary Core Logic</div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                        className="mt-4"
                    >
                        <a
                            href="/Sanket_Kurve_Resume.pdf"
                            download="Sanket_Kurve_Resume.pdf"
                            className="inline-block bg-[#00f0ff]/10 border border-[#00f0ff] text-[#00f0ff] px-6 py-3 font-bold tracking-widest text-sm uppercase hover:bg-[#00f0ff] hover:text-black transition-all cyber-glitch-hover shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.8)] relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 w-0 bg-white group-hover:w-full transition-all duration-300 opacity-20 pointer-events-none"></div>
                            [DOWNLOAD DATA CORE]
                        </a>
                    </motion.div>
                </div>

                {/* Right Column: Terminal */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <Terminal />
                </motion.div>
            </div>

            {/* Background decorations */}
            <div className="absolute left-0 top-1/4 w-96 h-96 bg-primary/5 blur-[150px] rounded-full pointer-events-none"></div>
        </section>
    );
};

export default AboutSection;
