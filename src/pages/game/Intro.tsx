import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button'; // Assuming shadcn or similar, or standard html button if not
import { Plane } from 'lucide-react';

export default function GameIntro() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-blue-600 rounded-full animate-pulse">
            <Plane size={64} className="text-white" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold tracking-tight text-blue-400">
          无人机操控模拟
        </h1>
        
        <div className="space-y-4 text-gray-300">
          <p className="text-xl">
            沉浸式城市无人机飞行体验
          </p>
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 text-left">
            <h3 className="text-lg font-semibold mb-3 text-yellow-400">操作说明：</h3>
            <ul className="space-y-2 list-disc list-inside">
              <li>左摇杆：控制 <span className="text-blue-300">高度</span> 与 <span className="text-blue-300">旋转</span></li>
              <li>右摇杆：控制 <span className="text-green-300">前进</span> 与 <span className="text-green-300">平移</span></li>
              <li>保持在城市范围内飞行</li>
            </ul>
          </div>
        </div>

        <div className="pt-8">
          <button
            onClick={() => navigate('/game/run')}
            className="w-full py-4 text-xl font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-900/50"
          >
            开始飞行
          </button>
        </div>
      </div>
    </div>
  );
}
