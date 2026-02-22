import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="fixed top-0 w-full z-[100] bg-black/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex justify-between items-center shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
            <div className="font-mono font-bold tracking-widest text-white hidden md:block">
                <span className="text-primary">GRID</span>//ACCESS
            </div>

            <div className="flex gap-6 font-mono text-xs tracking-[0.2em]">
                <NavLink
                    to="/"
                    className={({ isActive }) => `hover:text-primary transition-colors cyber-glitch-hover ${isActive ? 'text-primary' : 'text-gray-400'}`}
                >
                    [HUB]
                </NavLink>
                <NavLink
                    to="/about"
                    className={({ isActive }) => `hover:text-primary transition-colors cyber-glitch-hover ${isActive ? 'text-primary' : 'text-gray-400'}`}
                >
                    [ABOUT]
                </NavLink>
                <NavLink
                    to="/arsenal"
                    className={({ isActive }) => `hover:text-primary transition-colors cyber-glitch-hover ${isActive ? 'text-primary' : 'text-gray-400'}`}
                >
                    [ARSENAL]
                </NavLink>
                <NavLink
                    to="/contact"
                    className={({ isActive }) => `hover:text-primary transition-colors ${isActive ? 'text-primary' : 'text-gray-400'}`}
                >
                    [CONTACT]
                </NavLink>
            </div>
        </nav>
    );
};

export default Navbar;
