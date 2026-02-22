import { motion } from 'framer-motion';
import Terminal from './Terminal';

const AboutSection = () => {
    return (
        <section id="about" className="min-h-screen w-full bg-black relative flex items-center py-24 border-t border-white/10 z-10">
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
                        className="text-3xl md:text-5xl font-bold font-sans tracking-tight text-white mb-4 leading-tight"
                    >
                        Engineer by day, <br className="hidden md:block" /> Accessing the Grid by night.
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
                            My expertise bridges the gap between raw data and human interaction. Whether it's training AI models for threat detection or building complex cyber-physical interfaces to visualize that data, my logic is absolute.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="mt-4 md:mt-8 flex gap-2 md:gap-4 font-mono text-xs md:text-sm"
                    >
                        <div className="border border-white/20 p-2 md:p-4 w-full text-center bg-black/50 backdrop-blur-sm">
                            <div className="text-primary text-xl md:text-2xl font-bold mb-1">5+</div>
                            <div className="text-gray-500 uppercase tracking-widest text-[8px] md:text-[10px]">Projects Deployed</div>
                        </div>
                        <div className="border border-white/20 p-2 md:p-4 w-full text-center bg-black/50 backdrop-blur-sm">
                            <div className="text-primary text-xl md:text-2xl font-bold mb-1">10k+</div>
                            <div className="text-gray-500 uppercase tracking-widest text-[8px] md:text-[10px]">Lines of Code</div>
                        </div>
                        <div className="border border-white/20 p-2 md:p-4 w-full text-center bg-black/50 backdrop-blur-sm">
                            <div className="text-primary text-xl md:text-2xl font-bold mb-1">24/7</div>
                            <div className="text-gray-500 uppercase tracking-widest text-[8px] md:text-[10px]">System Uptime</div>
                        </div>
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
