import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isClicking, setIsClicking] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        const handleMouseOver = (e) => {
            if (e.target.closest('a, button, [role="button"], input, textarea, select')) {
                setIsHovering(true);
            }
        };

        const handleMouseOut = (e) => {
            if (e.target.closest('a, button, [role="button"], input, textarea, select')) {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('mouseout', handleMouseOut);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mouseout', handleMouseOut);
        };
    }, []);

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999999] mix-blend-screen"
                animate={{
                    x: mousePos.x - 16,
                    y: mousePos.y - 16,
                    scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
                    rotate: isHovering ? 45 : 0
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                <svg viewBox="0 0 100 100" className={`w-full h-full transition-colors duration-300 ${isHovering ? "drop-shadow-[0_0_15px_rgba(255,0,85,0.8)]" : "drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"}`}>
                    <circle cx="50" cy="50" r="40" fill="none" stroke={isHovering ? "#ff0055" : "#ffffff"} strokeWidth="3" strokeDasharray="10 10" className="transition-colors duration-300" />
                    <line x1="50" y1="0" x2="50" y2="20" stroke={isHovering ? "#ff0055" : "#ffffff"} strokeWidth="4" className="transition-colors duration-300" />
                    <line x1="50" y1="80" x2="50" y2="100" stroke={isHovering ? "#00f0ff" : "#00f0ff"} strokeWidth="4" className="transition-colors duration-300" />
                    <line x1="0" y1="50" x2="20" y2="50" stroke={isHovering ? "#00f0ff" : "#00f0ff"} strokeWidth="4" className="transition-colors duration-300" />
                    <line x1="80" y1="50" x2="100" y2="50" stroke={isHovering ? "#ff0055" : "#ffffff"} strokeWidth="4" className="transition-colors duration-300" />
                    <circle cx="50" cy="50" r="8" fill={isHovering ? "#00f0ff" : "#ff0055"} className="transition-colors duration-300" />
                </svg>
            </motion.div>
        </>
    );
};

export default CustomCursor;
