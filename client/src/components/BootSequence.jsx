import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useTypewriter from '../hooks/useTypewriter';

const BootSequence = ({ onComplete }) => {
    const [phase, setPhase] = useState(0);

    // Line 1
    const line1 = useTypewriter('[INITIALIZING SENTINEL GRID v3.7.1...]', 40, 500);

    // Sequence delays
    useEffect(() => {
        if (line1.isDone && phase === 0) {
            setTimeout(() => setPhase(1), 800);
        }
        if (phase === 1) {
            setTimeout(() => setPhase(2), 2000);
        }
    }, [line1.isDone, phase]);

    const modules = [
        { name: 'C', delay: 100 },
        { name: 'Java', delay: 300 },
        { name: 'Python', delay: 600 },
        { name: 'React', delay: 900 },
        { name: 'NodeJS', delay: 1200 },
        { name: 'Express', delay: 1400 },
        { name: 'MongoDB', delay: 1600 }
    ];

    return (
        <motion.div
            className="fixed inset-0 bg-black text-primary font-mono flex flex-col p-8 md:p-16 z-[100]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
        >
            <div className="max-w-3xl w-full mx-auto flex flex-col gap-4 text-sm md:text-lg">
                <div>
                    {line1.displayText}
                    {line1.isTyping && <span className="animate-pulse">_</span>}
                </div>

                {phase >= 1 && (
                    <div className="flex flex-col gap-2">
                        <div>[LOADING MODULES...]</div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-2 pl-4">
                            {modules.map((mod, i) => (
                                <ModuleLoad key={mod.name} name={mod.name} startDelay={mod.delay} />
                            ))}
                        </div>
                    </div>
                )}

                {phase >= 2 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-8 flex flex-col gap-2"
                    >
                        <div>[STATUS CHECKS]</div>
                        <div className="text-secondary pl-4">✓ FIREWALL: ACTIVE</div>
                        <div className="text-secondary pl-4">✓ ENCRYPTION: AES-256</div>
                        <div className="text-secondary pl-4 underline decoration-secondary underline-offset-4">✓ STATUS: OPERATIONAL</div>

                        <motion.div
                            className="mt-12 text-center text-2xl md:text-5xl font-bold tracking-widest text-white drop-shadow-[0_0_15px_rgba(0,255,136,1)]"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 1, duration: 0.5 }}
                            onAnimationComplete={() => setTimeout(onComplete, 2000)}
                        >
                            [ACCESS GRANTED]
                        </motion.div>
                    </motion.div>
                )}
            </div>

            {/* Decorative Scanlines */}
            <div className="pointer-events-none fixed inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-black to-black"></div>
        </motion.div>
    );
};

const ModuleLoad = ({ name, startDelay }) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setLoaded(true), startDelay);
        return () => clearTimeout(timer);
    }, [startDelay]);

    return (
        <div className="flex justify-between items-center w-full">
            <span>{name}</span>
            <span className={loaded ? "text-secondary" : "text-gray-600 animate-pulse"}>
                {loaded ? "[OK]" : "[WAIT]"}
            </span>
        </div>
    );
};

export default BootSequence;
