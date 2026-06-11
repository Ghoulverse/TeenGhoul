import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Twitter, Instagram, Youtube, ArrowRight, Gamepad2,
  Ghost, Wind, CircleDot, Waves, Flame, Headphones, Zap, Music,
  Briefcase, Building2,
} from 'lucide-react';
import { config } from '@/data/ghoul.config';
import TeenParticles from '@/components/TeenParticles';
import EcosystemMap from '@/components/EcosystemMap';
import MarketStats from '@/components/MarketStats';
import IPBadge from '@/components/IPBadge';
import RoadmapTimeline from '@/components/RoadmapTimeline';
import InvestorCTA from '@/components/InvestorCTA';

gsap.registerPlugin(ScrollTrigger);

const GHOULVERSE_LINK = config.crossLinks.find((g) => g.id === 'ghoulverse');
const OTHER_GHOULS = config.crossLinks.filter((g) => g.id !== 'ghoulverse');

const PRODUCT_ICONS = [Headphones, Zap, Flame, Music, Wind, CircleDot, Waves, Flame, Zap];
const TABS = [
  { key: 'core' as const, label: 'Core' },
  { key: 'pro' as const, label: 'Pro' },
  { key: 'tool' as const, label: 'Tools' },
  { key: 'refill' as const, label: 'Refills' },
  { key: 'limited' as const, label: 'Limited' },
];

