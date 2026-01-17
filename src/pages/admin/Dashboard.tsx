import { Users, ClipboardList, TrendingUp, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const stats = [
    { name: '总预约数', value: '12', icon: <ClipboardList className="w-6 h-6 text-white" />, color: 'bg-blue-500', link: '/admin/bookings' },
    { name: '注册会员', value: '8', icon: <Users className="w-6 h-6 text-white" />, color: 'bg-indigo-500', link: '/admin/users' },
    { name: '本月新增', value: '+3', icon: <TrendingUp className="w-6 h-6 text-white" />, color: 'bg-green-500', link: '#' },
    { name: '待处理', value: '2', icon: <AlertCircle className="w-6 h-6 text-white" />, color: 'bg-orange-500', link: '/admin/bookings' },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Link 
            key={stat.name} 
            to={stat.link}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className={`flex-shrink-0 p-3 rounded-lg ${stat.color} shadow-lg shadow-blue-500/20`}>
              {stat.icon}
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">{stat.name}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">快捷操作</h3>
          <div className="grid grid-cols-2 gap-4">
             <Link to="/admin/bookings" className="p-4 bg-blue-50 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors text-center">
                <p className="font-semibold text-blue-700">查看最新预约</p>
                <p className="text-xs text-blue-500 mt-1">处理客户咨询</p>
             </Link>
             <Link to="/admin/users" className="p-4 bg-indigo-50 rounded-lg border border-indigo-100 hover:bg-indigo-100 transition-colors text-center">
                <p className="font-semibold text-indigo-700">管理会员课程</p>
                <p className="text-xs text-indigo-500 mt-1">更新上课进度</p>
             </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">系统公告</h3>
          <div className="space-y-4">
             <div className="flex items-start pb-4 border-b border-gray-100">
               <span className="inline-block w-2 h-2 mt-2 mr-2 bg-red-500 rounded-full"></span>
               <div>
                 <p className="text-sm font-medium text-gray-800">系统维护通知</p>
                 <p className="text-xs text-gray-500 mt-1">本周日凌晨 2:00 进行服务器例行维护。</p>
               </div>
             </div>
             <div className="flex items-start">
               <span className="inline-block w-2 h-2 mt-2 mr-2 bg-green-500 rounded-full"></span>
               <div>
                 <p className="text-sm font-medium text-gray-800">新课程上线</p>
                 <p className="text-xs text-gray-500 mt-1">L4 进阶编程课程已更新，请业务员熟悉内容。</p>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
