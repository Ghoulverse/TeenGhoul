import { config } from '@/data/ghoul.config';
import { CheckCircle2, Circle, Clock, Rocket } from 'lucide-react';

export default function RoadmapTimeline() {
  const statusConfig = {
    complete: { icon: CheckCircle2, color: '#00ff41', label: 'COMPLETE' },
    'in-progress': { icon: Clock, color: '#00f0ff', label: 'IN PROGRESS' },
    upcoming: { icon: Circle, color: '#a855f7', label: 'UPCOMING' },
  };

  return (
    <section className="relative py-24 md:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#f59e0b] text-xs font-bold tracking-[0.3em] uppercase mb-3 block">
            The Future
          </span>
          <h2 className="font-mono text-4xl md:text-5xl text-white mb-4">
            Roadmap & Expansion
          </h2>
          <p className="text-[#94a3b8] max-w-xl mx-auto">
            The House of GHOUL is not a single brand — it is a platform for vertical domination.
          </p>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#00ff41] via-[#00f0ff] to-[#a855f7] opacity-30" />

          {config.roadmap.map((phase) => {
            const StatusIcon = statusConfig[phase.status].icon;
            const color = statusConfig[phase.status].color;
            return (
              <div key={phase.phase} className="relative pl-16 md:pl-20 pb-12 last:pb-0">
                {/* Node */}
                <div
                  className="absolute left-4 md:left-6 w-5 h-5 rounded-full border-2 flex items-center justify-center"
                  style={{ borderColor: color, background: `${color}20`, top: '2px' }}
                >
                  <StatusIcon className="w-3 h-3" style={{ color }} />
                </div>

                {/* Content */}
                <div className="glass rounded-xl p-5 md:p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded-full" style={{ background: `${color}20`, color }}>
                      {statusConfig[phase.status].label}
                    </span>
                    <span className="font-mono text-xs text-[#94a3b8]">{phase.phase}</span>
                  </div>
                  <h3 className="font-mono text-lg text-white mb-3">{phase.title}</h3>
                  <ul className="space-y-2">
                    {phase.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-[#94a3b8]">
                        <Rocket className="w-3 h-3 text-[#94a3b8]/50" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
