import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';

const TextScramble = ({ text, className, delay = 0, duration = 1.5 }) => {
    const [displayText, setDisplayText] = useState('');
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (!isInView) {
            setDisplayText('');
            return;
        }

        let frame = 0;
        let animationFrameId;
        const totalFrames = duration * 60; // 60fps assumption

        // Queue representing which letters are locked and which are still scrambling
        const queue = text.split('').map((char) => ({
            char,
            locked: false,
            // Randomly assign a frame when this letter will lock into place
            lockFrame: Math.floor(Math.random() * totalFrames) + (delay * 60)
        }));

        const animate = () => {
            let output = '';
            let complete = 0;

            for (let i = 0; i < queue.length; i++) {
                const item = queue[i];
                if (frame >= item.lockFrame || item.char === ' ') {
                    output += item.char;
                    item.locked = true;
                    complete++;
                } else if (frame >= delay * 60) {
                    output += CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
                } else {
                    output += ''; // Blank before delay
                }
            }

            setDisplayText(output);

            if (complete === queue.length) {
                cancelAnimationFrame(animationFrameId);
            } else {
                frame++;
                animationFrameId = requestAnimationFrame(animate);
            }
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrameId);
    }, [text, delay, duration, isInView]);

    return (
        <span ref={ref} className={className}>
            {displayText}
        </span>
    );
};

export default TextScramble;
