import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import TextScramble from './TextScramble';

const ExperienceSection = () => {
    const experiences = [
        {
            id: 'exp1',
            role: "Software Engineering Intern",
            company: "Infosys SpringBoard",
            date: "Oct 2025 - Dec 2025",
            details: [
                "Architected a hybrid machine learning engine utilizing Python scripts to process over 900,000 records.",
                "Optimized backend data retrieval and SQL queries to reduce real-time inference latency to 45ms.",
                "Gained exposure to professional software development lifecycles (SDLC) and system documentation."
            ]
        },
        {
            id: 'exp2',
            role: "Software Engineering Intern",
            company: "Micronet",
            date: "Jan 2025 - Mar 2025",
            details: [
                "Engineered a multi-disease diagnostic platform integrating 5 specialized ML models for clinical prediction.",
                "Wrote efficient Python logic for data preprocessing, improving data ingestion speed by 30%.",
                "Collaborated with the team to define system requirements and performed testing to ensure accuracy."
            ]
        }
    ];

    const education = [
        {
            id: 'edu1',
            degree: "B.Tech in Computer Science & Engineering",
            school: "S B Jain Institute of Technology",
            date: "2023 - 2027",
            details: "CGPA: 8.3/10 | Coursework: DBMS, Data Structures, OOP, Full-Stack"
        },
        {
            id: 'edu2',
            degree: "Higher Secondary Certificate (HSC)",
            school: "Vishwas Junior College",
            date: "2021 - 2023",
            details: "Nagpur, India"
        }
    ];

    const achievements = [
        "Google Cloud Arcade Champion & Legend",
        "Winner of HackInverse 0.5",
        "Top 10 Finalist in HackNagpur 2.0 & ByteQuest",
        "Meta Back-End & Front-End Developer (Coursera)",
        "Data Science for Engineers & DSA in Python (NPTEL)",
        "Google AI Essentials"
    ];

    return (
        <section id="history" className="w-full bg-[#050508]/80 backdrop-blur-sm relative py-16 md:py-24 border-t border-white/10 z-10">
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    className="mb-16"
                >
                    <div className="inline-block border border-primary/30 bg-primary/10 text-primary px-3 py-1 text-xs font-mono tracking-widest mb-4">
                        // OPERATIONAL_HISTORY
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black font-sans tracking-tighter text-white uppercase glitch-text-minor">
                        <TextScramble text="Timeline" delay={0} duration={1.5} />{" "}
                        <span className="text-[#ff0055]"><TextScramble text="Records" delay={0.5} duration={1.5} /></span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* Left Column: Experience */}
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4 font-mono tracking-widest text-[#00f0ff]">
                            <TextScramble text="[EXPERIENCE_LOGS]" delay={0.8} duration={1} />
                        </h3>
                        <div className="space-y-8">
                            {experiences.map((exp, idx) => (
                                <motion.div
                                    key={exp.id}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.5, delay: idx * 0.2 }}
                                >
                                    <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} glareEnable={true} glareMaxOpacity={0.15} glareColor="#00f0ff" scale={1.02} transitionSpeed={1500} className="border-l-2 border-[#00f0ff]/30 pl-6 p-4 relative group hover:border-[#00f0ff] transition-all bg-white/5 hover:bg-white/10 rounded overflow-hidden">
                                        <div className="absolute w-3 h-3 bg-black border-2 border-[#00f0ff] rounded-full -left-[7px] top-5 group-hover:bg-[#00f0ff] group-hover:shadow-[0_0_15px_#00f0ff] transition-all" />
                                        <h4 className="text-xl font-bold text-white group-hover:text-[#00f0ff] transition-colors">{exp.role}</h4>
                                        <div className="text-sm font-mono text-gray-400 mb-2">{exp.company} <span className="text-[#ff0055] ml-2">// {exp.date}</span></div>
                                        <ul className="space-y-2 mt-4 text-gray-300 font-sans text-sm md:text-base relative z-10">
                                            {exp.details.map((detail, i) => (
                                                <li key={i} className="flex gap-2 relative">
                                                    <span className="text-[#ff0055] font-bold">{">"}</span>
                                                    <span>{detail}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </Tilt>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Education & Certs */}
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4 font-mono tracking-widest text-[#ffaa00]">
                            <TextScramble text="[TRAINING_DATA]" delay={1.2} duration={1} />
                        </h3>
                        <div className="space-y-8 mb-16">
                            {education.map((edu, idx) => (
                                <motion.div
                                    key={edu.id}
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.5, delay: idx * 0.2 }}
                                >
                                    <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} glareEnable={true} glareMaxOpacity={0.15} glareColor="#ffaa00" scale={1.02} transitionSpeed={1500} className="border-l-2 border-[#ffaa00]/30 pl-6 p-4 relative group hover:border-[#ffaa00] transition-all bg-white/5 hover:bg-white/10 rounded overflow-hidden">
                                        <div className="absolute w-3 h-3 bg-black border-2 border-[#ffaa00] rounded-full -left-[7px] top-5 group-hover:bg-[#ffaa00] group-hover:shadow-[0_0_15px_#ffaa00] transition-all" />
                                        <h4 className="text-lg font-bold text-white relative z-10">{edu.degree}</h4>
                                        <div className="text-sm font-mono text-gray-400 mb-1 relative z-10">{edu.school}</div>
                                        <div className="text-xs font-mono text-[#00f0ff] relative z-10">{edu.date}</div>
                                        <p className="mt-2 text-sm text-gray-300 relative z-10">{edu.details}</p>
                                    </Tilt>
                                </motion.div>
                            ))}
                        </div>

                        {/* Achievements */}
                        <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-2 font-mono tracking-widest text-[#00ff88]">
                            [CERTIFICATIONS]
                        </h3>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5 }}
                            className="bg-primary/5 border border-primary/20 p-6 cyber-glitch-hover"
                        >
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-300 font-sans">
                                {achievements.map((ach, idx) => (
                                    <li key={idx} className="flex gap-2 items-start">
                                        <span className="text-[#00ff88] mt-0.5 font-mono">{"[*]"}</span>
                                        <span>{ach}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ExperienceSection;
