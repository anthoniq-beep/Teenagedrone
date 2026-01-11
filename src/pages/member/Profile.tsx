import { useAuth } from '@/context/AuthContext';

export default function Profile() {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">个人信息</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-medium text-gray-900">基本资料</h2>
          <p className="text-sm text-gray-500 mt-1">更新您的个人详细信息和联系方式</p>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">用户名</label>
              <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" defaultValue={user?.email?.split('@')[0] || "student001"} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">邮箱</label>
              <input type="email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" defaultValue={user?.email || "student@example.com"} disabled />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">真实姓名</label>
              <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" defaultValue="张三" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">学校</label>
              <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" defaultValue="北京市第一中学" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">年级</label>
              <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                <option>七年级</option>
                <option>八年级</option>
                <option>九年级</option>
                <option>高一</option>
                <option>高二</option>
                <option>高三</option>
              </select>
            </div>
            <div>
               <label className="block text-sm font-medium text-gray-700">联系电话</label>
               <input type="tel" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" defaultValue="13800138000" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">个人简介</label>
            <textarea rows={4} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" defaultValue="热爱科学，喜欢动手制作，对无人机飞行充满兴趣。"></textarea>
          </div>
        </div>
        
        <div className="px-6 py-4 bg-gray-50 text-right">
          <button type="button" className="bg-blue-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            保存修改
          </button>
        </div>
      </div>
    </div>
  );
}
