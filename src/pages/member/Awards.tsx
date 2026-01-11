import { Award, Download, Share2 } from 'lucide-react';

export default function Awards() {
  const awards = [
    {
      id: 1,
      title: '青少年无人机等级考试一级证书',
      date: '2025-12-01',
      issuer: '中国航空学会',
      image: 'https://placehold.co/400x300?text=Certificate+Level+1', // Placeholder
      type: 'certificate'
    },
    {
      id: 2,
      title: '2025春季竞速赛 优秀奖',
      date: '2025-05-20',
      issuer: '组委会',
      image: 'https://placehold.co/400x300?text=Competition+Award',
      type: 'award'
    },
    {
      id: 3,
      title: '优秀学员荣誉证书',
      date: '2025-01-10',
      issuer: '培训中心',
      image: 'https://placehold.co/400x300?text=Excellent+Student',
      type: 'honor'
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">获奖荣誉墙</h1>
        <button className="border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 text-sm flex items-center">
          <Award className="w-4 h-4 mr-2" />
          申请新证书
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {awards.map(award => (
          <div key={award.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group">
            <div className="aspect-w-4 aspect-h-3 bg-gray-200 relative overflow-hidden">
              <img src={award.image} alt={award.title} className="object-cover w-full h-48 group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button className="text-white bg-black bg-opacity-50 p-2 rounded-full mx-1 hover:bg-opacity-70">
                  <Download className="w-5 h-5" />
                </button>
                <button className="text-white bg-black bg-opacity-50 p-2 rounded-full mx-1 hover:bg-opacity-70">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                 <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                   {award.type === 'certificate' ? '等级证书' : award.type === 'award' ? '比赛奖项' : '荣誉称号'}
                 </span>
                 <span className="text-xs text-gray-500">{award.date}</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{award.title}</h3>
              <p className="text-sm text-gray-500">颁发机构：{award.issuer}</p>
            </div>
          </div>
        ))}
        
        {/* Empty State / Add New Placeholder */}
        <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-6 text-gray-400 hover:border-blue-400 hover:text-blue-500 transition-colors cursor-pointer min-h-[300px]">
           <Award className="w-12 h-12 mb-3" />
           <span className="font-medium">暂无更多证书</span>
        </div>
      </div>
    </div>
  );
}
