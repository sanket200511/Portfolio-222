import { motion } from 'framer-motion';

const ContactSection = () => {
    return (
        <section id="contact" className="min-h-[70vh] w-full bg-black relative flex flex-col justify-center py-24 border-t border-white/10 z-10 overflow-hidden">

            {/* Background Warning Stripes */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 20px, #ffaa00 20px, #ffaa00 40px)' }}>
            </div>

            <div className="max-w-4xl mx-auto px-6 text-center w-full relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="mb-4 text-warning font-mono tracking-[0.3em] font-bold text-sm animate-pulse">
                        [ INCOMING TRANSMISSION ]
                    </div>

                    <h2 className="text-5xl md:text-7xl font-sans font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500 mb-8 uppercase">
                        Establish Connection
                    </h2>

                    <p className="text-gray-400 font-mono mb-12 max-w-2xl mx-auto leading-relaxed">
                        System architecture needs scaling? Threat vectors need neutralizing? Or perhaps you just want to collaborate on the next big disruption? Open a secure channel.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <a
                            href="mailto:contact@sanket.com"
                            className="bg-primary/20 border border-primary text-primary px-8 py-4 font-mono font-bold tracking-widest hover:bg-primary hover:text-black transition-all group relative overflow-hidden"
                        >
                            <span className="relative z-10">INITIATE_PING</span>
                        </a>

                        <a
                            href="https://github.com/sanket200511"
                            target="_blank"
                            rel="noreferrer"
                            className="bg-white/5 border border-white/20 text-white px-8 py-4 font-mono font-bold tracking-widest hover:bg-white hover:text-black transition-all"
                        >
                            LOCATE DATA_REPO
                        </a>
                    </div>
                </motion.div>
            </div>

            {/* Quick Footer Component embedded */}
            <div className="absolute bottom-4 left-0 w-full text-center font-mono text-[10px] text-gray-600 tracking-widest">
                © {new Date().getFullYear()} SANKET SHRIKANT KURVE // SENTINEL GRID SECURE PROTOCOL // ALL DIRECTIVES ENFORCED.
            </div>
        </section>
    );
};

export default ContactSection;
