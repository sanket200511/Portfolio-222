import React from 'react';
import { motion } from 'framer-motion';
import { soundManager } from '../utils/audioEngine'; // Ensure sound manager is imported
import TextScramble from './TextScramble';

const ContactSection = () => {
    return (
        <section id="contact" className="py-24 relative z-10 bg-black/90 backdrop-blur-lg border-t border-gray-800">
            {/* Background cyber pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'repeating-linear-gradient(45deg, #00f0ff 25%, transparent 25%, transparent 75%, #00f0ff 75%, #00f0ff), repeating-linear-gradient(45deg, #00f0ff 25%, #000 25%, #000 75%, #00f0ff 75%, #00f0ff)', backgroundPosition: '0 0, 10px 10px', backgroundSize: '20px 20px' }}
            ></div>

            <div className="max-w-6xl mx-auto px-6 relative">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <h2 className="text-4xl md:text-6xl font-black font-sans text-white uppercase tracking-tighter mb-4 glitch-text-minor">
                        <TextScramble text="Establish Connection" delay={0} duration={1.5} />
                    </h2>
                    <p className="text-gray-400 font-mono text-xs md:text-sm mb-8 md:mb-12 max-w-2xl mx-auto px-4 md:px-0">
                        My comms node is currently open. Whether you have a secure contract or just want to ping my server, drop a message.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center px-4">
                        <button
                            className="w-full sm:w-auto bg-red-900/30 border border-red-500 text-red-500 px-4 md:px-6 py-3 font-bold tracking-widest text-xs md:text-sm uppercase hover:bg-red-500 hover:text-black transition-colors cyber-glitch-hover"
                            onMouseEnter={() => soundManager.playHover()}
                            onClick={() => window.location.href = 'mailto:sanketkurve.2005@gmail.com'}
                        >
                            INITIATE PING
                        </button>

                        <button
                            className="w-full sm:w-auto bg-transparent border border-gray-700 text-gray-400 px-4 md:px-6 py-3 font-bold tracking-widest text-xs md:text-sm uppercase hover:border-primary hover:text-primary transition-colors cyber-glitch-hover"
                            onMouseEnter={() => soundManager.playHover()}
                            onClick={() => window.open('https://github.com/sanket200511', '_blank')}
                        >
                            DATA_REPO
                        </button>

                        <button
                            className="w-full sm:w-auto bg-transparent border border-[#00f0ff]/50 text-[#00f0ff] px-4 md:px-6 py-3 font-bold tracking-widest text-xs md:text-sm uppercase hover:bg-[#00f0ff] hover:text-black transition-colors cyber-glitch-hover"
                            onMouseEnter={() => soundManager.playHover()}
                            onClick={() => window.location.href = 'tel:+918799839743'}
                        >
                            COMMLINK
                        </button>

                        <button
                            className="w-full sm:w-auto bg-transparent border border-[#00ff88]/50 text-[#00ff88] px-4 md:px-6 py-3 font-bold tracking-widest text-xs md:text-sm uppercase hover:bg-[#00ff88] hover:text-black transition-colors cyber-glitch-hover"
                            onMouseEnter={() => soundManager.playHover()}
                            onClick={() => window.open('https://www.linkedin.com/in/sanket-kurve-03a8b3196', '_blank')}
                        >
                            PROFESSIONAL_NODE
                        </button>
                    </div>
                </motion.div>
            </div>

            <footer className="absolute bottom-0 w-full p-4 text-center border-t border-gray-900">
                <p className="text-gray-600 font-mono text-[10px] tracking-[0.3em]">
                    // SYSTEM AUTHOR: SANKET SHRIKANT KURVE // ALL PROTOCOLS SECURED // 2026 //
                </p>
            </footer>
        </section>
    );
};

export default ContactSection;
