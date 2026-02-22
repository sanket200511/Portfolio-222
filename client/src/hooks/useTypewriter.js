import { useState, useEffect } from 'react';

const useTypewriter = (text, speed = 40, delay = 0) => {
    const [displayText, setDisplayText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isDone, setIsDone] = useState(false);

    useEffect(() => {
        let timeoutId;

        // Initial delay
        timeoutId = setTimeout(() => {
            setIsTyping(true);
            let currentIndex = 0;

            // Typing interval
            const intervalId = setInterval(() => {
                if (currentIndex < text.length) {
                    setDisplayText((prev) => prev + text.charAt(currentIndex));
                    currentIndex++;
                } else {
                    clearInterval(intervalId);
                    setIsTyping(false);
                    setIsDone(true);
                }
            }, speed);

            return () => clearInterval(intervalId);
        }, delay);

        return () => clearTimeout(timeoutId);
    }, [text, speed, delay]);

    return { displayText, isTyping, isDone };
};

export default useTypewriter;
