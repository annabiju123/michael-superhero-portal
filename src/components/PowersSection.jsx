import {
    ShieldCheck,
    Wind,
    Eye,
    Heart,
    Sparkles,
} from 'lucide-react';

function PowersSection() {
    const powers = [
        {
            icon: ShieldCheck,
            title: 'Aegis Sanctuary Aura',
            description:
                'A protective celestial aura that creates a feeling of safety, comfort, and peace around those who need it most.',
            power: '100% Protection',
        },
        {
            icon: Wind,
            title: 'Wings of Celestial Speed',
            description:
                'Michael can cross vast distances in moments, appearing wherever a helping hand or guiding presence is needed.',
            power: 'Mach 20 Flight',
        },
        {
            icon: Eye,
            title: 'Dawnlight Empathic Vision',
            description:
                'A unique ability to sense emotional struggles beneath the surface and understand what someone may be going through.',
            power: 'Omnipresent Sense',
        },
        {
            icon: Heart,
            title: 'Resonant Solace Whispers',
            description:
                'A calming celestial voice that brings reassurance, courage, and a sense of hope during difficult moments.',
            power: 'Instant Calm',
        },
    ];

    return (
        <section id="powers" className="powers-section">
            <div className="section-container">

                <div className="section-heading">
                    <div className="section-badge">
                        <Sparkles size={15} />
                        <span>Celestial Abilities</span>
                    </div>

                    <h2>Michael’s Powers</h2>

                    <p>
                        Gifts bestowed upon a guardian whose greatest strength is
                        compassion.
                    </p>
                </div>

                <div className="powers-grid">
                    {powers.map((power, index) => {
                        const Icon = power.icon;

                        return (
                            <div
                                className="power-card"
                                key={power.title}
                            >
                                <div className="power-number">
                                    0{index + 1}
                                </div>

                                <div className="power-icon">
                                    <Icon size={30} strokeWidth={1.5} />
                                </div>

                                <h3>{power.title}</h3>

                                <p>{power.description}</p>

                                <div className="power-stat">
                                    <span></span>
                                    {power.power}
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}

export default PowersSection;