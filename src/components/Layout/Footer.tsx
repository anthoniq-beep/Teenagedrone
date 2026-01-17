export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p className="flex justify-center items-center gap-4">
            <span>&copy; {new Date().getFullYear()} 上海蜂之翼科技有限公司. All rights reserved.</span>
            <a href="/admin/login" className="text-xs text-gray-500 hover:text-white underline decoration-dotted underline-offset-4 transition-colors">员工通道</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
