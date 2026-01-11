export default function Courses() {
  const courses = [
    { id: 1, name: '无人机基础飞行与安全', progress: 85, status: '进行中', nextLesson: '安全法规考试' },
    { id: 2, name: '编程控制入门 (Python)', progress: 30, status: '进行中', nextLesson: '循环结构控制' },
    { id: 3, name: '航拍运镜技巧', progress: 0, status: '未开始', nextLesson: '第一章：相机参数设置' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">课程管理</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm">
          选修新课
        </button>
      </div>

      <div className="grid gap-6">
        {courses.map(course => (
          <div key={course.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between">
             <div className="mb-4 md:mb-0">
               <div className="flex items-center mb-2">
                 <h3 className="text-lg font-bold text-gray-800 mr-3">{course.name}</h3>
                 <span className={`text-xs px-2 py-1 rounded-full ${course.status === '进行中' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                   {course.status}
                 </span>
               </div>
               <p className="text-sm text-gray-500">下一节：{course.nextLesson}</p>
             </div>
             
             <div className="flex items-center w-full md:w-1/3">
               <div className="flex-1 mr-4">
                 <div className="flex justify-between text-xs text-gray-500 mb-1">
                   <span>学习进度</span>
                   <span>{course.progress}%</span>
                 </div>
                 <div className="w-full bg-gray-200 rounded-full h-2">
                   <div className="bg-blue-600 h-2 rounded-full transition-all duration-500" style={{ width: `${course.progress}%` }}></div>
                 </div>
               </div>
               <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 text-sm font-medium">
                 继续学习
               </button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
