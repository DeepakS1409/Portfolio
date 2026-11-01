import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isPointerDown, setIsPointerDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show custom cursor on fine pointers (desktop)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.classList.contains('clickable')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const onMouseDown = () => setIsPointerDown(true);
    const onMouseUp = () => setIsPointerDown(false);
    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  // Smooth trailing effect
  useEffect(() => {
    if (!isVisible) return;
    let animId: number;
    const animate = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.22,
        y: prev.y + (position.y - prev.y) * 0.22
      }));
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [position, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Central Cyber Target Dot */}
      <div
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-cyan-400 -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 shadow-[0_0_10px_#00f2fe]"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${isPointerDown ? 0.7 : isHovered ? 1.5 : 1})`,
        }}
      />

      {/* Trailing Holographic Ring */}
      <div
        className="fixed top-0 left-0 rounded-full border border-cyan-400/70 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 pointer-events-none"
        style={{
          width: isHovered ? '48px' : '32px',
          height: isHovered ? '48px' : '32px',
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0) scale(${isPointerDown ? 0.8 : 1})`,
          backgroundColor: isHovered ? 'rgba(0, 242, 254, 0.1)' : 'transparent',
          boxShadow: isHovered ? '0 0 20px rgba(0, 242, 254, 0.4)' : 'none'
        }}
      >
        {/* Reticle tick marks */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-0.5 h-1.5 bg-cyan-400/80" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 w-0.5 h-1.5 bg-cyan-400/80" />
        <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-1.5 h-0.5 bg-cyan-400/80" />
        <div className="absolute right-0 top-1/2 translate-x-1 -translate-y-1/2 w-1.5 h-0.5 bg-cyan-400/80" />
      </div>
    </div>
  );
};
