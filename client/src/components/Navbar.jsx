import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="fixed top-0 w-full z-40 bg-black/40 backdrop-blur-md border-b border-white/5 px-6 py-4 flex justify-between items-center">
            <div className="font-mono font-bold tracking-widest text-white hidden md:block">
                <span className="text-primary">GRID</span>//ACCESS
            </div>

            <div className="flex gap-6 font-mono text-xs tracking-[0.2em]">
                <NavLink
                    to="/"
                    className={({ isActive }) => `hover:text-primary transition-colors ${isActive ? 'text-primary' : 'text-gray-400'}`}
                >
                    [HUB]
                </NavLink>
                <NavLink
                    to="/about"
                    className={({ isActive }) => `hover:text-primary transition-colors ${isActive ? 'text-primary' : 'text-gray-400'}`}
                >
                    [ABOUT]
                </NavLink>
                <NavLink
                    to="/arsenal"
                    className={({ isActive }) => `hover:text-primary transition-colors ${isActive ? 'text-primary' : 'text-gray-400'}`}
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
