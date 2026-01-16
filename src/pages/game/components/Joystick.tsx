import { useState, useRef, useEffect } from 'react';

interface JoystickProps {
  onMove: (x: number, y: number) => void;
  label?: string;
  color?: string;
}

export default function Joystick({ onMove, label, color = 'bg-blue-500' }: JoystickProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);
  
  // Configuration
  const radius = 50; // Max distance from center

  const handleStart = (clientX: number, clientY: number) => {
    setActive(true);
    handleMove(clientX, clientY);
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = clientX - centerX;
    const dy = clientY - centerY;
    
    const distance = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);
    
    const clampedDistance = Math.min(distance, radius);
    const x = Math.cos(angle) * clampedDistance;
    const y = Math.sin(angle) * clampedDistance;
    
    setPosition({ x, y });
    
    // Normalize output (-1 to 1)
    onMove(x / radius, y / radius);
  };

  const handleEnd = () => {
    setActive(false);
    setPosition({ x: 0, y: 0 });
    onMove(0, 0);
  };

  // Mouse Events
  const onMouseDown = (e: React.MouseEvent) => handleStart(e.clientX, e.clientY);
  
  // Touch Events
  const onTouchStart = (e: React.TouchEvent) => {
    // e.preventDefault(); // Prevent scrolling - handled by CSS touch-action
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };

  useEffect(() => {
    const onWindowMouseMove = (e: MouseEvent) => {
      if (active) handleMove(e.clientX, e.clientY);
    };
    const onWindowMouseUp = () => {
      if (active) handleEnd();
    };
    
    const onWindowTouchMove = (e: TouchEvent) => {
      if (active) {
        // e.preventDefault();
        const touch = e.touches[0];
        handleMove(touch.clientX, touch.clientY);
      }
    };
    const onWindowTouchEnd = () => {
      if (active) handleEnd();
    };

    if (active) {
      window.addEventListener('mousemove', onWindowMouseMove);
      window.addEventListener('mouseup', onWindowMouseUp);
      window.addEventListener('touchmove', onWindowTouchMove, { passive: false });
      window.addEventListener('touchend', onWindowTouchEnd);
    }

    return () => {
      window.removeEventListener('mousemove', onWindowMouseMove);
      window.removeEventListener('mouseup', onWindowMouseUp);
      window.removeEventListener('touchmove', onWindowTouchMove);
      window.removeEventListener('touchend', onWindowTouchEnd);
    };
  }, [active]);

  return (
    <div className="flex flex-col items-center select-none touch-none">
      <div 
        ref={containerRef}
        className="relative w-32 h-32 rounded-full bg-slate-800/50 border-2 border-slate-600 flex items-center justify-center shadow-inner"
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
      >
        {/* Knob */}
        <div 
          className={`w-12 h-12 rounded-full shadow-lg ${color} absolute transition-transform duration-75`}
          style={{ 
            transform: `translate(${position.x}px, ${position.y}px)`,
            cursor: active ? 'grabbing' : 'grab'
          }}
        />
      </div>
      {label && <span className="mt-2 text-sm text-gray-400 font-medium">{label}</span>}
    </div>
  );
}
