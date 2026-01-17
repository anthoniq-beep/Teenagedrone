import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase, isMockMode } from '@/lib/supabase';
import { Lock, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Determine redirect path
      const redirectPath = searchParams.get('redirect') || '/member/dashboard';
      
      // Auto-append domain for email-based auth
      const email = `${phone}@teenagedrone.com`;

      if (isMockMode) {
        // Mock Login with simple validation
        if ((phone === '13800138000' && password === '123456') || (phone === 'admin' && password === 'admin')) {
           await signIn(email);
           await new Promise(resolve => setTimeout(resolve, 500));
           navigate(redirectPath);
        } else {
           throw new Error('演示模式：账号或密码错误（试用: 13800138000 / 123456）');
        }
      } else {
        // Real Supabase Login
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        navigate(redirectPath);
      }
    } catch (err: any) {
      setError(err.message || '登录失败，请检查用户名和密码');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            会员登录
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            欢迎回到中国青少年无人机科学素养培训平台
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="relative">
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                 <User className="h-5 w-5 text-gray-400" />
               </div>
               <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="邮箱地址"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                 <Lock className="h-5 w-5 text-gray-400" />
               </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? '登录中...' : '登 录'}
            </button>
          </div>
          
          <div className="text-center mt-4">
             {isMockMode && (
               <p className="text-sm text-gray-500">
                 测试账号: 13800138000 / 123456
               </p>
             )}
          </div>
        </form>
      </div>
    </div>
  );
}
