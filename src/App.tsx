import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import CourseDetails from "@/pages/public/CourseDetails";
import TrainingSystem from "@/pages/public/TrainingSystem";
import Competitions from "@/pages/public/Competitions";
import Introduction from "@/pages/introduction/Index";
import Booking from "@/pages/booking/Index";
import BookingList from "@/pages/admin/BookingList";
import BookingDetail from "@/pages/admin/BookingDetail";
import MemberList from "@/pages/admin/MemberList";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminCourses from "@/pages/admin/Courses";
import AdminLayout from "@/components/Layout/AdminLayout";
import Login from "@/pages/auth/Login";
import MemberLayout from "@/components/Layout/MemberLayout";
import Dashboard from "@/pages/member/Dashboard";
import Courses from "@/pages/member/Courses";
import Profile from "@/pages/member/Profile";
import Progress from "@/pages/member/Progress";
import Awards from "@/pages/member/Awards";
import GameIntro from "@/pages/game/Intro";
import GameRun from "@/pages/game/Game";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";

// Wrapper for public pages to include Navbar and Footer
const PublicLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow">{children}</main>
    <Footer />
  </div>
);

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/courses/detail" element={<PublicLayout><CourseDetails /></PublicLayout>} />
        <Route path="/training/system" element={<PublicLayout><TrainingSystem /></PublicLayout>} />
        <Route path="/competitions/categories" element={<PublicLayout><Competitions /></PublicLayout>} />
        <Route path="/introduction" element={<PublicLayout><Introduction /></PublicLayout>} />
        <Route path="/booking" element={<PublicLayout><Booking /></PublicLayout>} />
        
        {/* Auth Routes */}
        <Route path="/member/login" element={<PublicLayout><Login /></PublicLayout>} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Game Routes */}
        <Route path="/game" element={<GameIntro />} />
        <Route path="/game/run" element={<GameRun />} />
        
        {/* Member Routes - Protected */}
        <Route path="/member" element={<MemberLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="courses" element={<Courses />} />
          <Route path="profile" element={<Profile />} />
          <Route path="progress" element={<Progress />} />
          <Route path="awards" element={<Awards />} />
        </Route>

        {/* Admin Routes - Business/Staff Only */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="bookings" element={<BookingList />} />
          <Route path="bookings/:id" element={<BookingDetail />} />
          <Route path="users" element={<MemberList />} />
          <Route path="courses" element={<AdminCourses />} />
          {/* Placeholder for settings */}
          <Route path="settings" element={<div className="p-6">系统设置功能开发中...</div>} />
        </Route>
      </Routes>
    </Router>
  );
}
