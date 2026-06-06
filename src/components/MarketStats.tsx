import { config } from '@/data/ghoul.config';
import { TrendingUp, Award, Rocket, Wallet, BarChart3, Target } from 'lucide-react';

export default function MarketStats() {
  return (
    <section className="relative py-24 md:py-32 px-4" style={{ background: 'linear-gradient(180deg, transparent, rgba(168,85,247,0.03), transparent)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#a855f7] text-xs font-bold tracking-[0.3em] uppercase mb-3 block">
            Investor Intelligence
          </span>
          <h2 className="font-mono text-4xl md:text-5xl text-white mb-4">
            Market & ROI
          </h2>
          <p className="text-[#94a3b8] max-w-2xl mx-auto text-lg">
            {config.name} operates in the {config.marketSize}. 
            Revenue begins through partnerships — not products.
          </p>
        </div>

        {/* Funding Ask Hero */}
        <div className="glass-glow rounded-2xl p-8 md:p-12 text-center mb-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ background: 'radial-gradient(circle at center, #a855f7, transparent 70%)' }} />
          <p className="relative text-[#94a3b8] text-xs tracking-[0.3em] uppercase mb-4">Pre-Seed Raise</p>
          <p className="relative font-mono text-5xl md:text-7xl text-white mb-2" style={{ textShadow: '0 0 40px rgba(168,85,247,0.4)' }}>
            {config.fundingAsk}
          </p>
          <p className="relative text-[#94a3b8] text-sm mb-6">
            for {config.equityOffered} equity at {config.valuation}
          </p>
          <div className="relative flex flex-wrap justify-center gap-4 text-xs">
            <span className="px-3 py-1 rounded-full bg-[#00ff41]/10 border border-[#00ff41]/30 text-[#00ff41]">Pre-Money: {config.valuation}</span>
            <span className="px-3 py-1 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#a855f7]">Equity: {config.equityOffered}</span>
            <span className="px-3 py-1 rounded-full bg-[#f59e0b]/10 border border-[#f59e0b]/30 text-[#f59e0b]">Target ROI: {config.roiTarget}</span>
          </div>
        </div>

        {/* Traction Milestones */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {config.traction.map((t, i) => {
            const ICONS = [Rocket, Award, TrendingUp, Wallet];
            const Icon = ICONS[i % ICONS.length];
            const statusColors = {
              complete: { bg: 'rgba(0,255,65,0.1)', border: 'rgba(0,255,65,0.3)', text: '#00ff41' },
              'in-progress': { bg: 'rgba(0,240,255,0.1)', border: 'rgba(0,240,255,0.3)', text: '#00f0ff' },
              upcoming: { bg: 'rgba(168,85,247,0.1)', border: 'rgba(168,85,247,0.3)', text: '#a855f7' },
            };
            const s = statusColors[t.status];
            return (
              <div key={t.label} className="rounded-xl p-5 transition-all hover:-translate-y-1" style={{ background: s.bg, border: `1px solid ${s.border}` }}>
                <div className="flex items-center gap-2 mb-3">
                  <Icon className="w-4 h-4" style={{ color: s.text }} />
                  <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: s.text }}>
                    {t.status === 'complete' ? 'COMPLETE' : t.status === 'in-progress' ? 'IN PROGRESS' : 'UPCOMING'}
                  </span>
                </div>
                <p className="font-mono text-xl text-white mb-1">{t.value}</p>
                <p className="text-[#94a3b8] text-xs">{t.label}</p>
              </div>
            );
          })}
        </div>

        {/* Revenue Projections */}
        <div className="glass rounded-2xl p-8 mb-12">
          <h3 className="font-mono text-xl text-white mb-6 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#a855f7]" />
            Revenue Projections (Conservative)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {config.projectedRevenue.map((rev) => (
              <div key={rev.year} className="rounded-xl p-5 border border-[#a855f7]/20 bg-[#a855f7]/5">
                <p className="text-[#94a3b8] text-xs uppercase tracking-wider mb-2">{rev.year}</p>
                <p className="font-mono text-3xl text-white mb-3">{rev.amount}</p>
                <p className="text-[#94a3b8] text-xs leading-relaxed">{rev.sources}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Exit Scenarios */}
        <div className="glass rounded-2xl p-8 mb-12">
          <h3 className="font-mono text-xl text-white mb-6 flex items-center gap-2">
            <Target className="w-5 h-5 text-[#f59e0b]" />
            Exit Scenarios
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'Moderate', val: '$6M', return: '$1.2M', multiple: '4.8x', color: '#94a3b8' },
              { label: 'Strong', val: '$10M', return: '$2.0M', multiple: '8x', color: '#00f0ff' },
              { label: 'Exceptional', val: '$21M', return: '$4.2M', multiple: '16.8x', color: '#f59e0b' },
            ].map((s) => (
              <div key={s.label} className="rounded-xl p-5 border text-center" style={{ borderColor: `${s.color}30`, background: `${s.color}08` }}>
                <p className="text-xs uppercase tracking-wider mb-2" style={{ color: s.color }}>{s.label}</p>
                <p className="font-mono text-2xl text-white mb-1">{s.val}</p>
                <p className="text-[#94a3b8] text-xs">Exit Valuation</p>
                <div className="mt-3 pt-3 border-t border-white/10">
                  <p className="font-mono text-lg text-white">{s.return}</p>
                  <p className="text-[#94a3b8] text-xs">Investor Return ({config.equityOffered})</p>
                </div>
                <p className="mt-2 text-xs font-bold" style={{ color: s.color }}>{s.multiple}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Investor CTA */}
        <div className="text-center">
          <a
            href="mailto:investors@ghoulverse.com"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl font-mono text-sm tracking-wider uppercase text-[#0a0a1a] transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #a855f7, #00f0ff)', boxShadow: '0 0 30px rgba(168,85,247,0.3)' }}
          >
            <TrendingUp className="w-4 h-4" />
            Request the Full Investor Deck
          </a>
          <p className="text-[#94a3b8]/50 text-xs mt-3">
            Investor deck available upon request. Contact: investors@ghoulverse.com
          </p>
        </div>
      </div>
    </section>
  );
}
