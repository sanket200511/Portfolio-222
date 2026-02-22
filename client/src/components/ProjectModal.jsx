import { motion, AnimatePresence } from 'framer-motion';

const ProjectModal = ({ project, onClose }) => {
    if (!project) return null;

    return (
        <AnimatePresence>
            <motion.div
                key="modal-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 md:p-8"
                onClick={onClose}
            >
                <motion.div
                    key="modal-content"
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.9 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="glass-panel w-full max-w-2xl text-gray-200 border border-primary/30 relative overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Top Edge Accent */}
                    <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: project.color }}></div>

                    <div className="p-8">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <p className="font-mono text-xs tracking-[0.2em] mb-2 opacity-50">
                                    FILE :: {project.id}.dat
                                </p>
                                <h2 className="text-3xl md:text-5xl font-sans font-bold text-white tracking-tight" style={{ textShadow: `0 0 20px ${project.color}50` }}>
                                    {project.title}
                                </h2>
                                <div className="inline-block mt-3 px-3 py-1 bg-black/50 font-mono text-xs border border-white/10 text-white rounded">
                                    CATEGORY: [{project.category}]
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-white transition-colors"
                                aria-label="Close modal"
                            >
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>

                        {/* Description placeholder for now */}
                        <div className="prose prose-invert mb-8 font-sans leading-relaxed text-gray-300">
                            <p>
                                {project.description || 'Detailed intelligence report currently unavailable. Please check back after module synchronization.'}
                            </p>
                        </div>

                        {/* Tech Stack */}
                        <div className="mb-8">
                            <h3 className="font-mono text-xs tracking-[0.2em] text-gray-500 mb-3 border-b border-gray-800 pb-2">
                // SYSTEM DEPLOYMENT
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {(project.techStack || ['React', 'Node.js', 'MongoDB']).map((tech, i) => (
                                    <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 font-mono text-xs text-primary/80 rounded">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-800">
                            <a
                                href={project.githubUrl || 'https://github.com/sanket200511'}
                                target="_blank"
                                rel="noreferrer"
                                className="px-6 py-3 font-mono text-sm bg-primary/20 hover:bg-primary/30 text-primary border border-primary/50 transition-colors uppercase tracking-wider"
                            >
                                [ VIEW SOURCE ]
                            </a>
                            {project.liveUrl && (
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-6 py-3 font-mono text-sm text-gray-300 hover:text-white transition-colors uppercase tracking-wider hover:bg-white/5"
                                >
                                    LIVE DEMO →
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Scanline decoration inside modal */}
                    <div className="scanline-effect opacity-30"></div>
                    <div className="absolute inset-0 border border-primary/10 pointer-events-none"></div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ProjectModal;
