import { ShieldCheck, BookOpen, Target, Cpu, Rocket, GraduationCap, School } from 'lucide-react';

export default function Introduction() {
  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-blue-900 sm:text-5xl">中国青少年无人机科学素养培训体系</h1>
          <p className="mt-4 text-xl text-gray-600">国家级权威认证 · 全链条培养路径</p>
        </div>

        {/* Introduction Section */}
        <div className="bg-blue-50 rounded-2xl p-8 mb-12 shadow-sm">
           <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center">
             <ShieldCheck className="w-8 h-8 mr-3 text-blue-600" />
             体系概述
           </h2>
           <p className="text-gray-700 leading-relaxed text-lg">
             中国航空学会作为国家唯一赋予航空科普工作职责的国家级学术单位，构建了以 <span className="font-bold text-blue-700">提升青少年科学素养、培养航空后备人才</span> 为核心的完整培训体系。该体系涵盖等级考试、专项计划、课程矩阵与赛事活动四大板块，形成了从启蒙到进阶的全链条培养路径，旨在为国家航空航天事业输送高素质的未来人才。
           </p>
        </div>

        {/* Enlightenment Interest Class Process */}
        <div className="mb-16">
           <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">启蒙兴趣班成长流程</h2>
           <div className="flex flex-col md:flex-row justify-center items-center gap-8 relative">
             {/* Step 1 */}
             <div className="flex flex-col items-center text-center max-w-xs z-10">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-4 shadow-sm">
                  <Rocket className="w-10 h-10 text-orange-500" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">理论启蒙</h3>
                <p className="text-sm text-gray-600">探索飞行奥秘，激发科学兴趣</p>
             </div>
             
             {/* Arrow */}
             <div className="hidden md:block text-gray-300">
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
             </div>

             {/* Step 2 */}
             <div className="flex flex-col items-center text-center max-w-xs z-10">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 shadow-sm">
                  <Target className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">实践游玩</h3>
                <p className="text-sm text-gray-600">动手组装操控，体验飞行乐趣</p>
             </div>

             {/* Arrow */}
             <div className="hidden md:block text-gray-300">
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
             </div>

             {/* Step 3 */}
             <div className="flex flex-col items-center text-center max-w-xs z-10">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4 shadow-sm">
                  <School className="w-10 h-10 text-blue-500" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">机构培训</h3>
                <p className="text-sm text-gray-600">系统化课程学习，夯实基础技能</p>
             </div>

             {/* Arrow */}
             <div className="hidden md:block text-gray-300">
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
             </div>

             {/* Step 4 */}
             <div className="flex flex-col items-center text-center max-w-xs z-10">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-4 shadow-sm">
                  <GraduationCap className="w-10 h-10 text-purple-500" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">高校研学</h3>
                <p className="text-sm text-gray-600">工程技术大学航空运输学院游学<br/>高校导师亲临授课</p>
             </div>
           </div>
        </div>

        {/* Core Certification System */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">全国青少年航空科学素质等级考试</h2>
          <p className="text-center text-gray-500 mb-10 text-lg">核心认证体系 · 四维考核架构</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">理论知识</h3>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• 航空原理</li>
                <li>• 飞行力学</li>
                <li>• 航空史</li>
                <li>• 无人机法规</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">实际操作</h3>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• 无人机操控</li>
                <li>• 航模制作与飞行</li>
                <li>• 模拟器驾驶</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Cpu className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">电脑编程</h3>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• 无人机编程</li>
                <li>• 飞行路径规划</li>
                <li>• 智能任务执行</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">科技创新</h3>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• 创意设计</li>
                <li>• 问题解决</li>
                <li>• 工程实践</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Value Section */}
        <div className="bg-gray-900 text-white rounded-3xl p-8 md:p-12">
           <h2 className="text-3xl font-bold mb-8 text-center">能力认证价值</h2>
           <div className="grid md:grid-cols-3 gap-8">
             <div className="text-center">
               <div className="text-4xl font-bold text-blue-400 mb-2">01</div>
               <h3 className="text-xl font-bold mb-3">权威背书</h3>
               <p className="text-gray-400">中国航空学会官方认证，纳入综合素质评价参考，极具含金量。</p>
             </div>
             <div className="text-center">
               <div className="text-4xl font-bold text-blue-400 mb-2">02</div>
               <h3 className="text-xl font-bold mb-3">升学助力</h3>
               <p className="text-gray-400">成为科技特长生招生重要参考依据，助力进入理想学府。</p>
             </div>
             <div className="text-center">
               <div className="text-4xl font-bold text-blue-400 mb-2">03</div>
               <h3 className="text-xl font-bold mb-3">职业衔接</h3>
               <p className="text-gray-400">打通航空航天领域求学与职业成长路径，布局未来高精尖行业。</p>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
}
