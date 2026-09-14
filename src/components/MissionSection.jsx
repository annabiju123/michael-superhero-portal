import {
    Compass,
    Shield,
    HeartHandshake,
    Sparkles,
} from 'lucide-react';

function MissionSection() {
    const commitments = [
        {
            icon: Compass,
            title: 'Guiding the Lost',
            description:
                'Helping people find clarity when life feels uncertain, overwhelming, or difficult to navigate.',
        },
        {
            icon: Shield,
            title: 'Shielding the Vulnerable',
            description:
                'Standing beside those who feel powerless and reminding them that they never have to face everything alone.',
        },
        {
            icon: HeartHandshake,
            title: 'Restoring Broken Hope',
            description:
                'Bringing warmth, courage, and renewed hope to hearts that have been carrying too much for too long.',
        },
    ];

    return (
        <section id="mission" className="mission-section">
            <div className="section-container">

                <div className="section-heading">
                    <div className="section-badge">
                        <Sparkles size={15} />
                        <span>The Guardian’s Purpose</span>
                    </div>

                    <h2>Mission &amp; Vision</h2>

                    <p>
                        A promise to protect hope, guide the uncertain, and remind every
                        heart that it matters.
                    </p>
                </div>

                <div className="guardian-vow">
                    <div className="vow-symbol">
                        ✦
                    </div>

                    <div>
                        <span className="vow-label">The Guardian’s Vow</span>

                        <p>
                            “Where there is fear, I will bring courage.
                            Where there is loneliness, I will bring companionship.
                            Where hope has faded, I will help it shine again.”
                        </p>

                        <span className="vow-signature">
                            — Michael
                        </span>
                    </div>
                </div>

                <div className="mission-grid">
                    {commitments.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div className="mission-card" key={item.title}>
                                <div className="mission-icon">
                                    <Icon size={27} strokeWidth={1.5} />
                                </div>

                                <h3>{item.title}</h3>

                                <p>{item.description}</p>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}

export default MissionSection;