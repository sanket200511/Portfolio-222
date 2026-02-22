import React from 'react';
import { soundManager } from '../utils/audioEngine';

const Navbar = () => {
    const scrollToSection = (e, id) => {
        e.preventDefault();
        soundManager.playKeyStroke();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        } else if (id === 'hub') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <nav className="fixed top-0 w-full z-[100] bg-black/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex justify-between items-center shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
            <div className="font-mono font-bold tracking-widest text-white hidden md:block">
                <span className="text-primary">GRID</span>//ACCESS
            </div>

            <div className="flex gap-6 font-mono text-xs tracking-[0.2em]">
                <a
                    href="#hub"
                    onClick={(e) => scrollToSection(e, 'hub')}
                    className="hover:text-primary transition-colors cyber-glitch-hover text-gray-400 cursor-none"
                >
                    [HUB]
                </a>
                <a
                    href="#about"
                    onClick={(e) => scrollToSection(e, 'about')}
                    className="hover:text-primary transition-colors cyber-glitch-hover text-gray-400 cursor-none"
                >
                    [ABOUT]
                </a>
                <a
                    href="#arsenal"
                    onClick={(e) => scrollToSection(e, 'arsenal')}
                    className="hover:text-primary transition-colors cyber-glitch-hover text-gray-400 cursor-none"
                >
                    [ARSENAL]
                </a>
                <a
                    href="#contact"
                    onClick={(e) => scrollToSection(e, 'contact')}
                    className="hover:text-primary transition-colors cyber-glitch-hover text-gray-400 cursor-none"
                >
                    [CONTACT]
                </a>
            </div>
        </nav>
    );
};

export default Navbar;
