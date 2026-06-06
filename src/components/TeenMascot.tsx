import { useEffect, useRef, useState, useCallback } from 'react';
import { useTeenCursor } from '@/hooks/useTeenCursor';

interface GlitchPixel {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
  color: string;
}

interface Ripple {
  x: number;
  y: number;
  size: number;
  opacity: number;
  maxSize: number;
}

interface MiniGlitchGhost {
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  scale: number;
  rotation: number;
}

const SPEECH_LINES = [
  "No judgment.",
  "Let's clean this up.",
  "Maximum efficiency.",
];

const EXPRESSION_NAMES = ['Chill', 'Hyped', 'DJ Mode'];

export default function TeenMascot() {
  const { x, y, isMoving, velocity } = useTeenCursor();
  const [expression, setExpression] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [speechBubble, setSpeechBubble] = useState('');

  const pixelsRef = useRef<GlitchPixel[]>([]);
  const ripplesRef = useRef<Ripple[]>([]);
  const miniGhostsRef = useRef<MiniGlitchGhost[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const clickCountRef = useRef(0);
  const cursorRef = useRef({ x, y, isMoving, velocity, mascotSize: 0 });

  const mascotSize = typeof window !== 'undefined' && window.innerWidth < 768 ? 180 : 280;

  const spawnRipples = useCallback((cx: number, cy: number, count = 3) => {
    for (let i = 0; i < count; i++) {
      ripplesRef.current.push({
        x: cx + mascotSize / 2,
        y: cy + mascotSize / 2,
        size: 5,
        opacity: 0.6,
        maxSize: 40 + i * 20,
      });
    }
  }, [mascotSize]);

  const handleClick = useCallback(() => {
    clickCountRef.current = (clickCountRef.current + 1) % 3;
    const newExpr = clickCountRef.current;
    setExpression(newExpr);
    spawnRipples(x, y, newExpr === 2 ? 6 : 3);

    const line = SPEECH_LINES[newExpr] || SPEECH_LINES[0];
    setSpeechBubble(line);
    setTimeout(() => setSpeechBubble(''), 3000);
  }, [x, y, spawnRipples]);

  const handleDoubleClick = useCallback(() => {
    if (miniGhostsRef.current.length >= 5) return;
    for (let i = 0; i < 3; i++) {
      miniGhostsRef.current.push({
        x: x + mascotSize / 2 + (Math.random() - 0.5) * 60,
        y: y + mascotSize,
        vx: (Math.random() - 0.5) * 2,
        vy: -Math.random() * 3 - 1,
        opacity: 1,
        scale: 0.2 + Math.random() * 0.2,
        rotation: Math.random() * 360,
      });
    }
  }, [x, y, mascotSize]);

  cursorRef.current = { x, y, isMoving, velocity, mascotSize };

  // Expression glow colors
  const glowColors = [
    'rgba(139,92,246,0.25)',
    'rgba(232,121,249,0.35)',
    'rgba(168,85,247,0.45)',
  ];

  // Animation loop
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

    let pixelTimer = 0;

    const animate = () => {
      const { x, y, isMoving, velocity, mascotSize } = cursorRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn glitch pixels from movement
      if (isMoving && velocity > 1) {
        pixelTimer++;
        if (pixelTimer > 4) {
          pixelTimer = 0;
          const cx = x + mascotSize / 2;
          const cy = y + mascotSize / 2;
          const colors = ['#8b5cf6', '#a78bfa', '#c4b5fd', '#e879f9', '#d8b4fe'];
          for (let k = 0; k < 3; k++) {
            pixelsRef.current.push({
              x: cx + (Math.random() - 0.5) * 40,
              y: cy + (Math.random() - 0.5) * 40,
              vx: (Math.random() - 0.5) * 3,
              vy: (Math.random() - 0.5) * 3,
              size: Math.random() * 4 + 2,
              opacity: 0.8,
              life: 0,
              maxLife: Math.random() * 40 + 20,
              color: colors[Math.floor(Math.random() * colors.length)],
            });
          }
        }
      }

      // Always spawn a few ambient pixels
      if (Math.random() < 0.08) {
        const colors = ['#8b5cf6', '#a78bfa', '#c4b5fd'];
        pixelsRef.current.push({
          x: x + mascotSize / 2 + (Math.random() - 0.5) * 50,
          y: y + mascotSize * 0.3 + (Math.random() - 0.5) * 50,
          vx: (Math.random() - 0.5) * 1,
          vy: (Math.random() - 0.5) * 1,
          size: Math.random() * 3 + 1,
          opacity: 0.5,
          life: 0,
          maxLife: Math.random() * 60 + 30,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }

      // Glitch pixels
      pixelsRef.current = pixelsRef.current.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.95;
        p.vy *= 0.95;
        p.life++;
        const lifeRatio = p.life / p.maxLife;
        p.opacity = Math.max(0, 0.8 * (1 - lifeRatio));

        if (p.opacity <= 0) return false;

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        // Draw as glitch rectangle
        ctx.fillRect(p.x, p.y, p.size * (Math.random() > 0.5 ? 2 : 1), p.size);
        ctx.restore();

        return true;
      });

      // Ripples
      ripplesRef.current = ripplesRef.current.filter((r) => {
        r.size += 2;
        r.opacity -= 0.012;
        if (r.opacity <= 0) return false;

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.size, 0, Math.PI * 2);
        ctx.strokeStyle = '#8b5cf6';
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = r.opacity;
        ctx.stroke();

        return true;
      });

      // Mini glitch ghosts
      miniGhostsRef.current = miniGhostsRef.current.filter((mg) => {
        mg.x += mg.vx;
        mg.y += mg.vy;
        mg.vy -= 0.01;
        mg.vx *= 0.995;
        mg.opacity -= 0.003;
        mg.rotation += 1;

        if (mg.opacity <= 0) return false;

        ctx.save();
        ctx.globalAlpha = mg.opacity;
        ctx.translate(mg.x, mg.y);
        ctx.rotate((mg.rotation * Math.PI) / 180);
        ctx.scale(mg.scale, mg.scale);

        // Glitch ghost body
        ctx.beginPath();
        ctx.arc(0, -5, 16, Math.PI, 0);
        ctx.bezierCurveTo(16, 10, 12, 22, 8, 18);
        ctx.bezierCurveTo(4, 24, 0, 20, -4, 22);
        ctx.bezierCurveTo(-8, 24, -12, 20, -16, 18);
        ctx.bezierCurveTo(-20, 14, -16, 6, -16, -5);
        ctx.fillStyle = '#a78bfa';
        ctx.fill();

        // Glitch eyes
        ctx.fillStyle = '#0f0a1a';
        ctx.fillRect(-7, -6, 4, 4);
        ctx.fillRect(3, -6, 4, 4);

        // Glitch effect lines
        ctx.fillStyle = '#e879f9';
        ctx.fillRect(-12, 2, 8, 1);
        ctx.fillRect(4, 6, 6, 1);

        ctx.restore();
        return true;
      });

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const expressionFilter = [
    'none',
    'brightness(1.2) saturate(1.3) hue-rotate(20deg)',
    'brightness(1.3) saturate(1.5) hue-rotate(40deg) contrast(1.1)',
  ];

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 9996 }}
      />

      <div
        className="fixed pointer-events-none"
        style={{
          left: x,
          top: y,
          zIndex: 9997,
          width: mascotSize,
          height: mascotSize,
        }}
      >
        {speechBubble && (
          <div
            className="absolute -top-16 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl whitespace-nowrap font-teen text-xs tracking-wider pointer-events-none"
            style={{
              background: 'rgba(20, 14, 35, 0.95)',
              border: '1px solid #8b5cf6',
              color: '#d8b4fe',
              boxShadow: '0 4px 20px rgba(139,92,246,0.25), 0 0 10px rgba(139,92,246,0.1)',
              animation: 'bounce-subtle 0.6s ease-in-out infinite',
              zIndex: 9999,
            }}
          >
            {speechBubble}
            <div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0"
              style={{
                borderLeft: '8px solid transparent',
                borderRight: '8px solid transparent',
                borderTop: '8px solid #8b5cf6',
              }}
            />
          </div>
        )}

        {/* Expression indicator */}
        <div
          className="absolute -top-6 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[8px] tracking-wider uppercase font-teen pointer-events-none"
          style={{
            background: 'rgba(139,92,246,0.15)',
            color: '#a78bfa',
            border: '1px solid rgba(139,92,246,0.2)',
          }}
        >
          {EXPRESSION_NAMES[expression]}
        </div>

        <div
          className="relative pointer-events-auto cursor-pointer"
          style={{
            width: mascotSize,
            height: mascotSize,
            animation: !isMoving ? `ghost-bob 3s ease-in-out infinite, ghost-sway 4s ease-in-out infinite` : undefined,
            filter: `drop-shadow(0 0 ${isHovered ? 24 : 14}px ${glowColors[expression]})`,
          }}
          onClick={handleClick}
          onDoubleClick={handleDoubleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src="/ghoul_mascot.png"
            alt="TEEN GHOUL"
            className="w-full h-full object-contain"
            draggable={false}
            style={{
              filter: isHovered
                ? `${expressionFilter[expression]} brightness(1.2)`
                : expressionFilter[expression],
              transition: 'filter 0.3s ease',
            }}
          />

          {/* DJ Mode equalizer bars overlay */}
          {expression === 2 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-end gap-0.5 h-5">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-1 rounded-sm"
                  style={{
                    background: '#e879f9',
                    height: '4px',
                    animation: `eq-bar ${0.4 + i * 0.15}s ease-in-out infinite`,
                    animationDelay: `${i * 0.1}s`,
                    boxShadow: '0 0 4px #e879f9',
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
