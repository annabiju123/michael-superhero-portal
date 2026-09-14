import { BookOpen, Sparkles, Star } from 'lucide-react';

function OriginSection() {
    return (
        <section id="origin" className="origin-section">
            <div className="section-container">

                <div className="section-heading">
                    <div className="section-badge">
                        <BookOpen size={15} />
                        <span>The Sacred Legend</span>
                    </div>

                    <h2>The Origin of Michael</h2>

                    <p>
                        How a celestial guardian became the protector of human hearts.
                    </p>
                </div>

                <div className="origin-card">

                    <Sparkles className="origin-sparkle top-sparkle" />
                    <Star className="origin-sparkle bottom-star" />

                    <div className="origin-story">

                        <p className="story-opening">
                            Long before city lights pierced the evening sky, Michael dwelt
                            in the Highest Spire — a realm woven entirely from starlight,
                            music, and eternal tranquility.
                        </p>

                        <p>
                            Yet, as he looked down upon the mortal world, he saw something
                            that no celestial song could mend: silent grief, lost dreams,
                            and souls carrying weights too heavy for one heart to bear alone.
                        </p>

                        <p>
                            Driven by boundless compassion, Michael chose to leave his
                            peaceful celestial home. He asked to descend into the mortal
                            world, trading a life of rest for a life of protection.
                        </p>

                        <p>
                            The Council of Eternal Dawn bestowed upon him the
                            <strong> Aegis Shield of Solace</strong> and wings capable of
                            crossing continents in a single heartbeat.
                        </p>

                        <p>
                            Since that twilight hour, Michael has walked among humanity —
                            not as an unreachable myth, but as an ever-watchful guardian.
                            Wherever hope becomes fragile, he appears with warmth,
                            courage, and protective wings.
                        </p>

                    </div>

                    <div className="origin-quote">
                        <p>
                            “No voice that cries out in sincerity is ever unheard;
                            no tear falls beyond the reach of my wings.”
                        </p>

                        <span>— Michael, Guardian of Hope</span>
                    </div>

                </div>

            </div>
        </section>
    );
}

export default OriginSection;