function FloatingOrb({ delay, size, color, className }: { delay: number; size: number; color: string; className?: string }) {
  return (
    <div className={`absolute rounded-full pointer-events-none blur-3xl opacity-[0.06] ${className || ''}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color}, transparent 70%)`,
        animation: `float-orb 10s ease-in-out infinite ${delay}s`,
      }} />
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<'core' | 'pro' | 'tool' | 'refill' | 'limited'>('core');
  const heroRef = useRef<HTMLDivElement>(null);
  const breathRef = useRef<HTMLDivElement>(null);
  const scienceRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const collectiveRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const ecosystemRef = useRef<HTMLDivElement>(null);
  const marketRef = useRef<HTMLDivElement>(null);
  const ipRef = useRef<HTMLDivElement>(null);
  const roadmapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-fade', {
        opacity: 0,
        y: 30,
        duration: 1.5,
        stagger: 0.2,
        ease: 'power2.out',
        delay: 0.3,
      });

      gsap.to('.breathe', {
        scale: 1.03,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.utils.toArray('.orb-drift').forEach((orb: any, i: number) => {
        gsap.to(orb, {
          y: i % 2 === 0 ? -40 : 40,
          x: i % 3 === 0 ? 20 : -20,
          duration: 8 + i * 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });

      [breathRef, scienceRef, productRef, collectiveRef, gameRef, portfolioRef, ctaRef, ecosystemRef, marketRef, ipRef, roadmapRef].forEach((ref) => {
        if (ref.current) {
          gsap.from(ref.current.querySelectorAll('.reveal'), {
            opacity: 0,
            y: 30,
            duration: 1.2,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: { trigger: ref.current, start: 'top 85%', toggleActions: 'play none none none' },
          });
        }
      });
    });
    return () => ctx.revert();
  }, []);

  const filtered = config.products.filter((p) => p.category === activeTab);

  return (
    <div className="relative font-teen min-h-screen overflow-x-hidden" style={{ background: '#0f0a1a' }}>
      {/* Floating orbs background */}
      <FloatingOrb delay={0} size={500} color="#8b5cf6" className="-top-32 -left-32" />
      <FloatingOrb delay={3} size={400} color="#e879f9" className="top-1/3 -right-24" />
      <FloatingOrb delay={6} size={350} color="#a78bfa" className="bottom-0 left-1/3" />
      <FloatingOrb delay={2} size={300} color="#d8b4fe" className="top-1/2 left-1/2" />

      <TeenParticles />

      {/* ===== NAV ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 py-6 px-8 md:px-16"
        style={{ background: 'rgba(15,10,26,0.7)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(139,92,246,0.08)' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/ghoul_logo.png" alt={config.name} className="w-10 h-10 object-contain" draggable={false} />
            <span className="font-teen text-sm tracking-[0.3em] text-[#8b5cf6]">{config.name}</span>
          </div>
          <a href={GHOULVERSE_LINK?.domain || '#'} target="_blank" rel="noopener noreferrer"
            className="text-[10px] tracking-[0.3em] uppercase text-[#78716c] hover:text-[#e879f9] transition-colors">
            GHOULVERSE
          </a>
          <a href="#ecosystem" className="hidden md:flex items-center gap-1.5 text-[10px] font-bold tracking-[0.2em] uppercase text-[#94a3b8] hover:text-[#8b5cf6] transition-colors">
            <Briefcase className="w-3 h-3" /> Investors
          </a>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section ref={heroRef} className="relative min-h-[100dvh] flex flex-col items-center justify-center px-8 text-center">
        <div className="hero-fade mb-8 flex flex-col items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[9px] tracking-[0.3em] uppercase text-[#8b5cf6]/70"
            style={{ background: 'rgba(139,92,246,0.08)', borderRadius: '9999px', border: '1px solid rgba(139,92,246,0.15)' }}>
            <Building2 className="w-3 h-3" /> House of GHOUL
          </span>
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#8b5cf6]/50">The Hangout</span>
        </div>

        <h1 className="hero-fade font-teen leading-[0.9] mb-10">
          <span className="block text-[18vw] md:text-[12rem] text-[#8b5cf6]/90 glitch-text" data-text="Teen">Teen</span>
          <span className="block text-[18vw] md:text-[12rem] text-[#e879f9]/80 -mt-4 md:-mt-8 glitch-text" data-text="Ghoul">Ghoul</span>
        </h1>

        <p className="hero-fade text-[#9ca3af]/70 text-base md:text-lg max-w-sm mb-12 leading-relaxed font-light">
          No judgment. Maximum efficiency. We clean what you pretend not to see.
        </p>

        <div className="hero-fade">
          <a href="#hangout" className="group inline-flex items-center gap-3 px-8 py-4 font-teen text-sm tracking-wider text-[#8b5cf6] transition-all hover:scale-105"
            style={{ border: '1px solid rgba(139,92,246,0.3)', borderRadius: '9999px', boxShadow: '0 0 20px rgba(139,92,246,0.1)' }}>
            Enter The Hangout
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="mt-12 w-64 h-64 mx-auto">
          <img src="/ghoul_mascot.png" alt="TeenGhoul mascot" className="w-full h-full object-contain" draggable={false} style={{ animation: 'ghost-bob 2.5s ease-in-out infinite, ghost-sway 3.5s ease-in-out infinite' }} />
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <div className="w-px h-12 mx-auto" style={{ background: 'linear-gradient(to bottom, rgba(139,92,246,0.3), transparent)' }} />
        </div>
      </section>

      {/* ===== BREATH / ATTITUDE ===== */}
      <section ref={breathRef} className="relative py-32 md:py-48 px-8 md:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="reveal mb-16">
            <h2 className="font-teen text-4xl md:text-5xl text-[#e2e0e7] mb-6 leading-tight">
              Your room is a biohazard.<br />
              <span className="text-[#8b5cf6]">We don't care. We fix it.</span>
            </h2>
            <p className="text-[#9ca3af]/70 text-base max-w-md mx-auto leading-relaxed font-light">
              Pizza grease older than your Steam library. Gaming chair that has seen things. The smell under the bed that has a name now. No shame, no lectures — just maximum efficiency. GG.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Zap, value: '<60s', label: 'Reaction Time', color: '#8b5cf6', accent: '#22d3ee' },
              { icon: CircleDot, value: '99.7%', label: 'Target Precision', color: '#e879f9', accent: '#8b5cf6' },
              { icon: Flame, value: '100%', label: 'Finish Safe', color: '#22d3ee', accent: '#e879f9' },
              { icon: Building2, value: '12', label: 'House of GHOUL', color: '#8b5cf6', accent: '#22d3ee' },
            ].map((stat, i) => (
              <div key={i} className="reveal breathe p-10 text-center hud-card transition-all duration-500 hover:scale-[1.04]"
                style={{ animationDelay: `${i * 0.3}s` }}>
                <div className="flex items-center justify-center gap-1 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: stat.accent, boxShadow: `0 0 6px ${stat.accent}` }} />
                  <div className="text-[8px] tracking-[0.3em] uppercase text-[#9ca3af]/40 font-mono">STAT_0{i+1}</div>
                </div>
                <stat.icon className="w-6 h-6 mx-auto mb-4" style={{ color: stat.color, opacity: 0.9, filter: `drop-shadow(0 0 4px ${stat.color}40)` }} />
                <div className="font-teen text-3xl text-[#e2e0e7] mb-2" style={{ textShadow: `0 0 12px ${stat.color}30` }}>{stat.value}</div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-[#9ca3af]/50">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ECOSYSTEM ===== */}
      <section ref={ecosystemRef} id="ecosystem" className="relative py-32 md:py-48 px-8 md:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="reveal text-center mb-16">
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#8b5cf6]/50 mb-4 block">The Ecosystem</span>
            <h2 className="font-teen text-4xl md:text-5xl text-[#e2e0e7] mb-3">House of GHOUL</h2>
            <p className="font-teen text-lg text-[#8b5cf6]/80">Twelve brands. One universe. Infinite potential.</p>
          </div>
          <div className="reveal">
            <EcosystemMap />
          </div>
        </div>
      </section>

      {/* ===== SCIENCE ===== */}
      <section ref={scienceRef} className="relative py-32 md:py-48 px-8 md:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="reveal text-center mb-16">
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#8b5cf6]/50 mb-4 block">Proprietary Technology</span>
            <h2 className="font-teen text-4xl md:text-5xl text-[#e2e0e7] mb-3">The Science</h2>
            <p className="font-teen text-lg text-[#e879f9]/80">{config.science.subtitle}</p>
          </div>

          <div className="reveal grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="p-10 neon-border" style={{ borderRadius: '32px', background: 'rgba(139,92,246,0.03)' }}>
              <p className="text-[#9ca3af]/80 leading-relaxed font-light">{config.science.description}</p>
            </div>
            <div className="p-10 neon-border" style={{ borderRadius: '32px', background: 'rgba(139,92,246,0.02)' }}>
              <p className="text-[#9ca3af]/60 leading-relaxed text-sm font-light">{config.science.adaptation}</p>
            </div>
          </div>

          <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-4">
            {config.science.stats.map((stat, i) => (
              <div key={i} className="p-8 text-center neon-border" style={{ borderRadius: '24px', background: 'rgba(139,92,246,0.03)' }}>
                <div className="font-teen text-2xl text-[#8b5cf6] mb-1">{stat.value}</div>
                <div className="text-[10px] tracking-[0.2em] uppercase text-[#9ca3af]/40">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== IP ===== */}
      <section ref={ipRef} className="relative py-32 md:py-48 px-8 md:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="reveal text-center mb-16">
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#8b5cf6]/50 mb-4 block">Intellectual Property</span>
            <h2 className="font-teen text-4xl md:text-5xl text-[#e2e0e7] mb-3">Protected Assets</h2>
            <p className="text-[#9ca3af]/60 max-w-sm mx-auto font-light">Trademarked. Registered. Defensible.</p>
          </div>
          <div className="reveal">
            <IPBadge />
          </div>
        </div>
      </section>

      {/* ===== PRODUCTS ===== */}
      <section ref={productRef} id="hangout" className="relative py-32 md:py-48 px-8 md:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="reveal text-center mb-16">
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#8b5cf6]/50 mb-4 block font-mono">LOADOUT // 09 ITEMS</span>
            <h2 className="font-teen text-4xl md:text-5xl text-[#e2e0e7] mb-3">The Hangout</h2>
            <p className="text-[#9ca3af]/60 max-w-sm mx-auto font-light">Nine items in your inventory. Equip wisely. Mess doesn't stand a chance.</p>
          </div>

          {/* Tabs */}
          <div className="reveal flex flex-wrap justify-center gap-3 mb-16">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.key;
              const count = config.products.filter((p) => p.category === tab.key).length;
              return (
                <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                  className="px-6 py-2.5 text-xs tracking-wider transition-all min-h-11 font-teen"
                  style={{
                    background: isActive ? 'linear-gradient(135deg, #8b5cf6, #e879f9)' : 'rgba(139,92,246,0.08)',
                    color: isActive ? '#fff' : '#9ca3af',
                    borderRadius: '9999px',
                    border: isActive ? 'none' : '1px solid rgba(139,92,246,0.15)',
                    boxShadow: isActive ? '0 8px 25px rgba(139,92,246,0.25)' : 'none',
                  }}>
                  {tab.label} ({count})
                </button>
              );
            })}
          </div>

          {/* Product Grid — Gaming loot cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((product, i) => {
              const Icon = PRODUCT_ICONS[i % PRODUCT_ICONS.length];
              const colors = ['#8b5cf6', '#e879f9', '#22d3ee'];
              const color = colors[i % colors.length];
              const rarity = i === 0 ? 'LEGENDARY' : i < 3 ? 'EPIC' : i < 6 ? 'RARE' : 'COMMON';

              return (
                <div key={i} className="reveal orb-drift group p-8 transition-all duration-500 hover:scale-[1.04] rgb-border rgb-border-hover"
                  style={{
                    background: 'rgba(20,14,35,0.75)',
                    borderRadius: '4px',
                    backdropFilter: 'blur(20px)',
                    clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
                  }}>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[7px] tracking-[0.3em] uppercase font-mono" style={{ color: `${color}80` }}>{rarity}</span>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
                  </div>

                  <div className="w-14 h-14 rounded-sm flex items-center justify-center mx-auto mb-5"
                    style={{ background: `${color}12`, border: `1px solid ${color}30` }}>
                    <Icon className="w-6 h-6" style={{ color, opacity: 0.9, filter: `drop-shadow(0 0 4px ${color}50)` }} />
                  </div>

                  <span className="text-[9px] tracking-[0.3em] uppercase text-[#9ca3af]/40 block mb-3 font-mono">{product.category}</span>

                  <h3 className="font-teen text-lg text-[#e2e0e7] mb-2 break-words" style={{ textShadow: `0 0 8px ${color}20` }}>{product.name}</h3>
                  <p className="text-[#e879f9]/70 text-xs mb-3">{product.tagline}</p>
                  <p className="text-[#9ca3af]/50 text-xs leading-relaxed mb-4 font-light">{product.description}</p>

                  {product.heroIngredient && (
                    <div className="mb-3">
                      <span className="text-[9px] tracking-wider uppercase text-[#9ca3af]/30 font-mono">PWR:// </span>
                      <span className="text-[10px] font-medium font-mono" style={{ color }}>{product.heroIngredient}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-3" style={{ borderTop: `1px solid ${color}15` }}>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-[#9ca3af]/30 font-mono">{product.volume}</span>
                    <span className="font-teen text-sm font-bold" style={{ color, textShadow: `0 0 8px ${color}40` }}>{product.price}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== MARKET ===== */}
      <section ref={marketRef} className="relative py-32 md:py-48 px-8 md:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="reveal text-center mb-16">
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#8b5cf6]/50 mb-4 block">Market Opportunity</span>
            <h2 className="font-teen text-4xl md:text-5xl text-[#e2e0e7] mb-3">The Numbers</h2>
            <p className="text-[#9ca3af]/60 max-w-sm mx-auto font-light">Teen consumer market meets molecular science. A $260B+ intersection.</p>
          </div>
          <div className="reveal">
            <MarketStats />
          </div>
        </div>
      </section>

      {/* ===== ROADMAP ===== */}
      <section ref={roadmapRef} className="relative py-32 md:py-48 px-8 md:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="reveal text-center mb-16">
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#8b5cf6]/50 mb-4 block">The Road Ahead</span>
            <h2 className="font-teen text-4xl md:text-5xl text-[#e2e0e7] mb-3">Roadmap</h2>
            <p className="text-[#9ca3af]/60 max-w-sm mx-auto font-light">From idea to empire. Milestone by milestone.</p>
          </div>
          <div className="reveal">
            <RoadmapTimeline />
          </div>
        </div>
      </section>

      {/* ===== COLLECTIVE (LINEUP) ===== */}
      <section ref={collectiveRef} className="relative py-32 md:py-48 px-8 md:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="reveal text-center mb-16">
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#e879f9]/50 mb-4 block">The Collective</span>
            <h2 className="font-teen text-4xl md:text-5xl text-[#e2e0e7] mb-3">The Ghoulverse</h2>
            <p className="text-[#9ca3af]/60 max-w-sm mx-auto font-light">Twelve spirits. One universe. Find your path.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {OTHER_GHOULS.map((g) => (
              <a key={g.id}
                href={g.live ? g.domain : `https://www.ghoulverse.com/ghouls/${g.id}/`}
                target="_blank" rel="noopener noreferrer"
                className="reveal group flex flex-col items-center p-6 transition-all duration-700 hover:scale-110"
                style={{ background: 'rgba(139,92,246,0.06)', borderRadius: '24px', width: '120px', height: '120px', border: '1px solid rgba(139,92,246,0.1)' }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 12px 40px ${g.color}15`; e.currentTarget.style.borderColor = `${g.color}40`; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'rgba(139,92,246,0.1)'; }}>
                <div className="text-3xl mb-2">{g.icon}</div>
                <h3 className="font-teen text-[10px] text-[#e2e0e7] tracking-wider">{g.name}</h3>
                {!g.live && <span className="text-[8px] text-[#9ca3af]/20 mt-0.5">TBA</span>}
              </a>
            ))}
          </div>

          <div className="reveal text-center">
            <a href={GHOULVERSE_LINK?.domain || '#'} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 font-teen text-sm tracking-wider text-[#8b5cf6] transition-all hover:scale-105"
              style={{ border: '1px solid rgba(139,92,246,0.3)', borderRadius: '9999px', boxShadow: '0 0 20px rgba(139,92,246,0.1)' }}>
              Enter the GHOULVERSE <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ===== GAME ===== */}
      <section ref={gameRef} className="relative py-32 md:py-48 px-8 md:px-16">
        <div className="max-w-3xl mx-auto">
          <div className="reveal p-12 md:p-20 text-center neon-border"
            style={{ borderRadius: '32px', background: 'rgba(20,14,35,0.5)', backdropFilter: 'blur(20px)' }}>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-32 h-32 rounded-full opacity-[0.05] blur-3xl" style={{ background: '#8b5cf6' }} />
            </div>
            <Gamepad2 className="w-10 h-10 text-[#8b5cf6]/60 mx-auto mb-6" />
            <h2 className="font-teen text-3xl md:text-4xl text-[#e2e0e7] mb-4">GHOULVERSE.exe</h2>
            <p className="text-[#9ca3af]/60 max-w-sm mx-auto mb-8 font-light">Speedrun the Void. Pwn bacteria. Unlock all 12 ghouls. World record pending.</p>
            <a href={config.gameUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 font-teen text-sm tracking-wider text-[#8b5cf6] transition-all hover:scale-105"
              style={{ border: '1px solid rgba(139,92,246,0.3)', borderRadius: '9999px', boxShadow: '0 0 20px rgba(139,92,246,0.1)' }}>
              <Gamepad2 className="w-4 h-4" /> Play Now
            </a>
          </div>
        </div>
      </section>

      {/* ===== PORTFOLIO ===== */}
      <section ref={portfolioRef} className="relative py-20 px-8 md:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="reveal text-center mb-10">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#9ca3af]/30 mb-2 block">The House of GHOUL</span>
            <h3 className="font-teen text-2xl text-[#e2e0e7]">The Portfolio</h3>
          </div>
          <div className="reveal flex flex-wrap justify-center gap-4">
            {config.crossLinks.map((g) => {
              const isActive = g.id === config.id;
              return (
                <a key={g.id}
                  href={g.live ? g.domain : `https://www.ghoulverse.com/ghouls/${g.id}/`}
                  target="_blank" rel="noopener noreferrer"
                  className="group flex flex-col items-center p-4 transition-all duration-500"
                  style={{
                    background: isActive ? `${g.color}10` : 'rgba(139,92,246,0.04)',
                    borderRadius: '20px',
                    width: '90px',
                    height: '90px',
                    border: isActive ? `1px solid ${g.color}40` : '1px solid rgba(139,92,246,0.08)',
                  }}
                  onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.borderColor = `${g.color}30`; }}
                  onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.borderColor = 'rgba(139,92,246,0.08)'; }}>
                  <div className="text-xl group-hover:scale-110 transition-transform">{g.icon}</div>
                  <p className="text-[8px] tracking-wider uppercase text-[#e2e0e7] mt-1">{g.name.replace(' GHOUL', '')}</p>
                  {isActive && <span className="text-[7px] mt-0.5" style={{ color: g.color }}>{config.products.length} Products</span>}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== INVESTOR CTA ===== */}
      <section className="relative py-32 md:py-48 px-8 md:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="reveal">
            <InvestorCTA />
          </div>
        </div>
      </section>

      {/* ===== CTA / FOOTER ===== */}
      <section ref={ctaRef} className="relative py-32 md:py-48 px-8 md:px-16">
        <div className="max-w-xl mx-auto text-center">
          <div className="reveal mb-10">
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#8b5cf6]/50 mb-4 block">Stay in the Loop</span>
            <h2 className="font-teen text-4xl text-[#e2e0e7] mb-4">{config.cta.headline}</h2>
            <p className="text-[#9ca3af]/60 font-light">{config.cta.subheadline}</p>
          </div>

          <div className="reveal flex flex-col sm:flex-row gap-3 mb-16">
            <input type="email" placeholder={config.cta.placeholderText}
              className="flex-1 px-6 py-4 text-sm text-[#e2e0e7] placeholder:text-[#9ca3af]/25 outline-none bg-transparent font-light"
              style={{ border: '1px solid rgba(139,92,246,0.15)', borderRadius: '9999px', background: 'rgba(139,92,246,0.03)' }} />
            <button className="px-8 py-4 font-teen text-sm tracking-wider text-white transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #8b5cf6, #e879f9)', borderRadius: '9999px', boxShadow: '0 8px 25px rgba(139,92,246,0.25)' }}>
              {config.cta.buttonText}
            </button>
          </div>

          <div className="reveal flex items-center justify-center gap-4 mb-10">
            {[Twitter, Instagram, Youtube].map((Icon, i) => {
              const colors = ['#8b5cf6', '#e879f9', '#8b5cf6'];
              return (
                <div title="Coming soon" key={i} className="w-11 h-11 flex items-center justify-center transition-all hover:scale-110"
                  style={{ borderRadius: '50%', border: `1px solid ${colors[i]}15`, background: 'rgba(139,92,246,0.05)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${colors[i]}40`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${colors[i]}15`; }}>
                  <Icon className="w-4 h-4" style={{ color: colors[i], opacity: 0.7 }} />
                </div>
              );
            })}
          </div>

          <div className="reveal mb-8 flex items-center justify-center gap-4 text-xs font-light flex-wrap">
            <a href={GHOULVERSE_LINK?.domain || '#'} target="_blank" rel="noopener noreferrer"
              className="text-[#9ca3af]/50 hover:text-[#8b5cf6] transition-colors flex items-center gap-1 py-2 px-3 min-h-11">
              <Ghost className="w-3 h-3" /> Explore GHOULVERSE
            </a>
            <span className="text-[#9ca3af]/10">|</span>
            <a href={config.gameUrl} target="_blank" rel="noopener noreferrer"
              className="text-[#9ca3af]/50 hover:text-[#e879f9] transition-colors flex items-center gap-1 py-2 px-3 min-h-11">
              <Gamepad2 className="w-3 h-3" /> Play GHOULVERSE
            </a>
            <span className="text-[#9ca3af]/10">|</span>
            <a href="#ecosystem"
              className="text-[#9ca3af]/50 hover:text-[#f59e0b] transition-colors flex items-center gap-1 py-2 px-3 min-h-11">
              <Briefcase className="w-3 h-3" /> Investors
            </a>
          </div>

          <div className="reveal mb-4 flex items-center justify-center gap-3 text-[10px] tracking-wider uppercase text-[#78716c]/30">
            <a href="/privacy.html" className="hover:text-[#8b5cf6] transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="/terms.html" className="hover:text-[#8b5cf6] transition-colors">Terms of Service</a>
            <span>|</span>
            <a href="/cookies.html" className="hover:text-[#8b5cf6] transition-colors">Cookie Policy</a>
          </div>

          <p className="reveal text-[#9ca3af]/15 text-xs tracking-wider font-light">
            &copy; 2025 <span className="font-teen text-[#8b5cf6]/30">{config.name}</span> — Part of the{' '}
            <a href={GHOULVERSE_LINK?.domain || '#'} target="_blank" rel="noopener noreferrer" className="hover:text-[#8b5cf6] transition-colors">GHOULVERSE</a>
          </p>
        </div>
      </section>
    </div>
  );
}
