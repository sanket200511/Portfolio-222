import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isClicking, setIsClicking] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference"
                animate={{
                    x: mousePos.x - 16,
                    y: mousePos.y - 16,
                    scale: isClicking ? 0.5 : 1
                }}
                transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
            >
                <svg viewBox="0 0 100 100" className="w-full h-full text-primary drop-shadow-[0_0_5px_rgba(0,240,255,1)]">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 10" />
                    <line x1="50" y1="0" x2="50" y2="20" stroke="currentColor" strokeWidth="4" />
                    <line x1="50" y1="80" x2="50" y2="100" stroke="currentColor" strokeWidth="4" />
                    <line x1="0" y1="50" x2="20" y2="50" stroke="currentColor" strokeWidth="4" />
                    <line x1="80" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="4" />
                    <circle cx="50" cy="50" r="5" fill="currentColor" />
                </svg>
            </motion.div>
        </>
    );
};

export default CustomCursor;
