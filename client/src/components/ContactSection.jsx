import React from 'react';
import { motion } from 'framer-motion';
import { soundManager } from '../utils/audioEngine'; // Ensure sound manager is imported

const ContactSection = () => {
    return (
        <section id="contact" className="py-24 relative z-10 bg-black border-t border-gray-800">
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
                    <h2 className="text-3xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">
                        Establish Connection
                    </h2>
                    <p className="text-gray-400 font-mono text-xs md:text-sm mb-8 md:mb-12 max-w-2xl mx-auto px-4 md:px-0">
                        My comms node is currently open. Whether you have a secure contract or just want to ping my server, drop a message.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center px-4">
                        <button
                            className="w-full sm:w-auto bg-red-900/30 border border-red-500 text-red-500 px-6 md:px-8 py-3 md:py-4 font-bold tracking-widest text-sm md:text-base uppercase hover:bg-red-500 hover:text-black transition-colors cyber-glitch-hover"
                            onMouseEnter={() => soundManager.playHover()}
                            onClick={() => window.location.href = 'mailto:contact@sanket.com'}
                        >
                            INITIATE PING
                        </button>

                        <button
                            className="w-full sm:w-auto bg-transparent border border-gray-700 text-gray-400 px-6 md:px-8 py-3 md:py-4 font-bold tracking-widest text-sm md:text-base uppercase hover:border-primary hover:text-primary transition-colors cyber-glitch-hover"
                            onMouseEnter={() => soundManager.playHover()}
                            onClick={() => window.open('https://github.com/sanket200511', '_blank')}
                        >
                            LOCATE DATA_REPO
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
