import { motion } from 'framer-motion';

// Mock data until API is wired up
const fallbackSkills = [
    { _id: '1', name: 'React.js', category: 'Frontend', proficiency: 95 },
    { _id: '2', name: 'Three.js', category: 'Frontend', proficiency: 85 },
    { _id: '3', name: 'TailwindCSS', category: 'Frontend', proficiency: 90 },
    { _id: '4', name: 'Node.js', category: 'Backend', proficiency: 92 },
    { _id: '5', name: 'Express', category: 'Backend', proficiency: 90 },
    { _id: '6', name: 'Python', category: 'Language', proficiency: 88 },
    { _id: '7', name: 'MongoDB', category: 'Database', proficiency: 85 },
    { _id: '8', name: 'Cyber Defense', category: 'Tool', proficiency: 80 }
];

const SkillsArsenal = () => {
    return (
        <section id="arsenal" className="min-h-screen w-full bg-[#0a0a0f] relative py-24 border-t border-white/10 z-10 overflow-hidden">

            {/* Target Reticle Decoration */}
            <div className="absolute right-10 top-20 w-32 h-32 border border-primary/20 rounded-full flex items-center justify-center opacity-30 pointer-events-none">
                <div className="w-24 h-24 border border-dashed border-primary/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
                <div className="absolute w-full h-[1px] bg-primary/20"></div>
                <div className="absolute h-full w-[1px] bg-primary/20"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="mb-16"
                >
                    <div className="inline-block border border-red-500/30 bg-red-500/10 text-red-400 px-3 py-1 text-xs font-mono tracking-widest mb-4">
            // WEAPONS_CACHE_FOUND
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold font-sans tracking-tight text-white">
                        The Arsenal
                    </h2>
                    <p className="mt-4 text-gray-400 font-mono text-sm max-w-xl">
                        A comprehensive overview of operational capabilities. Tools and technologies mastered to engineer scalable ecosystems and neutralize architectural threats.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {fallbackSkills.map((skill, index) => (
                        <SkillBar key={skill._id} skill={skill} index={index} />
                    ))}
                </div>
            </div>

            <div className="scanline-effect opacity-10"></div>
        </section>
    );
};

const SkillBar = ({ skill, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white/5 border border-white/10 p-4 hover:border-primary/50 hover:bg-white/10 transition-colors group"
        >
            <div className="flex justify-between items-end mb-2">
                <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-gray-500">[{skill.category}]</span>
                    <h3 className="text-xl font-bold tracking-wider text-gray-200 group-hover:text-white group-hover:text-glow transition-all">
                        {skill.name}
                    </h3>
                </div>
                <span className="font-mono text-xs text-primary">{skill.proficiency}%</span>
            </div>

            <div className="h-1 w-full bg-black relative overflow-hidden">
                <motion.div
                    className="absolute top-0 left-0 h-full bg-primary"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.proficiency}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 + (index * 0.1), ease: "easeOut" }}
                    style={{ boxShadow: "0 0 10px rgba(0,240,255,0.8)" }}
                />
            </div>
        </motion.div>
    );
};

export default SkillsArsenal;
