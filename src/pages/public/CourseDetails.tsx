import { useEffect, useState } from 'react';
import { BookOpen, Award, Users } from 'lucide-react';
import { supabase, isMockMode } from '@/lib/supabase';

interface Course {
  id: string;
  name: string;
  level: string;
  description: string;
  duration: number;
}

export default function CourseDetails() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      if (isMockMode) {
        setCourses([
          { id: '1', name: '无人机基础飞行与安全', level: 'basic', duration: 36, description: '面向零基础学员，学习无人机基本结构、飞行原理及安全法规。' },
          { id: '2', name: '编程控制与航拍技巧', level: 'intermediate', duration: 36, description: '结合图形化编程（Scratch/Python），实现无人机自动飞行。' },
          { id: '3', name: '无人机竞速与行业应用', level: 'advanced', duration: 48, description: '深入学习FPV竞速技巧及无人机在农业、测绘等行业的应用。' },
        ]);
      } else {
        const { data, error } = await supabase
          .from('courses')
          .select('*')
          .eq('status', 'active')
          .order('created_at', { ascending: true });
        
        if (error) throw error;
        setCourses(data || []);
      }
    } catch (err) {
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  };

  const getLevelLabel = (level: string) => {
    switch (level) {
      case 'basic': return '初级入门';
      case 'intermediate': return '中级进阶';
      case 'advanced': return '高级精通';
      default: return '通用课程';
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-blue-900 sm:text-5xl">课程详情</h1>
          <p className="mt-4 text-xl text-gray-600">工程技术大学航空运输学院和蜂之翼科技共同打造青少年全方位分级教学体系</p>
        </div>

        <div className="mb-16 bg-white rounded-xl shadow-md p-8">
           <div className="flex flex-col lg:flex-row gap-8 items-stretch">
             <div className="lg:w-1/2 relative min-h-[400px] lg:min-h-0">
                <img src="/Teenageplay1.png" alt="青少年无人机课程" className="absolute inset-0 w-full h-full object-cover rounded-xl shadow-lg" />
             </div>
             <div className="lg:w-1/2 space-y-6">
                <h2 className="text-2xl font-bold text-blue-900">课程体系介绍</h2>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h3 className="font-bold text-blue-800 mb-2">体系化教学</h3>
                  <p className="text-gray-700 text-sm">我们的课程涵盖了从零基础入门到高级竞技的全过程，确保学员能够循序渐进地掌握无人机技术。</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <h3 className="font-bold text-green-800 mb-2">实战导向</h3>
                  <p className="text-gray-700 text-sm">课程内容紧密结合实际飞行操作和编程应用，不仅仅是理论学习，更注重动手能力。</p>
                </div>
             </div>
           </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {loading ? (
            <div className="col-span-3 text-center py-12 text-gray-500">加载课程中...</div>
          ) : courses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6 bg-blue-600 text-white text-center">
                <h3 className="text-2xl font-bold">{getLevelLabel(course.level)}</h3>
              </div>
              <div className="p-8">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">{course.name}</h4>
                <p className="text-gray-600 mb-6 h-24 overflow-hidden">{course.description}</p>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center text-gray-700">
                    <BookOpen className="w-5 h-5 mr-3 text-blue-500" />
                    <span>时长：{course.duration} 课时</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Users className="w-5 h-5 mr-3 text-blue-500" />
                    <span>适合年龄：6-16 岁</span>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Award className="w-5 h-5 mr-2 text-orange-500" />
                    包含内容
                  </h5>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center"><span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>理论知识讲解</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>模拟飞行训练</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>实机操作飞行</li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
