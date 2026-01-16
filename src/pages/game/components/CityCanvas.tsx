import { useEffect, useRef } from 'react';
import { useDroneStore } from '../store/useDroneStore';

export default function CityCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { x, y, rotation, height } = useDroneStore();

  // Draw City Background (Static)
  const drawCity = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Background
    ctx.fillStyle = '#e5e5e5'; // Ground
    ctx.fillRect(0, 0, width, height);

    // Roads (Grid)
    ctx.strokeStyle = '#9ca3af';
    ctx.lineWidth = 40;
    
    // Vertical Roads
    for (let i = 100; i < width; i += 200) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
      ctx.stroke();
      
      // Dashed line
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.setLineDash([20, 20]);
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.strokeStyle = '#9ca3af';
      ctx.lineWidth = 40;
    }

    // Horizontal Roads
    for (let j = 100; j < height; j += 200) {
      ctx.beginPath();
      ctx.moveTo(0, j);
      ctx.lineTo(width, j);
      ctx.stroke();

      // Dashed line
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.setLineDash([20, 20]);
      ctx.beginPath();
      ctx.moveTo(0, j);
      ctx.lineTo(width, j);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.strokeStyle = '#9ca3af';
      ctx.lineWidth = 40;
    }

    // Buildings (Simple Blocks)
    ctx.fillStyle = '#64748b'; // Slate 500
    // Draw some random blocks
    ctx.fillRect(20, 20, 60, 60);
    ctx.fillRect(220, 20, 160, 60);
    ctx.fillRect(20, 220, 60, 160);
    ctx.fillStyle = '#475569'; // Slate 600
    ctx.fillRect(220, 220, 160, 160);
    
    // Parks
    ctx.fillStyle = '#86efac'; // Green
    ctx.fillRect(420, 20, 100, 100);
    ctx.beginPath();
    ctx.arc(470, 70, 30, 0, Math.PI * 2);
    ctx.fillStyle = '#22c55e';
    ctx.fill();
  };

  // Draw Drone
  const drawDrone = (ctx: CanvasRenderingContext2D, droneX: number, droneY: number, droneRot: number, droneH: number) => {
    ctx.save();
    ctx.translate(droneX, droneY);
    ctx.rotate((droneRot * Math.PI) / 180);
    
    // Shadow (based on height)
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    const shadowScale = 1 - Math.min(droneH / 200, 0.5);
    ctx.beginPath();
    ctx.ellipse(5, 5 + droneH/2, 15 * shadowScale, 15 * shadowScale, 0, 0, Math.PI * 2);
    ctx.fill();

    // Drone Body
    ctx.fillStyle = '#ef4444'; // Red center
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, Math.PI * 2);
    ctx.fill();

    // Arms
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(-15, -15);
    ctx.lineTo(15, 15);
    ctx.moveTo(15, -15);
    ctx.lineTo(-15, 15);
    ctx.stroke();

    // Propellers
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    const propOffset = 15;
    [[-1, -1], [1, -1], [1, 1], [-1, 1]].forEach(([dx, dy]) => {
      ctx.beginPath();
      ctx.arc(dx * propOffset, dy * propOffset, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    });
    
    // Direction Indicator
    ctx.fillStyle = '#fbbf24'; // Yellow
    ctx.beginPath();
    ctx.moveTo(0, -10);
    ctx.lineTo(-5, 0);
    ctx.lineTo(5, 0);
    ctx.fill();

    ctx.restore();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to parent size
    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };
    resize();
    window.addEventListener('resize', resize);

    // Animation Loop
    let animationFrameId: number;
    
    const render = () => {
      // Clear
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw Scene
      drawCity(ctx, canvas.width, canvas.height);
      
      // Draw Drone (using store values)
      // We need to access the LATEST store values. 
      // Since we are in useEffect with dependencies, we might need a ref or access via store API directly if using subscribe.
      // But for simplicity in this V1, we rely on React re-render or transient updates.
      // Zustand `useDroneStore` hook will trigger re-render on change.
      // However, for 60fps game loop, better to read from store directly or use refs.
      // Let's just use the props passed from the hook for now, assuming React updates fast enough for this simple demo.
      // Wait, if I put `x, y` in dependency array, this effect re-runs every frame? No.
      // Better: use `requestAnimationFrame` and read from a ref that syncs with store, OR just let React handle the render loop if using a game loop outside.
      // ACTUALLY: The prompt says "Use reasonable refresh mechanism... requestAnimationFrame".
      // So I should implement the loop here.
      
      // For now, I'll pass x,y as dependencies to `useEffect` to trigger redraw? 
      // No, that's inefficient. 
      // I will use `useDroneStore.getState()` inside the loop if possible, or just accept that this component re-renders.
      
      // Let's use `useRef` for the loop and read values from the store via subscription or `getState`.
      const state = useDroneStore.getState();
      drawDrone(ctx, state.x, state.y, state.rotation, state.height);
      
      animationFrameId = requestAnimationFrame(render);
    };
    
    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []); // Empty dependency, using getState() inside loop?

  // We need to make sure the loop gets fresh data. 
  // `useDroneStore.getState()` works if we import the store directly (not the hook).
  
  return (
    <div className="w-full h-full relative overflow-hidden bg-gray-200">
      <canvas ref={canvasRef} className="block" />
      {/* Overlay info */}
      <div className="absolute top-2 left-2 bg-black/50 text-white p-2 rounded text-xs">
        X: {Math.round(x)} Y: {Math.round(y)} H: {Math.round(height)}
      </div>
    </div>
  );
}
