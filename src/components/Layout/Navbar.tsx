import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img src="/logo.png" alt="Logo" className="h-4 md:h-5 w-auto" />
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/courses/detail" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">课程详情</Link>
            <Link to="/training/system" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">培养体系</Link>
            <Link to="/competitions/categories" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">竞赛类目</Link>
            <Link to="/member/login" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
              会员登录
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
