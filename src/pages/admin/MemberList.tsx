import { useEffect, useState } from 'react';
import { supabase, isMockMode } from '@/lib/supabase';
import { Calendar, Phone, User, Clock, Shield, Trash2, Edit, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Member {
  id: string;
  username: string;
  email: string;
  role: 'student' | 'admin';
  created_at: string;
}

export default function MemberList() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      if (isMockMode) {
        // Mock data
        setMembers([
          { 
            id: '1', 
            username: 'student001', 
            email: 'student@example.com', 
            role: 'student', 
            created_at: new Date(Date.now() - 86400000 * 10).toISOString() 
          },
          { 
            id: '2', 
            username: 'admin001', 
            email: 'admin@example.com', 
            role: 'admin', 
            created_at: new Date(Date.now() - 86400000 * 30).toISOString() 
          },
        ]);
      } else {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setMembers(data || []);
      }
    } catch (err: any) {
      console.error('Error fetching members:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('确定要删除该用户吗？此操作不可恢复。')) return;

    try {
      if (isMockMode) {
        setMembers(members.filter(m => m.id !== id));
        alert('演示模式：删除成功');
      } else {
        const { error } = await supabase.from('users').delete().eq('id', id);
        if (error) throw error;
        setMembers(members.filter(m => m.id !== id));
      }
    } catch (err: any) {
      alert('删除失败: ' + err.message);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">会员管理后台</h1>
        <div className="text-sm text-gray-500">
          共 {members.length} 位会员
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          加载失败: {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-2 text-gray-500">加载中...</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    用户
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    角色
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    注册时间
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {members.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                      暂无会员记录
                    </td>
                  </tr>
                ) : (
                  members.map((member) => (
                    <tr key={member.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">
                            {member.username?.charAt(0).toUpperCase() || 'U'}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{member.username}</div>
                            <div className="text-sm text-gray-500">{member.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          member.role === 'admin' 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {member.role === 'admin' ? '管理员' : '学员'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(member.created_at).toLocaleDateString('zh-CN')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          onClick={() => navigate(`/admin/users/${member.id}/courses`)}
                          className="text-indigo-600 hover:text-indigo-900 mr-4 flex items-center inline-flex"
                        >
                          <BookOpen className="w-4 h-4 mr-1" />
                          课程
                        </button>
                        <button 
                          onClick={() => handleDelete(member.id)}
                          className="text-red-600 hover:text-red-900 inline-flex items-center"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
