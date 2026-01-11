import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">欢迎回来，学员！</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">当前课程</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">2</p>
          <Link to="/member/courses" className="text-blue-600 text-sm mt-4 inline-block hover:underline">查看全部 &rarr;</Link>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">累计学时</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">48h</p>
          <span className="text-green-600 text-sm mt-4 inline-block">本周 +4h</span>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">获得奖项</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">3</p>
          <Link to="/member/awards" className="text-blue-600 text-sm mt-4 inline-block hover:underline">查看证书 &rarr;</Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">近期动态</h3>
        <ul className="space-y-4">
          <li className="flex items-start pb-4 border-b border-gray-50 last:border-0">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
            <div>
              <p className="text-gray-800 font-medium">完成了《无人机基础飞行》第三章作业</p>
              <p className="text-gray-500 text-sm mt-1">2小时前</p>
            </div>
          </li>
          <li className="flex items-start pb-4 border-b border-gray-50 last:border-0">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
            <div>
              <p className="text-gray-800 font-medium">报名了“2026春季无人机竞速赛”</p>
              <p className="text-gray-500 text-sm mt-1">昨天</p>
            </div>
          </li>
          <li className="flex items-start pb-4 border-b border-gray-50 last:border-0">
             <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3"></div>
            <div>
              <p className="text-gray-800 font-medium">获得“优秀学员”称号</p>
              <p className="text-gray-500 text-sm mt-1">3天前</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
