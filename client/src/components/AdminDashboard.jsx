import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import apiClient from '../utils/apiClient';

const AdminDashboard = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const [activeTab, setActiveTab] = useState('projects');

    // Data State
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);

    // UI State for Modals
    const [isInjecting, setIsInjecting] = useState(false);
    const [formData, setFormData] = useState({});

    // Fetch Initial Data
    const fetchData = async () => {
        try {
            const [projRes, skillRes] = await Promise.all([
                apiClient.get('/api/projects'),
                apiClient.get('/api/skills')
            ]);
            setProjects(projRes.data);
            setSkills(skillRes.data);
        } catch (err) {
            console.error("Failed to sync matrix data:", err);
            // Handle auto-logout error if 401 is caught by interceptor
        }
    };

    useEffect(() => {
        // Auto-login if token exists
        const token = localStorage.getItem('sentinel_token');
        if (token) {
            setIsAuthenticated(true);
            fetchData();
        }

        const handleAuthExpired = () => setIsAuthenticated(false);
        window.addEventListener('auth-expired', handleAuthExpired);
        return () => window.removeEventListener('auth-expired', handleAuthExpired);
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await apiClient.post('/api/auth/login', { username, password });
            if (res.data.token) {
                localStorage.setItem('sentinel_token', res.data.token);
                setIsAuthenticated(true);
                setError('');
                fetchData();
            }
        } catch (err) {
            setError(err.response?.data?.message || 'ACCESS DENIED. Invalid Credentials.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('sentinel_token');
        setIsAuthenticated(false);
        setProjects([]);
        setSkills([]);
    };

    const handleDeleteProject = async (id) => {
        if (!window.confirm("WARNING: TERMINATING DATA NODE. PROCEED?")) return;
        try {
            await apiClient.delete(`/api/projects/${id}`);
            setProjects(projects.filter(p => p._id !== id));
        } catch (err) {
            alert("Delete failed: " + err.message);
        }
    };

    const handleDeleteSkill = async (id) => {
        if (!window.confirm("WARNING: PURGING ARSENAL DATA. PROCEED?")) return;
        try {
            await apiClient.delete(`/api/skills/${id}`);
            setSkills(skills.filter(s => s._id !== id));
        } catch (err) {
            alert("Delete failed: " + err.message);
        }
    };

    const handleInjectRecord = async (e) => {
        e.preventDefault();
        try {
            if (activeTab === 'projects') {
                const res = await apiClient.post('/api/projects', formData);
                setProjects([...projects, res.data]);
            } else {
                const res = await apiClient.post('/api/skills', formData);
                setSkills([...skills, res.data]);
            }
            setIsInjecting(false);
            setFormData({});
        } catch (err) {
            alert("Injection failed: " + err.message);
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
                        onClick={handleLogout}
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

                {/* Dashboard Area */}
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-panel p-6 border border-gray-800 min-h-[500px]"
                >
                    <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-4">
                        <h2 className="text-xl font-bold text-gray-300 uppercase">
                            {activeTab === 'projects' ? 'Data Nodes (Active)' : 'Arsenal Map (Active)'}
                        </h2>
                        <button
                            onClick={() => setIsInjecting(true)}
                            className="bg-primary/10 text-primary border border-primary px-4 py-2 font-mono text-xs hover:bg-primary hover:text-black transition-colors glitch-text-minor"
                        >
                            + INJECT RECORD
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        {activeTab === 'projects' && (
                            <table className="w-full text-left font-mono text-sm">
                                <thead className="text-gray-500 border-b border-gray-800">
                                    <tr>
                                        <th className="pb-2 font-normal">TITLE</th>
                                        <th className="pb-2 font-normal">CATEGORY</th>
                                        <th className="pb-2 font-normal">URI</th>
                                        <th className="pb-2 font-normal text-right">ACTION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.map((proj) => (
                                        <tr key={proj._id} className="border-b border-gray-900 hover:bg-white/5 transition-colors">
                                            <td className="py-3 text-white flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: proj.color }}></div>
                                                {proj.title}
                                            </td>
                                            <td className="py-3 text-[#ffaa00]">{proj.category}</td>
                                            <td className="py-3 text-gray-500 truncate max-w-[200px]">
                                                <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="hover:text-primary">
                                                    {proj.githubUrl || '[NULL]'}
                                                </a>
                                            </td>
                                            <td className="py-3 text-right">
                                                <button onClick={() => handleDeleteProject(proj._id)} className="text-red-500 hover:text-white hover:bg-red-500 px-2 py-1 text-xs border border-transparent hover:border-red-500 transition-all">
                                                    [ TERMINATE ]
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {projects.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="text-center py-8 text-gray-600 italic">No project data nodes found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}

                        {activeTab === 'skills' && (
                            <table className="w-full text-left font-mono text-sm">
                                <thead className="text-gray-500 border-b border-gray-800">
                                    <tr>
                                        <th className="pb-2 font-normal">DESIGNATION</th>
                                        <th className="pb-2 font-normal">CLASS</th>
                                        <th className="pb-2 font-normal">PROFICIENCY</th>
                                        <th className="pb-2 font-normal text-right">ACTION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {skills.map((skill) => (
                                        <tr key={skill._id} className="border-b border-gray-900 hover:bg-white/5 transition-colors">
                                            <td className="py-3 text-white">{skill.name}</td>
                                            <td className="py-3 text-[#00ff88]">{skill.category}</td>
                                            <td className="py-3 text-gray-400">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-24 h-1 bg-gray-800 rounded overflow-hidden">
                                                        <div className="h-full bg-primary" style={{ width: `${skill.proficiency}%` }}></div>
                                                    </div>
                                                    <span>{skill.proficiency}%</span>
                                                </div>
                                            </td>
                                            <td className="py-3 text-right">
                                                <button onClick={() => handleDeleteSkill(skill._id)} className="text-red-500 hover:text-white hover:bg-red-500 px-2 py-1 text-xs border border-transparent hover:border-red-500 transition-all">
                                                    [ PURGE ]
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {skills.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="text-center py-8 text-gray-600 italic">No arsenal data found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </motion.div>
            </div>
            {/* Injection Modal Overlay */}
            {isInjecting && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-panel p-8 max-w-lg w-full border border-primary relative"
                    >
                        <button
                            onClick={() => setIsInjecting(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-red-500 font-mono"
                        >
                            [ CANCEL ]
                        </button>
                        <h3 className="text-2xl font-bold font-mono text-primary mb-6 uppercase">
                            Inject {activeTab === 'projects' ? 'Data Node' : 'Arsenal Record'}
                        </h3>

                        <form onSubmit={handleInjectRecord} className="flex flex-col gap-4 font-mono text-sm">
                            {activeTab === 'projects' ? (
                                <>
                                    <input required type="text" placeholder="Title" className="bg-black/50 border border-gray-800 p-3 text-white focus:border-primary outline-none" onChange={e => setFormData({ ...formData, title: e.target.value })} />
                                    <input required type="text" placeholder="Category (e.g., Code)" className="bg-black/50 border border-gray-800 p-3 text-white focus:border-primary outline-none" onChange={e => setFormData({ ...formData, category: e.target.value })} />
                                    <textarea placeholder="Description" className="bg-black/50 border border-gray-800 p-3 text-white focus:border-primary outline-none min-h-[100px]" onChange={e => setFormData({ ...formData, description: e.target.value })} />
                                    <input type="url" placeholder="GitHub URL" className="bg-black/50 border border-gray-800 p-3 text-white focus:border-primary outline-none" onChange={e => setFormData({ ...formData, githubUrl: e.target.value })} />
                                    <input type="text" placeholder="Color Hex (e.g., #00f0ff)" className="bg-black/50 border border-gray-800 p-3 text-white focus:border-primary outline-none" onChange={e => setFormData({ ...formData, color: e.target.value })} />
                                    <input required type="number" placeholder="Order Priority (e.g., 1)" className="bg-black/50 border border-gray-800 p-3 text-white focus:border-primary outline-none" onChange={e => setFormData({ ...formData, order: parseInt(e.target.value) })} />
                                </>
                            ) : (
                                <>
                                    <input required type="text" placeholder="Designation (e.g., React)" className="bg-black/50 border border-gray-800 p-3 text-white focus:border-primary outline-none" onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                    <input required type="text" placeholder="Class (e.g., Frontend)" className="bg-black/50 border border-gray-800 p-3 text-white focus:border-primary outline-none" onChange={e => setFormData({ ...formData, category: e.target.value })} />
                                    <input required type="number" min="0" max="100" placeholder="Proficiency (0-100)" className="bg-black/50 border border-gray-800 p-3 text-white focus:border-primary outline-none" onChange={e => setFormData({ ...formData, proficiency: parseInt(e.target.value) })} />
                                    <input required type="number" placeholder="Order Priority (e.g., 1)" className="bg-black/50 border border-gray-800 p-3 text-white focus:border-primary outline-none" onChange={e => setFormData({ ...formData, order: parseInt(e.target.value) })} />
                                </>
                            )}
                            <button type="submit" className="mt-4 bg-primary/20 border border-primary text-primary p-3 hover:bg-primary hover:text-black transition-colors font-bold tracking-widest uppercase">
                                EXECUTE INJECTION
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}

            <div className="scanline-effect opacity-10 pointer-events-none"></div>
        </div>
    );
};

export default AdminDashboard;
