import { MessageCircle, Sparkles, ArrowDown } from 'lucide-react';

function CTASection({ onStart }) {
    return (
        <section className="cta-section">
            <div className="cta-glow"></div>

            <div className="cta-content">
                <div className="section-badge">
                    <Sparkles size={15} />
                    <span>Your Story Matters</span>
                </div>

                <h2>You Don't Have to Face It Alone</h2>

                <p>
                    Whatever is weighing on your heart, Michael is ready to listen.
                    No judgment. No pressure. Just a safe space to talk.
                </p>

                <button className="cta-button" onClick={onStart}>
                    <MessageCircle size={19} />
                    Talk to Michael
                    <ArrowDown size={18} />
                </button>

                <span className="cta-note">
                    ✦ Your conversation begins with a simple hello.
                </span>
            </div>
        </section>
    );
}

export default CTASection;