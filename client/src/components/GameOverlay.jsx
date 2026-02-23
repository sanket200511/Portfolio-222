import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Global game state stored outside React to persist across unmounts if needed
export let gameStats = {
    hashes: 0,
    miners: 0,
    unlocked: true,
    overridden: false
};

const GameOverlay = () => {
    const [hashes, setHashes] = useState(gameStats.hashes);
    const [miners, setMiners] = useState(gameStats.miners);
    const [unlocked, setUnlocked] = useState(gameStats.unlocked);
    const [overridden, setOverridden] = useState(gameStats.overridden);

    useEffect(() => {
        const handleAddHash = (e) => {
            const amount = e.detail || 1;
            gameStats.hashes += amount;
            setHashes(gameStats.hashes);
            if (!gameStats.unlocked && gameStats.hashes >= 1) {
                gameStats.unlocked = true;
                setUnlocked(true);
            }
        };

        const handleOverride = () => setOverridden(true);

        const handleBuyMiner = () => {
            const cost = 10 * Math.pow(2, gameStats.miners);
            if (gameStats.hashes >= cost) {
                gameStats.hashes -= cost;
                gameStats.miners += 1;
                setHashes(gameStats.hashes);
                setMiners(gameStats.miners);
                // Dispatch event back to 3D world to spawn a visual miner
                window.dispatchEvent(new CustomEvent('SPAWN_VISUAL_MINER', { detail: gameStats.miners }));
            }
        };

        const handleAutoMine = () => {
            if (gameStats.miners > 0) {
                gameStats.hashes += gameStats.miners;
                setHashes(gameStats.hashes);
            }
        };

        window.addEventListener('ADD_HASH', handleAddHash);
        window.addEventListener('BUY_MINER', handleBuyMiner);
        window.addEventListener('SYSTEM_OVERRIDE', handleOverride);
        const interval = setInterval(handleAutoMine, 1000);

        return () => {
            window.removeEventListener('ADD_HASH', handleAddHash);
            window.removeEventListener('BUY_MINER', handleBuyMiner);
            window.removeEventListener('SYSTEM_OVERRIDE', handleOverride);
            clearInterval(interval);
        };
    }, []);

    const minerCost = 10 * Math.pow(2, miners);
    const overrideCost = 10000;

    const triggerOverride = () => {
        if (hashes >= overrideCost && !gameStats.overridden) {
            gameStats.hashes -= overrideCost;
            gameStats.overridden = true;
            setHashes(gameStats.hashes);
            setOverridden(true);
            window.dispatchEvent(new CustomEvent('SYSTEM_OVERRIDE'));
        }
    };

    return (
        <AnimatePresence>
            {unlocked && !overridden && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.3 } }}
                    className="absolute z-[100] bg-black/60 backdrop-blur-md border border-[#00f0ff]/40 p-5 font-mono hud-glitch-hover box-border shadow-[0_0_20px_rgba(0,240,255,0.1)]"
                    style={{ right: '2.5rem', bottom: '2.5rem', width: '260px' }}
                >
                    <button
                        onClick={() => {
                            gameStats.unlocked = false;
                            setUnlocked(false);
                        }}
                        className="absolute top-2 right-2 text-gray-500 hover:text-[#ff0055] font-bold p-1 text-sm cursor-none transition-colors"
                    >
                        [X]
                    </button>
                    <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-1.5 pr-6 line-clamp-1">Core Uplink</div>
                    <div className="text-4xl font-black text-[#00f0ff] mb-1 leading-none drop-shadow-[0_0_5px_rgba(0,240,255,0.8)]">{Math.floor(hashes).toLocaleString()}</div>
                    <div className="text-[10px] text-[#00f0ff]/80 mb-4 tracking-wide">Cryptographic Hashes</div>

                    <div className="space-y-3">
                        <button
                            onClick={() => window.dispatchEvent(new CustomEvent('BUY_MINER'))}
                            disabled={hashes < minerCost}
                            className={`w-full text-left p-2 border transition-all ${hashes >= minerCost ? 'border-[#ffaa00]/70 text-[#ffaa00] hover:bg-[#ffaa00] hover:text-black cursor-none' : 'border-gray-800/60 text-gray-600 cursor-none'}`}
                        >
                            <div className="text-sm font-bold leading-tight">Auto-Miner</div>
                            <div className="text-[10px] mt-1 text-gray-400">Cost: {minerCost} | Owned: {miners}</div>
                        </button>

                        <button
                            onClick={triggerOverride}
                            disabled={hashes < overrideCost}
                            className={`w-full p-2 border text-center font-black tracking-widest transition-all ${hashes >= overrideCost ? 'border-[#ff0055]/80 text-[#ff0055] bg-red-900/10 hover:bg-[#ff0055] hover:text-black animate-pulse cursor-none' : 'border-gray-800/60 text-gray-800 cursor-none'}`}
                        >
                            <div className="text-xs leading-tight">OVERRIDE</div>
                            <div className="text-[9px] font-normal mt-1 opacity-70">Cost: {(overrideCost / 1000).toFixed(0)}k</div>
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default GameOverlay;
