import {
    Home,
    BookOpen,
    Shield,
    Compass,
    Heart,
    MessageCircle,
    Menu,
    X,
} from 'lucide-react';
import { useState } from 'react';

function Navbar({ onStart }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const links = [
        { label: 'Home', id: 'home', icon: Home },
        { label: 'Origin', id: 'origin', icon: BookOpen },
        { label: 'Powers', id: 'powers', icon: Shield },
        { label: 'Mission', id: 'mission', icon: Compass },
        { label: 'Michael', id: 'personality', icon: Heart },
    ];

    const scrollToSection = (id) => {
        const section = document.getElementById(id);

        if (section) {
            section.scrollIntoView({
                behavior: 'smooth',
            });
        }

        setMenuOpen(false);
    };

    const handleStart = () => {
        setMenuOpen(false);
        onStart();
    };

    return (
        <nav className="navbar">
            <div className="navbar-inner">

                <button
                    className="navbar-brand"
                    onClick={() => scrollToSection('home')}
                >
                    <span className="navbar-symbol">✦</span>
                    <span>Michael</span>
                </button>

                <div className={`navbar-links ${menuOpen ? 'mobile-open' : ''}`}>
                    {links.map((link) => {
                        const Icon = link.icon;

                        return (
                            <button
                                key={link.id}
                                className="nav-link"
                                onClick={() => scrollToSection(link.id)}
                            >
                                <Icon size={15} />
                                {link.label}
                            </button>
                        );
                    })}

                    <button
                        className="nav-cta"
                        onClick={handleStart}
                    >
                        <MessageCircle size={16} />
                        Talk to Michael
                    </button>
                </div>

                <button
                    className="menu-toggle"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle navigation menu"
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

            </div>
        </nav>
    );
}

export default Navbar;