import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { LayoutDashboard, Users, ClipboardList, BookOpen, LogOut, Settings } from 'lucide-react';
import { useEffect } from 'react';

export default function AdminLayout() {
  const { user, loading, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/member/login?redirect=/admin/dashboard');
    }
  }, [user, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/member/login?redirect=/admin/dashboard');
  };

  if (loading) return <div className="flex justify-center items-center h-screen">加载中...</div>;

  const navItems = [
    { name: '控制台', path: '/admin/dashboard', icon: <LayoutDashboard className="w-5 h-5 mr-3" /> },
    { name: '预约管理', path: '/admin/bookings', icon: <ClipboardList className="w-5 h-5 mr-3" /> },
    { name: '会员管理', path: '/admin/users', icon: <Users className="w-5 h-5 mr-3" /> },
    { name: '课程管理', path: '/admin/courses', icon: <BookOpen className="w-5 h-5 mr-3" /> },
    { name: '系统设置', path: '/admin/settings', icon: <Settings className="w-5 h-5 mr-3" /> },
  ];

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 shadow-xl flex flex-col border-r border-gray-700">
        <div className="p-6 border-b border-gray-700 flex items-center">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold mr-3 shadow-lg shadow-indigo-500/30">
             A
          </div>
          <div>
            <h2 className="text-sm font-bold text-white truncate w-32">后台管理系统</h2>
            <p className="text-xs text-gray-400">业务员专用</p>
          </div>
        </div>
        
        <nav className="p-4 space-y-2 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                location.pathname === item.path
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50'
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-700 bg-gray-800/50">
          <div className="flex items-center px-4 py-3 mb-2">
             <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white text-xs mr-3">
               {user?.email?.charAt(0).toUpperCase() || 'A'}
             </div>
             <div className="overflow-hidden">
                <p className="text-sm text-white truncate w-32">{user?.email}</p>
                <p className="text-xs text-green-400 flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                  在线
                </p>
             </div>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center w-full px-4 py-2 text-red-400 hover:bg-red-900/20 hover:text-red-300 rounded-md transition-colors text-sm"
          >
            <LogOut className="w-4 h-4 mr-3" />
            退出登录
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-gray-50">
        <header className="bg-white shadow-sm border-b border-gray-200 px-8 py-4 flex justify-between items-center sticky top-0 z-10">
           <h2 className="text-xl font-semibold text-gray-800">
             {navItems.find(i => i.path === location.pathname)?.name || '后台管理'}
           </h2>
           <div className="flex items-center space-x-4">
              <Link to="/" className="text-sm text-gray-500 hover:text-indigo-600">
                返回官网首页
              </Link>
           </div>
        </header>
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
