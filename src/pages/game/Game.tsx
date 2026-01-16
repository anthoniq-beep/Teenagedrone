import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import CityCanvas from './components/CityCanvas';
import Joystick from './components/Joystick';
import { useDroneStore } from './store/useDroneStore';

export default function GameRun() {
  const navigate = useNavigate();
  const { setInputs, updatePhysics, reset } = useDroneStore();

  // Game Loop
  useEffect(() => {
    let animationFrameId: number;
    
    const loop = () => {
      updatePhysics();
      animationFrameId = requestAnimationFrame(loop);
    };
    
    loop();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [updatePhysics]);

  // Cleanup on unmount
  useEffect(() => {
    return () => reset();
  }, [reset]);

  return (
    <div className="flex flex-col h-screen bg-slate-900 touch-none overflow-hidden">
      {/* Header / HUD */}
      <div className="absolute top-0 left-0 w-full z-10 p-4 flex justify-between items-start pointer-events-none">
        <button 
          onClick={() => navigate('/game')}
          className="pointer-events-auto p-2 bg-black/40 text-white rounded-full hover:bg-black/60 backdrop-blur-sm"
        >
          <ArrowLeft size={24} />
        </button>
        
        <div className="flex flex-col items-end gap-2">
           <button 
            onClick={reset}
            className="pointer-events-auto p-2 bg-black/40 text-white rounded-full hover:bg-black/60 backdrop-blur-sm"
          >
            <RefreshCw size={20} />
          </button>
        </div>
      </div>

      {/* Main Viewport (Canvas) */}
      <div className="flex-1 relative bg-gray-800">
        <CityCanvas />
      </div>

      {/* Controls Area */}
      <div className="h-48 bg-slate-900/90 border-t border-slate-700 grid grid-cols-2 gap-4 p-4 shrink-0 backdrop-blur">
        {/* Left Stick: Height (Y) & Rotation (X) */}
        <div className="flex items-center justify-center border-r border-slate-700/50">
          <Joystick 
            label="升降 / 转向" 
            color="bg-blue-500"
            onMove={(x, y) => setInputs({ yaw: x, throttle: y })}
          />
        </div>

        {/* Right Stick: Forward/Back (Y) & Left/Right (X) */}
        <div className="flex items-center justify-center">
          <Joystick 
            label="前后 / 平移" 
            color="bg-green-500"
            onMove={(x, y) => setInputs({ roll: x, pitch: y })}
          />
        </div>
      </div>
    </div>
  );
}
