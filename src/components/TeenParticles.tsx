import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
  type: 'glitch' | 'grid' | 'note' | 'spark';
}

export default function TeenParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = ['#8b5cf6', '#a78bfa', '#c4b5fd', '#d8b4fe', '#f0abfc', '#e879f9'];

    const createParticle = (): Particle => {
      const typeRoll = Math.random();
      let type: Particle['type'];
      if (typeRoll < 0.35) type = 'glitch';
      else if (typeRoll < 0.55) type = 'grid';
      else if (typeRoll < 0.75) type = 'note';
      else type = 'spark';

      return {
        x: Math.random() * canvas.width,
        y: type === 'grid' ? Math.random() * canvas.height : canvas.height + Math.random() * 30,
        size: type === 'glitch' ? Math.random() * 3 + 1 : type === 'grid' ? Math.random() * 1.5 + 0.5 : Math.random() * 2.5 + 0.5,
        speedY: type === 'grid' ? 0 : -(Math.random() * 0.8 + 0.2),
        speedX: type === 'grid' ? (Math.random() - 0.5) * 0.1 : (Math.random() - 0.5) * 0.6,
        opacity: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 0,
        maxLife: Math.random() * 1000 + 600,
        type,
      };
    };

    for (let i = 0; i < 50; i++) {
      const p = createParticle();
      p.y = Math.random() * canvas.height;
      p.life = Math.random() * p.maxLife;
      particlesRef.current.push(p);
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p, i) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.life++;

        const lifeRatio = p.life / p.maxLife;
        const fadeIn = Math.min(lifeRatio * 4, 1);
        const fadeOut = lifeRatio > 0.92 ? (1 - lifeRatio) / 0.08 : 1;
        const currentOpacity = p.opacity * fadeIn * fadeOut;

        ctx.save();
        ctx.globalAlpha = currentOpacity;

        if (p.type === 'glitch') {
          ctx.fillStyle = p.color;
          const w = p.size * (Math.random() > 0.5 ? 3 : 1);
          const h = p.size * (Math.random() > 0.5 ? 1 : 3);
          ctx.fillRect(p.x, p.y, w, h);
          if (Math.random() < 0.02) {
            ctx.fillRect(p.x - 10, p.y, 20, 0.5);
          }
        } else if (p.type === 'grid') {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
          particlesRef.current.slice(i + 1, i + 4).forEach((other) => {
            if (other.type === 'grid') {
              const dx = other.x - p.x;
              const dy = other.y - p.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 120) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(other.x, other.y);
                ctx.strokeStyle = p.color;
                ctx.lineWidth = 0.3;
                ctx.globalAlpha = currentOpacity * 0.15 * (1 - dist / 120);
                ctx.stroke();
              }
            }
          });
        } else if (p.type === 'note') {
          ctx.fillStyle = p.color;
          ctx.font = `${p.size * 6}px monospace`;
          ctx.globalAlpha = currentOpacity * 0.4;
          const notes = ['♪', '♫', '♬', '♩'];
          ctx.fillText(notes[Math.floor(Math.random() * notes.length)], p.x, p.y);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        ctx.restore();

        if (p.life >= p.maxLife || (p.type !== 'grid' && p.y < -30)) {
          particlesRef.current[i] = createParticle();
        }
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
