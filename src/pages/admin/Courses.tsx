import { useState, useEffect } from 'react';
import { supabase, isMockMode } from '@/lib/supabase';
import { Search, Plus, Edit2, Book, Trash2, X, Save, Users } from 'lucide-react';

interface Course {
  id: string;
  name: string;
  level: string; // basic, intermediate, advanced
  description: string;
  duration: number; // hours
  status: string; // active, planning
  created_at?: string;
  student_count?: number; // Calculated field
}

export default function AdminCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState<Partial<Course>>({
    name: '',
    level: 'basic',
    duration: 10,
    description: '',
    status: 'active'
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      if (isMockMode) {
        // Mock Data
        setCourses([
          { id: '1', name: 'L1-无人机启蒙', level: 'basic', duration: 20, description: '基础入门', status: 'active', student_count: 12 },
          { id: '2', name: 'L2-初级飞行操控', level: 'basic', duration: 20, description: '飞行操控', status: 'active', student_count: 8 },
          { id: '3', name: 'L3-中级飞行与拍摄', level: 'intermediate', duration: 30, description: '航拍进阶', status: 'active', student_count: 5 },
          { id: '4', name: 'L4-高级编程应用', level: 'advanced', duration: 40, description: '编程控制', status: 'planning', student_count: 0 },
        ]);
      } else {
        // 1. Fetch Courses
        const { data: coursesData, error } = await supabase
          .from('courses')
          .select('*')
          .order('created_at', { ascending: true });

        if (error) throw error;

        // 2. Fetch Student Counts for each course
        // Note: This is N+1 query, but fine for small number of courses (usually < 50)
        // A better way would be using a view or a join if Supabase supports it easily in JS client
        const coursesWithCounts = await Promise.all(coursesData.map(async (course) => {
          const { count } = await supabase
            .from('member_courses')
            .select('*', { count: 'exact', head: true })
            .eq('course_name', course.name); // Matching by name as per current schema
          
          return { ...course, student_count: count || 0 };
        }));

        setCourses(coursesWithCounts);
      }
    } catch (err: any) {
      console.error('Error fetching courses:', err);
      // alert('加载失败: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (course?: Course) => {
    if (course) {
      setEditingCourse(course);
      setFormData({
        name: course.name,
        level: course.level,
        duration: course.duration,
        description: course.description,
        status: course.status || 'active'
      });
    } else {
      setEditingCourse(null);
      setFormData({
        name: '',
        level: 'basic',
        duration: 10,
        description: '',
        status: 'active'
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    try {
      if (isMockMode) {
        if (editingCourse) {
          setCourses(courses.map(c => c.id === editingCourse.id ? { ...c, ...formData } as Course : c));
        } else {
          setCourses([...courses, { id: Date.now().toString(), ...formData, student_count: 0 } as Course]);
        }
        alert('演示模式：保存成功');
      } else {
        if (editingCourse) {
          const { error } = await supabase
            .from('courses')
            .update(formData)
            .eq('id', editingCourse.id);
          if (error) throw error;
        } else {
          const { error } = await supabase
            .from('courses')
            .insert([formData]);
          if (error) throw error;
        }
        fetchCourses();
      }
      setIsModalOpen(false);
    } catch (err: any) {
      alert('操作失败: ' + err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除此课程吗？')) return;
    try {
      if (isMockMode) {
        setCourses(courses.filter(c => c.id !== id));
      } else {
        const { error } = await supabase.from('courses').delete().eq('id', id);
        if (error) throw error;
        fetchCourses();
      }
    } catch (err: any) {
      alert('删除失败: ' + err.message);
    }
  };

  const filteredCourses = courses.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="搜索课程..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-64"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          新增课程
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">课程名称</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">级别</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">标准课时</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">在读学员</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
               <tr><td colSpan={6} className="text-center py-8 text-gray-500">加载中...</td></tr>
            ) : filteredCourses.length === 0 ? (
               <tr><td colSpan={6} className="text-center py-8 text-gray-500">暂无课程</td></tr>
            ) : (
              filteredCourses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                        <Book className="w-5 h-5" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{course.name}</div>
                        <div className="text-xs text-gray-500 truncate max-w-[150px]">{course.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-700">
                      {course.level === 'basic' ? '初级' : course.level === 'intermediate' ? '中级' : '高级'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-700">{course.duration} 课时</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-1 text-gray-400" />
                      {course.student_count} 人
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      course.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {course.status === 'active' ? '招生中' : '筹备中'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => handleOpenModal(course)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3 inline-flex items-center"
                    >
                      <Edit2 className="w-4 h-4 mr-1" />
                      编辑
                    </button>
                    <button 
                      onClick={() => handleDelete(course.id)}
                      className="text-red-600 hover:text-red-900 inline-flex items-center"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      删除
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{editingCourse ? '编辑课程' : '新增课程'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">课程名称</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-md p-2"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  placeholder="例如：L1 无人机启蒙"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">级别</label>
                  <select 
                    className="w-full border border-gray-300 rounded-md p-2"
                    value={formData.level}
                    onChange={e => setFormData({...formData, level: e.target.value})}
                  >
                    <option value="basic">初级入门</option>
                    <option value="intermediate">中级进阶</option>
                    <option value="advanced">高级精通</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">标准课时</label>
                  <input 
                    type="number" 
                    className="w-full border border-gray-300 rounded-md p-2"
                    value={formData.duration}
                    onChange={e => setFormData({...formData, duration: parseInt(e.target.value)})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">状态</label>
                <select 
                  className="w-full border border-gray-300 rounded-md p-2"
                  value={formData.status}
                  onChange={e => setFormData({...formData, status: e.target.value})}
                >
                  <option value="active">招生中 (Active)</option>
                  <option value="planning">筹备中 (Planning)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">课程描述</label>
                <textarea 
                  className="w-full border border-gray-300 rounded-md p-2"
                  rows={3}
                  value={formData.description || ''}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  placeholder="简要描述课程内容..."
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
                onClick={handleSubmit}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                <Save className="w-4 h-4 mr-2" />
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
