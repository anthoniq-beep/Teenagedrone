import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase, isMockMode } from '@/lib/supabase';
import { ArrowLeft, BookOpen, Plus, Clock, Save, Trash2, CreditCard } from 'lucide-react';

interface MemberCourse {
  id: string;
  course_name: string;
  total_hours: number;
  remaining_hours: number;
  used_hours: number;
  card_id?: string;
}

interface Member {
  id: string;
  username: string;
  email: string;
  phone?: string;
}

export default function MemberCourseDetail() {
  const { id } = useParams<{ id: string }>(); // Member ID
  const navigate = useNavigate();
  const [member, setMember] = useState<Member | null>(null);
  const [courses, setCourses] = useState<MemberCourse[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({ course_name: '', total_hours: 10, card_id: '' });

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (isMockMode) {
        // Mock Member
        setMember({ id: id!, username: '张三 (演示)', email: 'zhangsan@example.com', phone: '13800138000' });
        // Mock Courses
        setCourses([
          { id: '1', course_name: 'L1 无人机启蒙', total_hours: 20, remaining_hours: 15, used_hours: 5, card_id: 'CARD001' },
          { id: '2', course_name: 'L2 进阶飞行', total_hours: 30, remaining_hours: 30, used_hours: 0, card_id: 'CARD002' },
        ]);
      } else {
        // 1. Fetch Member Info (Assuming from auth.users or public.users)
        // Note: Direct access to auth.users is restricted, we assume public.users sync or use admin API
        const { data: userData, error: userError } = await supabase
          .from('users') // Assuming we are using the public users table
          .select('*')
          .eq('id', id)
          .single();
        
        if (userError) throw userError;
        setMember(userData);

        // 2. Fetch Member Courses
        const { data: courseData, error: courseError } = await supabase
          .from('member_courses')
          .select('*')
          .eq('member_id', id);

        if (courseError) throw courseError;
        setCourses(courseData || []);
      }
    } catch (err: any) {
      console.error('Error:', err);
      // alert('加载失败: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCourse = async () => {
    try {
      if (isMockMode) {
        const mockNew = { 
          id: Date.now().toString(), 
          ...newCourse, 
          remaining_hours: newCourse.total_hours, 
          used_hours: 0 
        };
        setCourses([...courses, mockNew]);
        alert('演示模式：添加成功');
      } else {
        const { error } = await supabase.from('member_courses').insert({
          member_id: id,
          course_name: newCourse.course_name,
          total_hours: newCourse.total_hours,
          remaining_hours: newCourse.total_hours,
          used_hours: 0,
          card_id: newCourse.card_id
        });
        if (error) throw error;
        fetchData(); // Refresh
      }
      setIsModalOpen(false);
      setNewCourse({ course_name: '', total_hours: 10, card_id: '' });
    } catch (err: any) {
      alert('添加失败: ' + err.message);
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (!confirm('确定删除此课程吗？')) return;
    try {
      if (isMockMode) {
        setCourses(courses.filter(c => c.id !== courseId));
      } else {
        const { error } = await supabase.from('member_courses').delete().eq('id', courseId);
        if (error) throw error;
        setCourses(courses.filter(c => c.id !== courseId));
      }
    } catch (err: any) {
      alert('删除失败');
    }
  };

  const handleUpdateHours = async (course: MemberCourse, change: number) => {
    const newRemaining = course.remaining_hours + change;
    const newUsed = course.used_hours - change; // Simple logic: if adding hours, used doesn't change usually, but if "undoing" class, used decreases. 
    // Actually, usually we just want to "deduct" 1 hour for class taken.
    
    // Let's implement "Deduct 1 Hour" button
    if (newRemaining < 0) return alert('剩余课时不足');

    try {
      if (isMockMode) {
        setCourses(courses.map(c => c.id === course.id ? { ...c, remaining_hours: c.remaining_hours - 1, used_hours: c.used_hours + 1 } : c));
      } else {
        const { error } = await supabase.from('member_courses').update({
          remaining_hours: course.remaining_hours - 1,
          used_hours: course.used_hours + 1
        }).eq('id', course.id);
        if (error) throw error;
        fetchData();
      }
    } catch (err) {
      alert('操作失败');
    }
  };

  if (loading) return <div className="p-8 text-center">加载中...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <button 
          onClick={() => navigate('/admin/users')}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          返回会员列表
        </button>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          新增课程
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h1 className="text-xl font-bold text-gray-800 flex items-center">
          <User className="w-6 h-6 mr-3 text-indigo-500" />
          {member?.username} <span className="text-sm font-normal text-gray-500 ml-2">({member?.email})</span>
        </h1>
        <div className="mt-4 flex gap-4 text-sm text-gray-500">
           <p className="flex items-center"><Phone className="w-4 h-4 mr-1" /> {member?.phone || '无电话'}</p>
           <p className="flex items-center"><CreditCard className="w-4 h-4 mr-1" /> 读卡API状态: {isMockMode ? '模拟就绪' : '等待调用'}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map(course => (
          <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <button onClick={() => handleDeleteCourse(course.id)} className="text-gray-400 hover:text-red-500">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            
            <h3 className="font-bold text-lg text-gray-800 mb-4">{course.course_name}</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 p-3 rounded-lg text-center">
                <p className="text-xs text-blue-500 uppercase">剩余课时</p>
                <p className="text-2xl font-bold text-blue-700">{course.remaining_hours}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <p className="text-xs text-gray-500 uppercase">总课时</p>
                <p className="text-xl font-semibold text-gray-700">{course.total_hours}</p>
              </div>
            </div>

            <div className="space-y-2">
               <div className="flex justify-between text-sm text-gray-500">
                 <span>已消课时: {course.used_hours}</span>
                 <span>卡号: {course.card_id || '未绑定'}</span>
               </div>
               <button 
                 onClick={() => handleUpdateHours(course, -1)}
                 className="w-full py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 font-medium transition-colors flex justify-center items-center"
               >
                 <Clock className="w-4 h-4 mr-2" />
                 手动消课 (1课时)
               </button>
            </div>
          </div>
        ))}
        
        {courses.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-300">
            该会员暂无课程，请点击右上角添加。
          </div>
        )}
      </div>

      {/* Add Course Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">为会员添加课程</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">课程名称</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-md p-2"
                  value={newCourse.course_name}
                  onChange={e => setNewCourse({...newCourse, course_name: e.target.value})}
                  placeholder="例如：L1 无人机启蒙"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">总课时 (Hours)</label>
                <input 
                  type="number" 
                  className="w-full border border-gray-300 rounded-md p-2"
                  value={newCourse.total_hours}
                  onChange={e => setNewCourse({...newCourse, total_hours: parseInt(e.target.value)})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">绑定卡号 (可选)</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-md p-2"
                  value={newCourse.card_id}
                  onChange={e => setNewCourse({...newCourse, card_id: e.target.value})}
                  placeholder="用于读卡器识别"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                取消
              </button>
              <button 
                onClick={handleAddCourse}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                确认添加
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
