import { Heart, ArrowUp, Sparkles } from 'lucide-react';

function Footer() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <footer className="footer-section">
            <div className="footer-stars"></div>

            <div className="footer-content">

                <div className="footer-brand">
                    <div className="footer-symbol">
                        ✦
                    </div>

                    <h2>Michael</h2>

                    <p>Guardian of Hope</p>
                </div>

                <div className="footer-message">
                    <p>
                        “Sometimes, all someone needs is to know that they are not alone.”
                    </p>

                    <span>
                        Created with <Heart size={14} /> for brighter tomorrows.
                    </span>
                </div>

                <div className="footer-divider">
                    <span></span>
                    <Sparkles size={14} />
                    <span></span>
                </div>

                <div className="footer-bottom">
                    <p>
                        © {new Date().getFullYear()} Michael — The Guardian Angel
                    </p>

                    <button
                        className="back-to-top"
                        onClick={scrollToTop}
                        aria-label="Back to top"
                    >
                        Back to top
                        <ArrowUp size={16} />
                    </button>
                </div>

            </div>
        </footer>
    );
}

export default Footer;