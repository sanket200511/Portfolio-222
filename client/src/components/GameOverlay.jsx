import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Global game state stored outside React to persist across unmounts if needed
export let gameStats = {
    hashes: 0,
    miners: 0,
    unlocked: false,
    overridden: false
};

const GameOverlay = () => {
    const [hashes, setHashes] = useState(gameStats.hashes);
    const [miners, setMiners] = useState(gameStats.miners);
    const [unlocked, setUnlocked] = useState(gameStats.unlocked);

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
        const interval = setInterval(handleAutoMine, 1000);

        return () => {
            window.removeEventListener('ADD_HASH', handleAddHash);
            window.removeEventListener('BUY_MINER', handleBuyMiner);
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
            window.dispatchEvent(new CustomEvent('SYSTEM_OVERRIDE'));
        }
    };

    return (
        <AnimatePresence>
            {unlocked && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="z-[99999] bg-black/80 backdrop-blur-md border border-[#00f0ff]/50 p-4 font-mono w-64 cyber-glitch-hover"
                    style={{ position: 'fixed', right: '32px', bottom: '32px' }}
                >
                    <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Sentinel Core Uplink</div>
                    <div className="text-3xl font-black text-[#00f0ff] mb-1">{Math.floor(hashes).toLocaleString()}</div>
                    <div className="text-[10px] text-[#00f0ff]/70 mb-4">Cryptographic Hashes</div>

                    <div className="space-y-3">
                        <button
                            onClick={() => window.dispatchEvent(new CustomEvent('BUY_MINER'))}
                            disabled={hashes < minerCost}
                            className={`w-full text-left p-2 border transition-all ${hashes >= minerCost ? 'border-[#ffaa00] text-[#ffaa00] hover:bg-[#ffaa00] hover:text-black cursor-none' : 'border-gray-800 text-gray-600 cursor-none'}`}
                        >
                            <div className="text-sm font-bold">Deploy Auto-Miner</div>
                            <div className="text-[10px] mt-1">Cost: {minerCost} | Owned: {miners}</div>
                        </button>

                        <button
                            onClick={triggerOverride}
                            disabled={hashes < overrideCost}
                            className={`w-full p-2 border text-center font-black tracking-widest transition-all ${hashes >= overrideCost ? 'border-[#ff0055] text-[#ff0055] bg-red-900/20 hover:bg-[#ff0055] hover:text-black animate-pulse cursor-none' : 'border-gray-800 text-gray-800 cursor-none'}`}
                        >
                            OVERRIDE MAINFRAME
                            <div className="text-[8px] font-normal mt-1">Cost: {overrideCost.toLocaleString()}</div>
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default GameOverlay;
