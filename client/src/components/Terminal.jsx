import React, { useState, useRef, useEffect } from 'react';
import { soundManager } from '../utils/audioEngine';

const Terminal = () => {
    const [history, setHistory] = useState([
        { type: 'system', output: 'SENTINEL OS v3.7.1 - GUEST ACCESS' },
        { type: 'system', output: 'Type "help" to see available commands.' }
    ]);
    const [input, setInput] = useState('');
    const commandEndRef = useRef(null);

    // Auto-scroll to bottom of terminal
    useEffect(() => {
        commandEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    const handleCommand = (e) => {
        if (e.key === 'Enter') {
            const cmd = input.trim().toLowerCase();
            let output = '';
            let type = 'output';

            if (!cmd) return;

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
                case 'sudo rm -rf /':
                    output = `UNAUTHORIZED ROOT ACCESS DETECTED. INITIATING COUNTERMEASURES.`;
                    soundManager.playAlert();
                    window.dispatchEvent(new CustomEvent('TRIGGER_RED_ALERT'));
                    break;
                default:
                    output = `Command not found: ${cmd}. Type "help" for a list of commands.`;
                    type = 'error';
            }

            setHistory(prev => [
                ...prev,
                { type: 'command', output: `guest@sentinel:~$ ${input}` },
                { type, output }
            ]);
            setInput('');
        }
    };

    return (
        <div className="bg-black/80 backdrop-blur-md rounded border border-gray-800 shadow-2xl overflow-hidden font-mono text-xs md:text-sm h-[400px] flex flex-col relative w-full">
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
            <div className="p-4 overflow-y-auto flex-grow text-gray-300">
                {history.map((line, idx) => (
                    <div
                        key={idx}
                        className={`mb-2 whitespace-pre-wrap ${line.type === 'error' ? 'text-red-400' :
                            line.type === 'system' ? 'text-gray-500' :
                                line.type === 'command' ? 'text-white' : 'text-secondary'
                            }`}
                    >
                        {line.output}
                    </div>
                ))}

                {/* Input Line */}
                <div className="flex items-center text-primary mt-2">
                    <span className="mr-2 whitespace-nowrap">guest@sentinel:~$</span>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => {
                            setInput(e.target.value);
                            if (e.target.value.length > input.length) {
                                soundManager.playKeyStroke();
                            }
                        }}
                        onKeyDown={handleCommand}
                        className="bg-transparent border-none outline-none flex-grow text-primary placeholder-gray-700 w-full"
                        autoFocus
                        spellCheck="false"
                        autoComplete="off"
                    />
                </div>
                <div ref={commandEndRef} />
            </div>

            {/* Overlay Scanline for terminal specifically */}
            <div className="scanline-effect opacity-20"></div>
        </div>
    );
};

export default Terminal;
