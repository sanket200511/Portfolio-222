import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Tabs: 'projects' or 'skills'
    const [activeTab, setActiveTab] = useState('projects');

    const handleLogin = async (e) => {
        e.preventDefault();
        // Normally hit POST /api/auth/login
        // For now we simulate
        if (username === 'sanket_admin' && password === 'kurve_admin') {
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('ACCESS DENIED. Invalid Credentials.');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4">
                <div className="glass-panel p-8 max-w-md w-full border border-red-500/30">
                    <div className="text-red-500 font-mono tracking-widest text-center mb-6 animate-pulse">
                        [ RESTRICTED AREA ]<br />
                        OVERRIDE PROTOCOL INITIATED
                    </div>
                    <form onSubmit={handleLogin} className="flex flex-col gap-4">
                        <input
                            type="text"
                            placeholder="Admin ID"
                            className="bg-black/50 border border-gray-800 p-3 text-white font-mono placeholder-gray-600 focus:outline-none focus:border-red-500"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Passcode"
                            className="bg-black/50 border border-gray-800 p-3 text-white font-mono placeholder-gray-600 focus:outline-none focus:border-red-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && <div className="text-red-500 text-xs font-mono">{error}</div>}
                        <button type="submit" className="mt-4 bg-red-900/30 border border-red-500 text-red-500 p-3 hover:bg-red-500 hover:text-white transition-colors font-bold tracking-widest uppercase">
                            Authenticate
                        </button>
                    </form>
                </div>
                <div className="scanline-effect opacity-20 pointer-events-none"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-8 font-sans">
            <div className="max-w-6xl mx-auto">
                <header className="flex justify-between items-end border-b border-gray-800 pb-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tighter text-red-500 mb-1">SENTINEL_COMMAND</h1>
                        <p className="font-mono text-gray-500 text-xs tracking-widest">SYSTEM OVERRIDE ACTIVE</p>
                    </div>
                    <button
                        onClick={() => setIsAuthenticated(false)}
                        className="text-xs font-mono text-gray-400 hover:text-red-500 transition-colors"
                    >
                        [ TERMINATE SESSION ]
                    </button>
                </header>

                <div className="flex gap-4 mb-8 font-mono tracking-widest border-b border-gray-800 pb-px">
                    <button
                        className={`px-6 py-3 border-b-2 transition-colors ${activeTab === 'projects' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
                        onClick={() => setActiveTab('projects')}
                    >
                        DATA_NODES (Projects)
                    </button>
                    <button
                        className={`px-6 py-3 border-b-2 transition-colors ${activeTab === 'skills' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
                        onClick={() => setActiveTab('skills')}
                    >
                        ARSENAL (Skills)
                    </button>
                </div>

                {/* Dashboard Area - Placeholder for actual CRUD UI */}
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-panel p-6 border border-gray-800 min-h-[500px]"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-300 uppercase">
                            {activeTab === 'projects' ? 'Active Projects Database' : 'Capability Matrix'}
                        </h2>
                        <button className="bg-primary/20 text-primary border border-primary px-4 py-2 font-mono text-sm hover:bg-primary hover:text-black transition-colors">
                            + INJECT RECORD
                        </button>
                    </div>

                    <div className="text-center text-gray-500 font-mono py-20 border border-dashed border-gray-800">
                        [ SECURE CONNECTION TO MONGODB REQUIRED FOR REAL-TIME MUTATION ]<br />
                        Waiting for Mongoose linkage...
                    </div>
                </motion.div>
            </div>
            <div className="scanline-effect opacity-10 pointer-events-none"></div>
        </div>
    );
};

export default AdminDashboard;
