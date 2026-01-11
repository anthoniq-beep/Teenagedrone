export default function Progress() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">培训进度跟踪</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
           <h3 className="text-lg font-bold text-gray-800 mb-4">技能雷达图</h3>
           <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg text-gray-400">
             {/* Placeholder for Radar Chart */}
             [ 技能雷达图组件占位 ]
             <br/>
             飞行操控 / 编程 / 组装 / 维修 / 理论
           </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
           <h3 className="text-lg font-bold text-gray-800 mb-4">阶段目标完成度</h3>
           <div className="space-y-6">
             <div>
               <div className="flex justify-between mb-1">
                 <span className="text-sm font-medium text-gray-700">基础飞行技能认证</span>
                 <span className="text-sm font-medium text-blue-600">100%</span>
               </div>
               <div className="w-full bg-gray-200 rounded-full h-2.5">
                 <div className="bg-blue-600 h-2.5 rounded-full" style={{width: '100%'}}></div>
               </div>
             </div>
             <div>
               <div className="flex justify-between mb-1">
                 <span className="text-sm font-medium text-gray-700">Python编程控制模块</span>
                 <span className="text-sm font-medium text-blue-600">45%</span>
               </div>
               <div className="w-full bg-gray-200 rounded-full h-2.5">
                 <div className="bg-blue-600 h-2.5 rounded-full" style={{width: '45%'}}></div>
               </div>
             </div>
             <div>
               <div className="flex justify-between mb-1">
                 <span className="text-sm font-medium text-gray-700">无人机组装实训</span>
                 <span className="text-sm font-medium text-blue-600">20%</span>
               </div>
               <div className="w-full bg-gray-200 rounded-full h-2.5">
                 <div className="bg-blue-600 h-2.5 rounded-full" style={{width: '20%'}}></div>
               </div>
             </div>
           </div>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4">学习历程时间轴</h3>
        <div className="relative border-l-2 border-blue-200 ml-3 space-y-8 pl-8 py-2">
           <div className="relative">
             <div className="absolute -left-11 top-1 w-6 h-6 bg-blue-600 rounded-full border-4 border-white shadow-sm"></div>
             <p className="text-sm text-gray-500 mb-1">2025-12-01</p>
             <h4 className="text-lg font-bold text-gray-900">获得"初级飞手"认证</h4>
             <p className="text-gray-600 mt-1">成功通过基础飞行理论与实操考试。</p>
           </div>
           <div className="relative">
             <div className="absolute -left-11 top-1 w-6 h-6 bg-blue-600 rounded-full border-4 border-white shadow-sm"></div>
             <p className="text-sm text-gray-500 mb-1">2025-10-15</p>
             <h4 className="text-lg font-bold text-gray-900">开始"无人机基础飞行与安全"课程</h4>
             <p className="text-gray-600 mt-1">正式开启无人机学习之旅。</p>
           </div>
        </div>
      </div>
    </div>
  );
}
