import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MeltdownModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleTrigger = () => {
            setIsOpen(true);
        };
        window.addEventListener('SHOW_EASTER_EGG_MODAL', handleTrigger);
        return () => window.removeEventListener('SHOW_EASTER_EGG_MODAL', handleTrigger);
    }, []);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
            >
                <motion.div
                    initial={{ scale: 0.8, y: 50, rotateX: 45 }}
                    animate={{ scale: 1, y: 0, rotateX: 0 }}
                    transition={{ type: 'spring', damping: 15 }}
                    className="max-w-xl w-full bg-[#050508] border border-[#00f0ff] p-8 shadow-[0_0_50px_rgba(0,240,255,0.2)]"
                >
                    <div className="flex justify-between items-start border-b border-gray-800 pb-4 mb-6">
                        <div>
                            <h2 className="text-2xl font-black text-white tracking-widest uppercase">
                                <span className="text-[#00f0ff]">CLASSIFIED</span> // DATA RECOVERED
                            </h2>
                            <p className="text-xs font-mono text-gray-500 mt-1">FILE: CORE_MEMORY.DAT // ENCRYPTION: BROKEN</p>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-500 hover:text-white cyber-glitch-hover p-2 font-mono"
                        >
                            [X]
                        </button>
                    </div>

                    <div className="space-y-4 font-mono text-sm leading-relaxed text-gray-300">
                        <p>
                            &gt; SYSTEM LOG: You actually pushed the core to critical mass.
                        </p>
                        <p>
                            I respect the dedication to finding every hidden corner of this system. Not many people click furiously enough to break a 3D WebGL construct.
                        </p>
                        <p className="text-[#00f0ff] font-bold">
                            You've officially found the final easter egg.
                        </p>
                        <p>
                            If you’re a recruiter or hiring manager... I think this proves I’m not just a developer. I build experiences. Let’s talk.
                        </p>
                    </div>

                    <div className="mt-8 flex justify-end">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="px-6 py-2 bg-[#00f0ff]/10 border border-[#00f0ff] text-[#00f0ff] font-bold tracking-widest hover:bg-[#00f0ff] hover:text-black transition-colors cyber-glitch-hover"
                        >
                            ACKNOWLEDGE
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default MeltdownModal;
