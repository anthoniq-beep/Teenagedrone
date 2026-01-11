import { BookOpen, Award, Users } from 'lucide-react';

export default function CourseDetails() {
  const courses = [
    {
      level: '初级入门',
      title: '无人机基础飞行与安全',
      description: '面向零基础学员，学习无人机基本结构、飞行原理及安全法规。通过模拟飞行与实机操作，掌握起飞、降落及基础航线飞行。',
      duration: '36 课时',
      age: '6-10 岁',
      features: ['模拟器训练', '基础组装', '安全法规']
    },
    {
      level: '中级进阶',
      title: '编程控制与航拍技巧',
      description: '结合图形化编程（Scratch/Python），实现无人机自动飞行。学习航拍运镜技巧，创作高质量航拍作品。',
      duration: '36 课时',
      age: '6-12 岁',
      features: ['图形化编程', '编队飞行', '航拍创作']
    },
    {
      level: '高级精通',
      title: '无人机竞速与行业应用',
      description: '深入学习FPV竞速技巧及无人机在农业、测绘等行业的应用。掌握高级组装调试与故障排除。',
      duration: '48 课时',
      age: '6-14 岁',
      features: ['FPV竞速', '高级调试', '行业应用案例']
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-blue-900 sm:text-5xl">课程详情</h1>
          <p className="mt-4 text-xl text-gray-600">工程技术大学航空运输学院和蜂之翼科技共同打造青少年全方位分级教学体系，科学培养路径</p>
        </div>

        <div className="mb-16 bg-white rounded-xl shadow-md p-8">
           <div className="flex flex-col lg:flex-row gap-8 items-stretch">
             <div className="lg:w-1/2 relative min-h-[400px] lg:min-h-0">
                <img src="/Teenageplay1.png" alt="青少年无人机课程" className="absolute inset-0 w-full h-full object-cover rounded-xl shadow-lg" />
             </div>
             <div className="lg:w-1/2 space-y-6">
                <h2 className="text-2xl font-bold text-blue-900">课程内容详解</h2>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h3 className="font-bold text-blue-800 mb-2">L1 课程内容</h3>
                  <p className="text-gray-700 text-sm">《人类对飞行的探索》、《历史上的第一架飞机》、《常见的飞行器》、《第一考前辅导课》</p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <h3 className="font-bold text-green-800 mb-2">L2 课程内容</h3>
                  <p className="text-gray-700 text-sm">《载人飞机的类型-军用&民用》、《初识无人机》、《飞行知识游戏》、《旋翼无人机概述》、《考前辅导课》</p>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                  <h3 className="font-bold text-purple-800 mb-2">L3 课程内容</h3>
                  <p className="text-gray-700 text-sm">《民用无人机的发展》、《消费与教育型无人机》、《法律法规》、《组装无人机》、《实操入门》、《考前辅导课》</p>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                  <h3 className="font-bold text-orange-800 mb-2">L4~L6 进阶课程</h3>
                  <p className="text-gray-700 text-sm">以无人机操控、无人机编程、无人机组装、电子电路认知等课题同小朋友共同探索低空世界。</p>
                </div>
             </div>
           </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {courses.map((course, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6 bg-blue-600 text-white text-center">
                <h3 className="text-2xl font-bold">{course.level}</h3>
              </div>
              <div className="p-8">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">{course.title}</h4>
                <p className="text-gray-600 mb-6 h-24">{course.description}</p>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center text-gray-700">
                    <BookOpen className="w-5 h-5 mr-3 text-blue-500" />
                    <span>时长：{course.duration}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Users className="w-5 h-5 mr-3 text-blue-500" />
                    <span>适合年龄：{course.age}</span>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Award className="w-5 h-5 mr-2 text-orange-500" />
                    课程特色
                  </h5>
                  <ul className="space-y-2">
                    {course.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-600">
                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-xl shadow-md p-8">
           <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">为什么选择无人机教育？</h2>
           <div className="grid md:grid-cols-2 gap-8">
              <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                      1
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">多学科融合 (STEAM)</h3>
                    <p className="mt-2 text-base text-gray-500">
                      融合物理空气动力学、电子电路、计算机编程、数学几何等多学科知识。
                    </p>
                  </div>
              </div>
              <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white">
                      2
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">实践创新能力</h3>
                    <p className="mt-2 text-base text-gray-500">
                      通过亲手组装调试，培养解决实际问题的能力和工程思维。
                    </p>
                  </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
