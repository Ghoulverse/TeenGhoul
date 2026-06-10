import TeenMascot from '@/components/TeenMascot';
import TeenParticles from '@/components/TeenParticles';
import Home from '@/pages/Home';
import CookieBanner from '@/components/CookieBanner';

export default function App() {
  return (
    <>
      {/* CRT scanline overlay */}
      <div className="scanlines" />

      {/* Noise texture overlay */}
      <div className="noise-overlay" />

      {/* Ambient teen particles (glitch, neon grid, music notes, sparks) */}
      <TeenParticles />

      {/* The interactive teen mascot */}
      <TeenMascot />

      {/* Page content */}
      <Home />
      <CookieBanner />
</>
  );
}
