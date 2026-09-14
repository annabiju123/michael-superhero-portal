import { useState } from 'react';
import ChatbotModal from './components/ChatbotModal';
import OriginSection from './components/OriginSection';
import PowersSection from './components/PowersSection';
import MissionSection from './components/MissionSection';
import PersonalitySection from './components/PersonalitySection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

function App() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <main>
      <Navbar onStart={() => setChatOpen(true)} />
      {/* ================================
          HERO SECTION
      ================================= */}

      <section id="home" className="hero">
        <div className="stars"></div>

        <div className="hero-content">
          <div className="celestial-symbol">✦</div>

          <h1 className="michael-title">Michael</h1>

          <div className="divider">
            <span></span>
            <div>✦</div>
            <span></span>
          </div>

          <h2>Here for a Brighter Tomorrow</h2>

          <p className="tagline">
            Talk. Feel. Heal. You’re not alone.
          </p>

          <button
            className="start-button"
            onClick={() => setChatOpen(true)}
          >
            Begin Your Journey
            <span>↓</span>
          </button>
        </div>
      </section>

      {/* ================================
          ORIGIN STORY
      ================================= */}

      <OriginSection />
      <PowersSection />
      <MissionSection />
      <PersonalitySection />
      <CTASection onStart={() => setChatOpen(true)} />
      <Footer />

      {/* ================================
          CHATBOT
      ================================= */}

      {chatOpen && (
        <ChatbotModal
          onClose={() => setChatOpen(false)}
        />
      )}
    </main>
  );
}

export default App;