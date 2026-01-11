import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: '/BG1.png',
      title1: '中国青少年',
      title2: '无人机科学',
      title3: '素养培训',
      description: '培养动手能力、空间思维与编程逻辑，开启未来的天空之门。',
      ctaText: '立即开始',
      ctaLink: '/introduction'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1769&q=80',
      title1: '专业师资团队',
      title2: '权威认证体系',
      title3: '助力成长',
      description: '拥有国家级教练员团队，提供从入门到精通的系统化教学方案。',
      ctaText: '了解课程',
      ctaLink: '/courses/detail'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?ixlib=rb-4.0.3&auto=format&fit=crop&w=1769&q=80',
      title1: '以赛促学',
      title2: '走向世界',
      title3: '展现风采',
      description: '定期举办各级赛事，选拔优秀学员参加国家级乃至国际级无人机大赛。',
      ctaText: '查看竞赛',
      ctaLink: '/competitions/categories'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section (Carousel) */}
      <div className="relative bg-blue-700 overflow-hidden h-[600px]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
              <img
                className="w-full h-full object-cover"
                src={slide.image}
                alt={slide.title2}
              />
              <div className="absolute inset-0 bg-blue-900/80 mix-blend-multiply" />
            </div>

            <div className="max-w-7xl mx-auto relative h-full flex items-center">
              <div className="relative z-10 px-4 sm:px-6 lg:px-8 w-full">
                <main className="mx-auto max-w-7xl">
                  <div className="sm:text-center lg:text-left">
                    <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                      <span className="block xl:inline">{slide.title1}</span>
                      <span className="block text-orange-400 xl:inline mt-2">{slide.title2}</span>
                      <span className="block text-orange-400 xl:inline mt-2">{slide.title3}</span>
                    </h1>
                    <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                      {slide.description}
                    </p>
                    <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                      <div className="rounded-md shadow">
                        <Link to={slide.ctaLink} className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                          {slide.ctaText}
                        </Link>
                      </div>
                    </div>
                  </div>
                </main>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                index === currentSlide ? 'bg-orange-400' : 'bg-white/50 hover:bg-white'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Booking Banner */}
      <div className="bg-blue-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              <span className="block">准备好开启飞行之旅了吗？</span>
              <span className="block text-blue-300">立即预约免费试听课程。</span>
            </h2>
            <p className="mt-4 text-lg leading-6 text-blue-100">
              专业教练指导，亲身体验无人机操控乐趣，名额有限，先到先得。
            </p>
          </div>
          <div className="flex-shrink-0">
            <Link
              to="/booking"
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-blue-900 bg-white hover:bg-blue-50 shadow-sm"
            >
              预约试听
            </Link>
          </div>
        </div>
      </div>

      {/* Visual Navigation Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <Link to="/courses/detail" className="group block">
            <div className="relative rounded-lg overflow-hidden shadow-lg h-64 bg-gray-200">
              <img src="/lesson.png" alt="课程详情" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-20 transition-opacity"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-white drop-shadow-md">课程详情</span>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-900">全面课程体系</h3>
              <p className="mt-1 text-sm text-gray-500">从入门到精通，探索无人机科技奥秘。</p>
            </div>
          </Link>

          {/* Card 2 */}
          <Link to="/training/system" className="group block">
            <div className="relative rounded-lg overflow-hidden shadow-lg h-64 bg-gray-200">
              <img src="/trainingSystem.png" alt="培养体系" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-orange-600 opacity-0 group-hover:opacity-20 transition-opacity"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-white drop-shadow-md">培养体系</span>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-900">科学素养成长路径</h3>
              <p className="mt-1 text-sm text-gray-500">系统化培养方案，助力青少年全面发展。</p>
            </div>
          </Link>

          {/* Card 3 */}
          <Link to="/competitions/categories" className="group block">
            <div className="relative rounded-lg overflow-hidden shadow-lg h-64 bg-gray-200">
              <img src="/match.png" alt="竞赛类目" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-purple-600 opacity-0 group-hover:opacity-20 transition-opacity"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-white drop-shadow-md">竞赛类目</span>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-900">权威竞赛认证</h3>
              <p className="mt-1 text-sm text-gray-500">参与国家级赛事，获得权威能力认证。</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
