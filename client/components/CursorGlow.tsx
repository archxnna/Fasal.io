import { useEffect, useRef, useState } from 'react';

export default function CursorGlow() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [trails, setTrails] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    const speed = 0.15; // Adjust for smoothness (lower = smoother but slower)
    let trailCounter = 0;
    let lastTrailTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        cursor.classList.add('hover');
      }
    };

    const handleMouseLeave = () => {
      cursor.classList.remove('hover');
    };

    const animate = () => {
      // Smooth follow effect
      const dx = mouseX - cursorX;
      const dy = mouseY - cursorY;

      cursorX += dx * speed;
      cursorY += dy * speed;

      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;

      // Create trail particles
      const now = Date.now();
      const velocity = Math.sqrt(dx * dx + dy * dy);
      
      // Only create trails when cursor is moving and every 30ms
      if (velocity > 2 && now - lastTrailTime > 30) {
        lastTrailTime = now;
        const newTrail = { id: trailCounter++, x: cursorX, y: cursorY };
        
        setTrails((prev) => [...prev.slice(-15), newTrail]); // Keep last 15 trails
        
        // Remove trail after animation completes
        setTimeout(() => {
          setTrails((prev) => prev.filter((t) => t.id !== newTrail.id));
        }, 800);
      }

      requestAnimationFrame(animate);
    };

    // Event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);

    // Start animation
    animate();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor-glow" />
      {trails.map((trail) => (
        <div
          key={trail.id}
          className="cursor-trail"
          style={{
            left: `${trail.x}px`,
            top: `${trail.y}px`,
          }}
        />
      ))}
    </>
  );
}
