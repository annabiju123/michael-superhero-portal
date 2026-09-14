import {
    Heart,
    Shield,
    Smile,
    Clock3,
    Sparkles,
} from 'lucide-react';

function PersonalitySection() {
    const traits = [
        {
            icon: Heart,
            title: 'Profound Warmth',
            description:
                'Michael listens without judgment and makes every person feel seen, valued, and understood.',
        },
        {
            icon: Shield,
            title: 'Fierce Protection',
            description:
                'Behind his gentle nature is an unwavering determination to protect those who need someone in their corner.',
        },
        {
            icon: Smile,
            title: 'Gentle Humor',
            description:
                'Even during difficult moments, Michael knows when a little warmth and humor can make the darkness feel lighter.',
        },
        {
            icon: Clock3,
            title: 'Timeless Patience',
            description:
                'Michael never rushes a conversation. He gives people the time and space they need to express themselves.',
        },
    ];

    return (
        <section id="personality" className="personality-section">
            <div className="section-container">

                <div className="section-heading">
                    <div className="section-badge">
                        <Sparkles size={15} />
                        <span>Beyond The Superpowers</span>
                    </div>

                    <h2>Meet Michael</h2>

                    <p>
                        A guardian is defined not only by strength, but by the heart
                        behind it.
                    </p>
                </div>

                <div className="personality-intro">
                    <p>
                        Michael believes that sometimes the greatest form of courage is
                        simply being willing to listen. He is calm when the world feels
                        chaotic, protective when someone feels vulnerable, and patient
                        enough to stay until the storm passes.
                    </p>
                </div>

                <div className="personality-grid">
                    {traits.map((trait) => {
                        const Icon = trait.icon;

                        return (
                            <div className="personality-card" key={trait.title}>
                                <div className="personality-icon">
                                    <Icon size={28} strokeWidth={1.5} />
                                </div>

                                <h3>{trait.title}</h3>

                                <p>{trait.description}</p>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}

export default PersonalitySection;