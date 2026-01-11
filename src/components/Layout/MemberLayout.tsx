import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Home, BookOpen, User, Trophy, BarChart, LogOut, ClipboardList } from 'lucide-react';
import { useEffect } from 'react';

export default function MemberLayout() {
  const { user, loading, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/member/login');
    }
  }, [user, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/member/login');
  };

  if (loading) return <div className="flex justify-center items-center h-screen">加载中...</div>;

  const navItems = [
    { name: '首页', path: '/member/dashboard', icon: <Home className="w-5 h-5 mr-3" /> },
    { name: '课程管理', path: '/member/courses', icon: <BookOpen className="w-5 h-5 mr-3" /> },
    { name: '培训进度', path: '/member/progress', icon: <BarChart className="w-5 h-5 mr-3" /> },
    { name: '获奖墙', path: '/member/awards', icon: <Trophy className="w-5 h-5 mr-3" /> },
    { name: '个人信息', path: '/member/profile', icon: <User className="w-5 h-5 mr-3" /> },
    // Admin link (visible to all logged-in users for now)
    { name: '预约管理', path: '/member/bookings', icon: <ClipboardList className="w-5 h-5 mr-3" /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-6 border-b flex items-center">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
             {user?.email?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div>
            <h2 className="text-sm font-bold text-gray-800 truncate w-32">{user?.email?.split('@')[0] || '会员用户'}</h2>
            <p className="text-xs text-gray-500">学员中心</p>
          </div>
        </div>
        <nav className="p-4 space-y-2 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                location.pathname === item.path
                  ? 'bg-blue-50 text-blue-600 font-medium'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t">
          <button
            onClick={handleSignOut}
            className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-md transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            退出登录
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-8">
        <Outlet />
      </div>
    </div>
  );
}
