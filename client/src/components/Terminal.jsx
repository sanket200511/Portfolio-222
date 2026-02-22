import React, { useState, useRef, useEffect } from 'react';
import { soundManager } from '../utils/audioEngine';

const Terminal = () => {
    const [history, setHistory] = useState([
        { type: 'system', output: 'SENTINEL OS v3.7.1 - GUEST ACCESS' },
        { type: 'system', output: 'Type "help" to see available commands.' }
    ]);
    const [input, setInput] = useState('');
    const [isGhostTyping, setIsGhostTyping] = useState(false);
    const commandEndRef = useRef(null);
    const inputRef = useRef(null);
    const idleTimerRef = useRef(null);

    const terminalBodyRef = useRef(null);

    // Auto-scroll inside the terminal body purely
    useEffect(() => {
        if (terminalBodyRef.current) {
            terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
        }
    }, [history, input, isGhostTyping]);

    const resetIdleTimer = () => {
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

        idleTimerRef.current = setTimeout(() => {
            triggerGhostAI();
        }, 20000); // 20 seconds of idle = ghost triggers
    };

    useEffect(() => {
        resetIdleTimer();
        const handleInteraction = () => resetIdleTimer();
        window.addEventListener('mousemove', handleInteraction);
        window.addEventListener('keydown', handleInteraction);

        return () => {
            if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
            window.removeEventListener('mousemove', handleInteraction);
            window.removeEventListener('keydown', handleInteraction);
        };
    }, []);

    const triggerGhostAI = () => {
        const messages = [
            "Are you still there?",
            "I see you inspecting the code.",
            "The grid is absolute.",
            "Sanket is watching."
        ];
        const randomMsg = messages[Math.floor(Math.random() * messages.length)];
        setIsGhostTyping(true);

        let i = 0;
        setInput('');

        const typeChar = () => {
            if (i < randomMsg.length) {
                setInput((prev) => prev + randomMsg.charAt(i));
                soundManager.playKeyStroke();
                i++;
                setTimeout(typeChar, 100);
            } else {
                setTimeout(() => {
                    setHistory(prev => [
                        ...prev,
                        { type: 'command', output: `ghost@machine:~$ ${randomMsg}` },
                        { type: 'error', output: `[CONNECTION INTERCEPTED]` }
                    ]);
                    setInput('');
                    setIsGhostTyping(false);
                    soundManager.playAlert();
                }, 1000);
            }
        };
        typeChar();
    };

    const handleCommand = (e) => {
        if (isGhostTyping) {
            e.preventDefault();
            return;
        }

        if (e.key === 'Enter') {
            const cmd = input.trim().toLowerCase();
            let output = '';
            let type = 'output';

            if (!cmd) return;

            // Handle Regex for sudo rm -rf variations
            if (cmd.match(/^sudo rm -rf\s*\/?$/i)) {
                output = `UNAUTHORIZED ROOT ACCESS DETECTED. INITIATING COUNTERMEASURES.`;
                soundManager.playAlert();
                window.dispatchEvent(new CustomEvent('TRIGGER_RED_ALERT'));
            } else {
                switch (cmd) {
                    case 'help':
                        output = `Available commands:
      help              - Show this menu
      cat profile.txt   - Display bio
      projects --list   - Show project array
      skills --list     - Ping skill database
      whoami            - Display current user context
      matrix            - Enter the construct
      sudo rm -rf /     - System wipe (DANGEROUS)
      clear             - Clear terminal window`;
                        break;
                    case 'cat profile.txt':
                        output = `"I don't just write code. I engineer ecosystems. From back-end logic to front-end magic. The full-stack advantage." - Sanket Shrikant Kurve`;
                        break;
                    case 'projects --list':
                        output = `[1] ShieldCall (AI/ML)\n[2] CityWatch (IoT)\n[3] CrisisForge (Robotics)\n[4] Hajeeri (Full-Stack)`;
                        break;
                    case 'skills --list':
                        output = `[FETCHING DATA...]\n> JavaScript/TypeScript\n> React, Node.js, Express\n> MongoDB, SQL\n> Python, FastAPI\n> Three.js, WebGL`;
                        break;
                    case 'whoami':
                        output = `guest_user_9921`;
                        break;
                    case 'clear':
                        setHistory([]);
                        setInput('');
                        return;
                    case 'matrix':
                        output = `Wake up, Neo...`;
                        window.dispatchEvent(new CustomEvent('TRIGGER_MATRIX'));
                        break;
                    default:
                        output = `Command not found: ${cmd}. Type "help" for a list of commands.`;
                        type = 'error';
                }
            }

            setHistory(prev => [
                ...prev,
                { type: 'command', output: `guest@sentinel:~$ ${input}` },
                { type, output }
            ]);
            setInput('');
            // Keep focus on input after command
            setTimeout(() => inputRef.current?.focus(), 10);
        }
    };

    return (
        <div className={`terminal-container bg-black/80 backdrop-blur-md rounded border border-gray-800 shadow-[0_0_40px_rgba(0,240,255,0.1)] overflow-hidden font-mono text-xs md:text-sm h-[400px] flex flex-col relative w-full transition-shadow duration-500 hover:shadow-[0_0_60px_rgba(255,0,85,0.2)]`}>
            {/* Terminal Header */}
            <div className="bg-gray-900 border-b border-gray-800 flex items-center px-4 py-2 select-none">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="mx-auto text-gray-500 tracking-wider text-xs">root@sentinel-grid:~</div>
            </div>

            {/* Terminal Body */}
            <div
                ref={terminalBodyRef}
                className="p-4 overflow-y-auto flex-grow text-gray-300 custom-scrollbar"
            >
                {history.map((line, idx) => (
                    <div
                        key={idx}
                        className={`mb-2 whitespace-pre-wrap ${line.type === 'error' ? 'text-red-400 font-bold glitch-text-minor' :
                            line.type === 'system' ? 'text-gray-500' :
                                line.type === 'command' ? 'text-white' : 'text-[#00f0ff] drop-shadow-[0_0_5px_rgba(0,240,255,0.5)]'
                            }`}
                    >
                        {line.output}
                    </div>
                ))}

                {/* Input Line */}
                <div className="flex items-center text-primary mt-2">
                    <span className="mr-2 whitespace-nowrap text-[#ffaa00]">guest@sentinel:~$</span>
                    <input
                        type="text"
                        ref={inputRef}
                        value={input}
                        onChange={(e) => {
                            setInput(e.target.value);
                            if (e.target.value.length > input.length) {
                                soundManager.playKeyStroke();
                            }
                        }}
                        onKeyDown={handleCommand}
                        className="bg-transparent border-none outline-none flex-grow text-white font-bold tracking-widest placeholder-gray-700 w-full drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                        autoFocus
                        spellCheck="false"
                        autoComplete="off"
                    />
                </div>
            </div>

            {/* Overlay Scanline for terminal specifically */}
            <div className="scanline-effect opacity-20"></div>
        </div>
    );
};

export default Terminal;
