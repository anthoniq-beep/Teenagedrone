import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase, isMockMode } from '@/lib/supabase';
import { Lock, User, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AdminLogin() {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { signIn } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const redirectPath = searchParams.get('redirect') || '/admin/dashboard';
      
      // For admin, we might use a different email pattern or just the same
      // Let's assume admins also use phone numbers for simplicity, or specific admin emails
      // If input is just a number, treat as phone. If it contains @, treat as full email.
      let email = account;
      if (!account.includes('@')) {
        email = `${account}@teenagedrone.com`;
      }

      if (isMockMode) {
        if ((account === 'admin' && password === 'admin') || (account === '13800138000' && password === '123456')) {
           await signIn(email);
           await new Promise(resolve => setTimeout(resolve, 500));
           navigate(redirectPath);
        } else {
           throw new Error('演示模式：管理员账号错误（试用: admin / admin）');
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        // In a real app, we should check user role here to ensure they are actually an admin
        navigate(redirectPath);
      }
    } catch (err: any) {
      setError(err.message || '登录失败，请检查账号和密码');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-10 rounded-xl shadow-2xl border border-gray-700">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <ShieldCheck className="h-8 w-8 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-white">
            员工登录
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            仅限内部工作人员访问
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="relative">
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                 <User className="h-5 w-5 text-gray-500" />
               </div>
               <input
                id="account"
                name="account"
                type="text"
                required
                className="appearance-none rounded-t-md relative block w-full px-3 py-3 pl-10 border border-gray-600 bg-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="工号 / 手机号"
                value={account}
                onChange={(e) => setAccount(e.target.value)}
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                 <Lock className="h-5 w-5 text-gray-500" />
               </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-b-md relative block w-full px-3 py-3 pl-10 border border-gray-600 bg-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-900/30 border border-red-800 text-red-300 text-sm rounded-md p-3 text-center">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors shadow-lg shadow-indigo-900/50"
            >
              {loading ? '验证中...' : '安全登录'}
            </button>
          </div>
          
          <div className="text-center mt-4">
             <a href="/" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
               返回官网首页
             </a>
          </div>
        </form>
      </div>
    </div>
  );
}
