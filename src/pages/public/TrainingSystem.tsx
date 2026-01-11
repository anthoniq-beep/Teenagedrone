import { GitMerge, Target, Trophy, ChevronRight } from 'lucide-react';

export default function TrainingSystem() {
  const steps = [
    {
      title: '启蒙阶段',
      subtitle: '兴趣激发',
      description: '完成L1~L3的初级考证，建立对无人机的初步认知和兴趣。',
      icon: <Target className="w-8 h-8 text-white" />
    },
    {
      title: '基础阶段',
      subtitle: '技能掌握',
      description: '完全掌握无人机操控及基础编程入门，完成L4~L5的考证。',
      icon: <GitMerge className="w-8 h-8 text-white" />
    },
    {
      title: '进阶阶段',
      subtitle: '编程应用',
      description: '深入了解无人机编程及机器人编程的课程内容，掌握编程能力，完成L6的考证。',
      icon: <GitMerge className="w-8 h-8 text-white" />
    },
    {
      title: '精通阶段',
      subtitle: '竞赛实战',
      description: '参加全国五大白名单赛事，达到专业飞手水平。',
      icon: <Trophy className="w-8 h-8 text-white" />
    }
  ];

  return (
    <div className="bg-white min-h-screen py-12">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-blue-900 sm:text-5xl">科学素养培养体系</h1>
          <p className="mt-4 text-xl text-gray-600">循序渐进的成长阶梯</p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center shadow-lg mb-6 group-hover:bg-orange-500 transition-colors duration-300">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-3">
                  {step.subtitle}
                </span>
                <p className="text-gray-500 text-sm px-4">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24">
           <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-12">
             <div className="lg:w-2/3">
               <img src="/testpng.png" alt="核心能力图示" className="w-full rounded-xl shadow-lg" />
             </div>
             <div className="lg:w-1/3 bg-blue-50 p-6 rounded-xl border border-blue-100 shadow-sm">
               <h3 className="text-lg font-bold text-blue-900 mb-3">考核任务示例</h3>
               <p className="text-gray-700 leading-relaxed text-sm">
                 在 <span className="font-semibold text-blue-700">30 分钟</span>内使用图形化编程软件编辑两架无人机的起飞、分别完成科目 1~科目 6 返回起点降落程序。
                 <br/><br/>
                 整段执行程序时间需要控制在 <span className="font-semibold text-blue-700">3 分钟</span>内，在完成起飞动作后须在空中停留 <span className="font-semibold text-blue-700">2 秒</span>后方可执行后续动作，两架无人机需都完成降落任务。
               </p>
             </div>
           </div>

           <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">核心能力培养矩阵</h2>
           <div className="bg-gray-50 rounded-2xl p-8 shadow-inner">
             <div className="grid md:grid-cols-2 gap-12">
                <div>
                   <h3 className="text-xl font-bold mb-4 flex items-center">
                     <span className="w-2 h-8 bg-blue-600 mr-3"></span>
                     硬实力 (Hard Skills)
                   </h3>
                   <ul className="space-y-4">
                     <li className="flex justify-between items-center bg-white p-4 rounded shadow-sm">
                       <span>机械结构认知</span>
                       <div className="w-1/2 bg-gray-200 rounded-full h-2">
                         <div className="bg-blue-600 h-2 rounded-full" style={{width: '90%'}}></div>
                       </div>
                     </li>
                     <li className="flex justify-between items-center bg-white p-4 rounded shadow-sm">
                       <span>电子电路基础</span>
                       <div className="w-1/2 bg-gray-200 rounded-full h-2">
                         <div className="bg-blue-600 h-2 rounded-full" style={{width: '80%'}}></div>
                       </div>
                     </li>
                     <li className="flex justify-between items-center bg-white p-4 rounded shadow-sm">
                       <span>编程逻辑思维</span>
                       <div className="w-1/2 bg-gray-200 rounded-full h-2">
                         <div className="bg-blue-600 h-2 rounded-full" style={{width: '85%'}}></div>
                       </div>
                     </li>
                     <li className="flex justify-between items-center bg-white p-4 rounded shadow-sm">
                       <span>工程设计能力</span>
                       <div className="w-1/2 bg-gray-200 rounded-full h-2">
                         <div className="bg-blue-600 h-2 rounded-full" style={{width: '75%'}}></div>
                       </div>
                     </li>
                     <li className="flex justify-between items-center bg-white p-4 rounded shadow-sm">
                       <span>故障排查与维修</span>
                       <div className="w-1/2 bg-gray-200 rounded-full h-2">
                         <div className="bg-blue-600 h-2 rounded-full" style={{width: '70%'}}></div>
                       </div>
                     </li>
                   </ul>
                </div>
                <div>
                   <h3 className="text-xl font-bold mb-4 flex items-center">
                     <span className="w-2 h-8 bg-orange-500 mr-3"></span>
                     软实力 (Soft Skills)
                   </h3>
                   <ul className="space-y-4">
                     <li className="flex justify-between items-center bg-white p-4 rounded shadow-sm">
                       <span>团队协作能力</span>
                       <div className="w-1/2 bg-gray-200 rounded-full h-2">
                         <div className="bg-orange-500 h-2 rounded-full" style={{width: '95%'}}></div>
                       </div>
                     </li>
                     <li className="flex justify-between items-center bg-white p-4 rounded shadow-sm">
                       <span>抗压与心理素质</span>
                       <div className="w-1/2 bg-gray-200 rounded-full h-2">
                         <div className="bg-orange-500 h-2 rounded-full" style={{width: '85%'}}></div>
                       </div>
                     </li>
                     <li className="flex justify-between items-center bg-white p-4 rounded shadow-sm">
                       <span>专注力与观察力</span>
                       <div className="w-1/2 bg-gray-200 rounded-full h-2">
                         <div className="bg-orange-500 h-2 rounded-full" style={{width: '90%'}}></div>
                       </div>
                     </li>
                     <li className="flex justify-between items-center bg-white p-4 rounded shadow-sm">
                       <span>创新思维与表达</span>
                       <div className="w-1/2 bg-gray-200 rounded-full h-2">
                         <div className="bg-orange-500 h-2 rounded-full" style={{width: '88%'}}></div>
                       </div>
                     </li>
                     <li className="flex justify-between items-center bg-white p-4 rounded shadow-sm">
                       <span>项目管理意识</span>
                       <div className="w-1/2 bg-gray-200 rounded-full h-2">
                         <div className="bg-orange-500 h-2 rounded-full" style={{width: '80%'}}></div>
                       </div>
                     </li>
                   </ul>
                </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
