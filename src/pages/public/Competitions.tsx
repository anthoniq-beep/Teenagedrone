import { Trophy, Star, ShieldCheck, Zap } from 'lucide-react';

export default function Competitions() {
  const categories = [
    {
      name: '竞速类 (Racing)',
      desc: '考验反应速度与操控技巧，体验速度与激情。',
      items: ['FPV穿越赛', '视距内竞速赛'],
      color: 'bg-red-500'
    },
    {
      name: '任务类 (Task)',
      desc: '考验编程能力与任务规划，解决实际问题。',
      items: ['精准物流搬运', '自主巡航侦查', '空中搜救模拟'],
      color: 'bg-blue-500'
    },
    {
      name: '创意类 (Creative)',
      desc: '发挥想象力与艺术创造力，展现科技之美。',
      items: ['无人机编队表演', '空中格斗赛', '创意设计大赛'],
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-blue-900 sm:text-5xl">竞赛类目与认证</h1>
          <p className="mt-4 text-xl text-gray-600">以赛促学，权威认证</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {categories.map((cat, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className={`${cat.color} h-2`}></div>
              <div className="p-8">
                <div className="flex justify-center mb-4">
                  <Trophy className={`w-12 h-12 ${cat.color.replace('bg-', 'text-')}`} />
                </div>
                <h3 className="text-2xl font-bold text-center mb-2">{cat.name}</h3>
                <p className="text-gray-500 text-center mb-6">{cat.desc}</p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <ul className="space-y-2">
                    {cat.items.map((item, i) => (
                      <li key={i} className="flex items-center text-gray-700">
                        <Star className="w-4 h-4 mr-2 text-yellow-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-blue-900 rounded-2xl p-8 md:p-12 text-white">
           <div className="md:flex items-center justify-between mb-8">
             <div>
               <h2 className="text-3xl font-bold mb-2">学员特权与认证体系</h2>
               <p className="text-blue-200">完成课程并参与竞赛，您将获得以下专属权益</p>
             </div>
             <ShieldCheck className="w-16 h-16 text-yellow-400 hidden md:block" />
           </div>

           <div className="grid md:grid-cols-2 gap-8">
             <div className="flex items-start">
               <div className="bg-blue-800 p-3 rounded-lg mr-4">
                 <ShieldCheck className="w-6 h-6 text-yellow-400" />
               </div>
               <div>
                 <h4 className="text-xl font-bold mb-2">国家级证书认证</h4>
                 <p className="text-blue-100">通过考核可获得中国航空学会等权威机构颁发的青少年无人机等级证书，助力升学背景提升。</p>
               </div>
             </div>
             <div className="flex items-start">
               <div className="bg-blue-800 p-3 rounded-lg mr-4">
                 <Zap className="w-6 h-6 text-yellow-400" />
               </div>
               <div>
                 <h4 className="text-xl font-bold mb-2">精英战队选拔资格</h4>
                 <p className="text-blue-100">优秀学员优先入选校队/省队，代表参加全国乃至国际级高规格无人机赛事。</p>
               </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
