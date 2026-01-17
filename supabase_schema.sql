-- 1. 用户表 (Users) - 通常建议与 Supabase Auth 联动
-- 这里我们假设使用 public.users 表来存储额外信息
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- 如果与 Supabase Auth 联动，这里应该是 REFERENCES auth.users(id)
    username VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(20),
    role VARCHAR(20) DEFAULT 'student' CHECK (role IN ('student', 'admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 课程表 (Courses) - 用于前台展示和后台管理
CREATE TABLE IF NOT EXISTS courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    level VARCHAR(50) DEFAULT 'basic', -- basic, intermediate, advanced
    description TEXT,
    duration INTEGER DEFAULT 0, -- 标准课时数
    status VARCHAR(50) DEFAULT 'active', -- active (招生中), planning (筹备中)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. 会员课程表 (Member Courses) - 记录每个会员购买的课程和剩余课时
CREATE TABLE IF NOT EXISTS member_courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    member_id UUID REFERENCES users(id) ON DELETE CASCADE,
    course_name VARCHAR(255) NOT NULL, -- 冗余存储课程名，防止课程表删除后数据丢失，或者关联 courses(id)
    total_hours INTEGER DEFAULT 0,
    remaining_hours INTEGER DEFAULT 0,
    used_hours INTEGER DEFAULT 0,
    card_id VARCHAR(50), -- 实体会员卡ID，用于读卡器
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. 预约表 (Bookings) - 记录前台提交的试听预约
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    date DATE NOT NULL,
    course_type VARCHAR(50),
    status VARCHAR(20) DEFAULT 'pending', -- pending, confirmed, completed, cancelled
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 索引 (Indexes)
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_courses_status ON courses(status);
CREATE INDEX IF NOT EXISTS idx_member_courses_member_id ON member_courses(member_id);
CREATE INDEX IF NOT EXISTS idx_member_courses_card_id ON member_courses(card_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_phone ON bookings(phone);

-- 启用行级安全 (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE member_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- RLS 策略 (Policies)
-- 为了简化开发，这里允许 authenticated 用户（通常是管理员或登录后的会员）进行操作
-- 实际生产中应根据 role 字段细分权限

-- Users: 允许所有认证用户读取，允许用户自己修改，允许管理员修改所有
CREATE POLICY "Public read access" ON users FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin full access" ON users FOR ALL TO authenticated USING (true) WITH CHECK (true); -- 简化版：假设登录即有权

-- Courses: 允许公开读取 (anon)，允许认证用户增删改
CREATE POLICY "Public read access" ON courses FOR SELECT TO anon USING (true);
CREATE POLICY "Authenticated read access" ON courses FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin full access" ON courses FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Member Courses: 仅允许认证用户操作
CREATE POLICY "Admin full access" ON member_courses FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Bookings: 允许公开插入 (anon)，允许认证用户管理
CREATE POLICY "Public insert access" ON bookings FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Admin full access" ON bookings FOR ALL TO authenticated USING (true) WITH CHECK (true);
