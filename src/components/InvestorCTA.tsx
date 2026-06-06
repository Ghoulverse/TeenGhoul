import { config } from '@/data/ghoul.config';
import { Mail, Download, ExternalLink } from 'lucide-react';

export default function InvestorCTA() {
  const liveGhouls = config.crossLinks.filter((g) => g.id !== 'ghoulverse' && g.live).length;
  const totalGhouls = config.crossLinks.filter((g) => g.id !== 'ghoulverse').length;

  return (
    <section className="relative py-24 md:py-32 px-4 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="glass-glow rounded-2xl p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute -top-20 -left-20 w-60 h-60 rounded-full opacity-20 blur-[80px]" style={{ background: '#a855f7' }} />
          <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full opacity-20 blur-[80px]" style={{ background: '#00f0ff' }} />

          <div className="relative">
            <span className="inline-flex items-center gap-2 px-4 py-2 text-[10px] font-bold tracking-[0.4em] uppercase border border-[#a855f7]/30 text-[#a855f7] mb-6">
              <Mail className="w-3 h-3" />
              Investor Relations
            </span>

            <h2 className="font-mono text-3xl md:text-5xl text-white mb-4">
              Invest in the GHOULVERSE
            </h2>
            <p className="text-[#94a3b8] max-w-xl mx-auto mb-10 text-lg">
              We are building the Pixar of household science. {totalGhouls} ghouls across {totalGhouls} verticals — 
              character IP first, partnerships second, products last. {liveGhouls} sites live, {totalGhouls - liveGhouls} in development.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href="mailto:investors@ghoulverse.com"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 font-bungee text-sm tracking-wider uppercase text-[#0a0a1a] transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #a855f7, #9333ea)', boxShadow: '0 0 30px rgba(168,85,247,0.4)' }}
              >
                <Mail className="w-4 h-4" />
                {config.cta.buttonText}
              </a>
              <a
                href="https://www.ghoulverse.com/investors?from=zen"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 font-bungee text-sm tracking-wider uppercase text-white transition-all hover:scale-105 border-2 border-[#00f0ff]/40 hover:border-[#00f0ff]"
                style={{ background: 'rgba(0,240,255,0.08)' }}
              >
                <Download className="w-4 h-4 text-[#00f0ff]" />
                View Investor Deck
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-[#94a3b8]/60 text-xs">
              <span className="flex items-center gap-1.5">
                <ExternalLink className="w-3 h-3" />
                {liveGhouls} Live Sites
              </span>
              <span className="w-1 h-1 rounded-full bg-[#94a3b8]/30" />
              <span className="flex items-center gap-1.5">
                <ExternalLink className="w-3 h-3" />
                {totalGhouls} Ghouls
              </span>
              <span className="w-1 h-1 rounded-full bg-[#94a3b8]/30" />
              <span className="flex items-center gap-1.5">
                <ExternalLink className="w-3 h-3" />
                1 Live Game
              </span>
              <span className="w-1 h-1 rounded-full bg-[#94a3b8]/30" />
              <span className="flex items-center gap-1.5">
                <ExternalLink className="w-3 h-3" />
                GOO GHOUL™ TM Accepted
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
