import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useState, useRef, useEffect } from 'react';

interface JoystickProps {
  id: string; // Unique ID for selector
  onMove: (x: number, y: number) => void;
  label?: string;
  color?: string;
}

export default function Joystick({ id, onMove, label, color = 'bg-blue-500' }: JoystickProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const centerRef = useRef({ x: 0, y: 0 });
  const radius = 50; // px

  // Initialize center position
  useEffect(() => {
    // Wait for layout
    const timer = setTimeout(() => {
      const query = Taro.createSelectorQuery();
      query.select(`#${id}`).boundingClientRect((rect) => {
        if (rect) {
          centerRef.current = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
          };
        }
      }).exec();
    }, 500); 
    return () => clearTimeout(timer);
  }, [id]);

  const handleTouch = (e) => {
    e.stopPropagation();

    // Use changedTouches for 'end', but touches for 'move'. 
    // Actually, for multi-touch, we should track identifier.
    // For simplicity, just take the first touch in the list that matches?
    // Taro events bubble.
    const touch = e.touches[0];
    if (!touch) return;

    // Recalculate center if needed (optional, but robust)
    
    const dx = touch.clientX - centerRef.current.x;
    const dy = touch.clientY - centerRef.current.y;
    
    const distance = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);
    
    const clampedDistance = Math.min(distance, radius);
    const x = Math.cos(angle) * clampedDistance;
    const y = Math.sin(angle) * clampedDistance;
    
    setPosition({ x, y });
    onMove(x / radius, y / radius);
  };

  const handleEnd = (e) => {
    e.stopPropagation();
    setPosition({ x: 0, y: 0 });
    onMove(0, 0);
  };

  return (
    <View className="flex flex-col items-center">
      <View 
        id={id}
        className="relative w-24 h-24 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center bg-opacity-50"
        onTouchStart={handleTouch}
        onTouchMove={handleTouch}
        onTouchEnd={handleEnd}
        onTouchCancel={handleEnd}
        catchMove
      >
        <View 
          className={`w-12 h-12 rounded-full shadow-lg ${color} absolute`}
          style={{ 
            transform: `translate(${position.x}px, ${position.y}px)`
          }}
        />
      </View>
      {label && <View className="mt-2 text-sm text-gray-400 font-medium">{label}</View>}
    </View>
  );
}
