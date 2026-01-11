-- Create users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'student' CHECK (role IN ('student', 'admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for users
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- Create courses table
CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL,
    level VARCHAR(20) CHECK (level IN ('basic', 'intermediate', 'advanced')),
    description TEXT,
    advantages TEXT[],
    age_range VARCHAR(50),
    duration INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for courses
CREATE INDEX idx_courses_level ON courses(level);

-- Create enrollments table
CREATE TABLE enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    progress DECIMAL(5,2) DEFAULT 0.00,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused')),
    enrollment_date DATE DEFAULT CURRENT_DATE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, course_id)
);

-- Create indexes for enrollments
CREATE INDEX idx_enrollments_user_id ON enrollments(user_id);
CREATE INDEX idx_enrollments_course_id ON enrollments(course_id);
CREATE INDEX idx_enrollments_status ON enrollments(status);

-- Create competitions table
CREATE TABLE competitions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL,
    category VARCHAR(100),
    level VARCHAR(50),
    eligibility TEXT,
    competition_date DATE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for competitions
CREATE INDEX idx_competitions_category ON competitions(category);
CREATE INDEX idx_competitions_date ON competitions(competition_date);

-- Create awards table
CREATE TABLE awards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    competition_id UUID REFERENCES competitions(id) ON DELETE CASCADE,
    award_type VARCHAR(100),
    award_date DATE,
    certificate_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for awards
CREATE INDEX idx_awards_user_id ON awards(user_id);
CREATE INDEX idx_awards_competition_id ON awards(competition_id);
CREATE INDEX idx_awards_date ON awards(award_date);

-- Create progress_tracking table
CREATE TABLE progress_tracking (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    skills JSONB,
    achievements JSONB,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, course_id)
);

-- Create indexes for progress_tracking
CREATE INDEX idx_progress_user_id ON progress_tracking(user_id);
CREATE INDEX idx_progress_course_id ON progress_tracking(course_id);

-- Enable RLS
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE awards ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Grant permissions (Adjust based on your Supabase configuration, usually 'authenticated' and 'anon' roles exist)
-- Note: 'anon' role is for public access, 'authenticated' is for logged in users.

-- Public access to courses and competitions
GRANT SELECT ON courses TO anon, authenticated;
GRANT SELECT ON competitions TO anon, authenticated;

-- Authenticated access
GRANT ALL PRIVILEGES ON enrollments TO authenticated;
GRANT ALL PRIVILEGES ON awards TO authenticated;
GRANT ALL PRIVILEGES ON progress_tracking TO authenticated;
GRANT SELECT ON users TO authenticated;

-- RLS Policies
-- Users can only see their own data
CREATE POLICY "Users can view own enrollments" ON enrollments FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can view own awards" ON awards FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can view own progress" ON progress_tracking FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can view own profile" ON users FOR SELECT TO authenticated USING (auth.uid() = id);

-- Assuming auth.uid() matches the id in users table.
-- Note: In standard Supabase Auth, the auth.users table is separate from public.users.
-- If you are using Supabase Auth, you might want to link them or just use auth.users.
-- For this simplified schema, we assume we are syncing or using a custom auth approach, 
-- but realistically with Supabase Auth, we should use a trigger to create a public.user record on signup.
-- For now, we will stick to the provided schema but add a note that the user_id FK should ideally link to auth.users if possible, 
-- or we handle it manually. The schema provided uses a custom 'users' table in public schema.
