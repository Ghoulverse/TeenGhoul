import { useRef, useEffect, useCallback, useState } from 'react';

interface CursorState {
  x: number;
  y: number;
  isMoving: boolean;
  velocity: number;
  breathPhase: number;
}

export function useTeenCursor(): CursorState {
  const [state, setState] = useState<CursorState>({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 - 140 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 - 140 : 0,
    isMoving: false,
    velocity: 0,
    breathPhase: 0,
  });

  const targetRef = useRef({ x: state.x, y: state.y });
  const currentRef = useRef({ x: state.x, y: state.y });
  const velocityRef = useRef({ x: 0, y: 0 });
  const lastMoveTime = useRef(Date.now());
  const rafRef = useRef<number>(0);
  const breathStartRef = useRef(Date.now());

  const TRAIL_OFFSET = 80;

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const size = window.innerWidth < 768 ? 180 : 280;
    targetRef.current = {
      x: Math.max(10, Math.min(window.innerWidth - size - 10, e.clientX - size / 2 + TRAIL_OFFSET)),
      y: Math.max(10, Math.min(window.innerHeight - size - 10, e.clientY - size / 2 + TRAIL_OFFSET)),
    };
    lastMoveTime.current = Date.now();
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    const touch = e.touches[0];
    const size = window.innerWidth < 768 ? 180 : 280;
    targetRef.current = {
      x: Math.max(10, Math.min(window.innerWidth - size - 10, touch.clientX - size / 2 + TRAIL_OFFSET)),
      y: Math.max(10, Math.min(window.innerHeight - size - 10, touch.clientY - size / 2 + TRAIL_OFFSET)),
    };
    lastMoveTime.current = Date.now();
  }, []);

  useEffect(() => {
    const spring = 0.04;
    const friction = 0.92;
    const breathInterval = 4000;

    const animate = () => {
      const dx = targetRef.current.x - currentRef.current.x;
      const dy = targetRef.current.y - currentRef.current.y;

      velocityRef.current.x = (velocityRef.current.x + dx * spring) * friction;
      velocityRef.current.y = (velocityRef.current.y + dy * spring) * friction;

      currentRef.current.x += velocityRef.current.x;
      currentRef.current.y += velocityRef.current.y;

      const speed = Math.sqrt(
        velocityRef.current.x ** 2 + velocityRef.current.y ** 2
      );

      const timeSinceMove = Date.now() - lastMoveTime.current;
      const isMoving = timeSinceMove < 150 || speed > 0.5;

      const elapsed = Date.now() - breathStartRef.current;
      const breathPhase = (elapsed % breathInterval) / breathInterval;

      setState({
        x: currentRef.current.x,
        y: currentRef.current.y,
        isMoving,
        velocity: speed,
        breathPhase,
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [handleMouseMove, handleTouchMove]);

  return state;
}
