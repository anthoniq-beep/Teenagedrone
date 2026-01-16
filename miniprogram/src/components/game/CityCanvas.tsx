import { Canvas, View } from '@tarojs/components';
import Taro, { useReady } from '@tarojs/taro';
import { useRef, useEffect } from 'react';
import { useDroneStore } from '../../store/useDroneStore';

export default function CityCanvas() {
  const frameId = useRef<number>(0);
  const canvasRef = useRef<any>(null);

  // Draw City Background
  const drawCity = (ctx: any, width: number, height: number) => {
    // Background
    ctx.fillStyle = '#e5e5e5';
    ctx.fillRect(0, 0, width, height);

    // Grid / Roads
    ctx.strokeStyle = '#9ca3af';
    ctx.lineWidth = 40;
    
    // Draw a grid of roads every 400 units
    for (let i = 0; i < width; i += 400) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, height); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(width, i); ctx.stroke();
    }
    
    // Buildings
    ctx.fillStyle = '#64748b';
    ctx.fillRect(100, 100, 200, 200);
    ctx.fillRect(500, 500, 300, 300);
    ctx.fillRect(800, 200, 150, 400);
    
    // Parks
    ctx.fillStyle = '#86efac';
    ctx.fillRect(500, 100, 200, 200);
  };

  // Draw Drone
  const drawDrone = (ctx: any, droneX: number, droneY: number, droneRot: number, droneH: number) => {
    ctx.save();
    ctx.translate(droneX, droneY);
    ctx.rotate((droneRot * Math.PI) / 180);
    
    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    const shadowScale = 1 - Math.min(droneH / 200, 0.5);
    ctx.beginPath();
    ctx.arc(5, 5 + droneH/2, 15 * shadowScale, 0, Math.PI * 2); // Simplified ellipse
    ctx.fill();

    // Body
    ctx.fillStyle = '#ef4444';
    ctx.beginPath(); ctx.arc(0, 0, 10, 0, Math.PI * 2); ctx.fill();

    // Arms
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(-15, -15); ctx.lineTo(15, 15);
    ctx.moveTo(15, -15); ctx.lineTo(-15, 15);
    ctx.stroke();

    // Propellers
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    [[-1, -1], [1, -1], [1, 1], [-1, 1]].forEach(([dx, dy]) => {
      ctx.beginPath();
      ctx.arc(dx * 15, dy * 15, 8, 0, Math.PI * 2);
      ctx.fill(); ctx.stroke();
    });
    
    // Direction
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.moveTo(0, -10); ctx.lineTo(-5, 0); ctx.lineTo(5, 0);
    ctx.fill();

    ctx.restore();
  };

  useReady(() => {
    const query = Taro.createSelectorQuery();
    query.select('#gameCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        if (!res[0] || !res[0].node) return;
        
        const canvas = res[0].node;
        canvasRef.current = canvas;
        const ctx = canvas.getContext('2d');
        const width = res[0].width;
        const height = res[0].height;

        const dpr = Taro.getSystemInfoSync().pixelRatio;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);

        const render = () => {
          // Clear screen
          ctx.clearRect(0, 0, width, height);
          
          // Get State
          const state = useDroneStore.getState();

          // Camera Follow Logic
          ctx.save();
          // Center camera on drone
          const camX = width / 2 - state.x;
          const camY = height / 2 - state.y;
          
          // Apply camera transform
          ctx.translate(camX, camY);
          
          // Draw World (Map size 2000x2000)
          drawCity(ctx, 2000, 2000);
          
          // Draw Drone
          drawDrone(ctx, state.x, state.y, state.rotation, state.height);
          
          ctx.restore();

          // Loop
          frameId.current = canvas.requestAnimationFrame(render);
        };

        render();
      });
  });
  
  useEffect(() => {
    return () => {
      if (canvasRef.current && frameId.current) {
        canvasRef.current.cancelAnimationFrame(frameId.current);
      }
    };
  }, []);

  return (
    <View className="w-full h-full bg-slate-800">
      <Canvas type="2d" id="gameCanvas" className="w-full h-full" />
    </View>
  );
}
