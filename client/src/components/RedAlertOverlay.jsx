import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RedAlertOverlay = () => {
    const [active, setActive] = useState(false);

    useEffect(() => {
        const handleTrigger = () => {
            setActive(true);
            document.body.classList.add('animate-screen-shake');

            setTimeout(() => {
                setActive(false);
                document.body.classList.remove('animate-screen-shake');
            }, 5000); // Stop after 5s
        };
        window.addEventListener('TRIGGER_RED_ALERT', handleTrigger);
        return () => {
            window.removeEventListener('TRIGGER_RED_ALERT', handleTrigger);
            document.body.classList.remove('animate-screen-shake');
        };
    }, []);

    return (
        <AnimatePresence>
            {active && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9998] pointer-events-none flex items-center justify-center bg-red-900/40 mix-blend-color-burn"
                >
                    <motion.div
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.5 }}
                        className="absolute inset-0 bg-red-600/20"
                    />
                    <motion.h1
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="text-6xl md:text-8xl font-black text-red-500 tracking-tighter text-center uppercase drop-shadow-[0_0_20px_rgba(255,0,0,0.8)]"
                    >
                        UNAUTHORIZED<br />ACCESS
                    </motion.h1>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default RedAlertOverlay;
