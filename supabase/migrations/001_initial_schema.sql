-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE user_role AS ENUM ('student', 'admin', 'moderator');
CREATE TYPE department AS ENUM ('CSE', 'ECE', 'Mechanical', 'Civil', 'EEE');
CREATE TYPE year_level AS ENUM ('1st Year', '2nd Year', '3rd Year', '4th Year');
CREATE TYPE resource_type AS ENUM ('Notes', 'Lab Manuals', 'Assignments', 'Mini Projects', 'Previous Year Papers');
CREATE TYPE difficulty_level AS ENUM ('Easy', 'Medium', 'Hard');
CREATE TYPE test_mode AS ENUM ('Practice', 'Test');
CREATE TYPE aptitude_section AS ENUM ('Quantitative Aptitude', 'Logical Reasoning', 'Verbal Ability', 'Domain-Specific');
CREATE TYPE project_status AS ENUM ('Ongoing', 'Looking for Members', 'Completed');
CREATE TYPE event_status AS ENUM ('Registration Open', 'Coming Soon', 'Completed');

-- Profiles table (extends Supabase auth.users)
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    department department,
    year_level year_level,
    role user_role DEFAULT 'student',
    bio TEXT,
    leetcode_username TEXT,
    github_username TEXT,
    linkedin_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Resources table
CREATE TABLE resources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    resource_type resource_type NOT NULL,
    department department NOT NULL,
    year_level year_level NOT NULL,
    subject TEXT NOT NULL,
    file_url TEXT,
    file_size BIGINT,
    download_count INTEGER DEFAULT 0,
    uploaded_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Aptitude questions table
CREATE TABLE aptitude_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    section aptitude_section NOT NULL,
    topic TEXT NOT NULL,
    question TEXT NOT NULL,
    option_a TEXT NOT NULL,
    option_b TEXT NOT NULL,
    option_c TEXT NOT NULL,
    option_d TEXT NOT NULL,
    correct_answer TEXT NOT NULL CHECK (correct_answer IN ('A', 'B', 'C', 'D')),
    explanation TEXT,
    difficulty difficulty_level NOT NULL,
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Aptitude test sessions
CREATE TABLE aptitude_test_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    section aptitude_section NOT NULL,
    mode test_mode NOT NULL,
    difficulty difficulty_level NOT NULL,
    total_questions INTEGER NOT NULL,
    correct_answers INTEGER DEFAULT 0,
    score DECIMAL(5,2) DEFAULT 0,
    time_taken INTEGER, -- in seconds
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE
);

-- Aptitude test answers
CREATE TABLE aptitude_test_answers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES aptitude_test_sessions(id) ON DELETE CASCADE NOT NULL,
    question_id UUID REFERENCES aptitude_questions(id) ON DELETE CASCADE NOT NULL,
    user_answer TEXT CHECK (user_answer IN ('A', 'B', 'C', 'D')),
    is_correct BOOLEAN,
    answered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- LeetCode stats table
CREATE TABLE leetcode_stats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE NOT NULL,
    username TEXT,
    total_solved INTEGER DEFAULT 0,
    easy_solved INTEGER DEFAULT 0,
    medium_solved INTEGER DEFAULT 0,
    hard_solved INTEGER DEFAULT 0,
    current_streak INTEGER DEFAULT 0,
    max_streak INTEGER DEFAULT 0,
    global_ranking INTEGER,
    acceptance_rate DECIMAL(5,2),
    last_synced_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- LeetCode submissions
CREATE TABLE leetcode_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    problem_title TEXT NOT NULL,
    problem_slug TEXT,
    difficulty difficulty_level NOT NULL,
    status TEXT NOT NULL,
    runtime_ms INTEGER,
    memory_mb DECIMAL(10,2),
    language TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Daily coding challenges
CREATE TABLE daily_challenges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date DATE UNIQUE NOT NULL,
    problem_title TEXT NOT NULL,
    problem_slug TEXT,
    difficulty difficulty_level NOT NULL,
    description TEXT,
    topics TEXT[],
    acceptance_rate DECIMAL(5,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Interview questions table
CREATE TABLE interview_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('Coding', 'HR', 'Technical', 'Experience')),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    difficulty difficulty_level,
    topics TEXT[],
    posted_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    upvotes INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Interview question upvotes
CREATE TABLE interview_question_upvotes (
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    question_id UUID REFERENCES interview_questions(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (user_id, question_id)
);

-- Projects table
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    status project_status NOT NULL,
    department department,
    tech_stack TEXT[],
    progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    team_size INTEGER DEFAULT 1,
    looking_for TEXT[], -- roles needed
    github_url TEXT,
    demo_url TEXT,
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Project members
CREATE TABLE project_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    role TEXT,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(project_id, user_id)
);

-- Events table
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    type TEXT NOT NULL,
    date DATE NOT NULL,
    time TEXT,
    venue TEXT,
    image_url TEXT,
    status event_status NOT NULL,
    max_attendees INTEGER,
    current_attendees INTEGER DEFAULT 0,
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Event registrations
CREATE TABLE event_registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    registered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(event_id, user_id)
);

-- Create indexes for better query performance
CREATE INDEX idx_resources_department ON resources(department);
CREATE INDEX idx_resources_year ON resources(year_level);
CREATE INDEX idx_resources_type ON resources(resource_type);
CREATE INDEX idx_aptitude_questions_section ON aptitude_questions(section);
CREATE INDEX idx_aptitude_questions_difficulty ON aptitude_questions(difficulty);
CREATE INDEX idx_test_sessions_user ON aptitude_test_sessions(user_id);
CREATE INDEX idx_leetcode_stats_user ON leetcode_stats(user_id);
CREATE INDEX idx_interview_questions_company ON interview_questions(company);
CREATE INDEX idx_interview_questions_type ON interview_questions(type);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_events_status ON events(status);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE aptitude_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE aptitude_test_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE aptitude_test_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE leetcode_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE leetcode_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE interview_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE interview_question_upvotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for resources
CREATE POLICY "Resources are viewable by everyone" ON resources
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can upload resources" ON resources
    FOR INSERT WITH CHECK (auth.uid() = uploaded_by);

CREATE POLICY "Users can update own resources" ON resources
    FOR UPDATE USING (auth.uid() = uploaded_by);

CREATE POLICY "Users can delete own resources" ON resources
    FOR DELETE USING (auth.uid() = uploaded_by);

-- RLS Policies for aptitude_questions
CREATE POLICY "Questions are viewable by everyone" ON aptitude_questions
    FOR SELECT USING (true);

CREATE POLICY "Only admins can create questions" ON aptitude_questions
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role IN ('admin', 'moderator')
        )
    );

-- RLS Policies for aptitude_test_sessions
CREATE POLICY "Users can view own test sessions" ON aptitude_test_sessions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own test sessions" ON aptitude_test_sessions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own test sessions" ON aptitude_test_sessions
    FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for aptitude_test_answers
CREATE POLICY "Users can view own test answers" ON aptitude_test_answers
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM aptitude_test_sessions 
            WHERE id = session_id AND user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert own test answers" ON aptitude_test_answers
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM aptitude_test_sessions 
            WHERE id = session_id AND user_id = auth.uid()
        )
    );

-- RLS Policies for leetcode_stats
CREATE POLICY "LeetCode stats are viewable by everyone" ON leetcode_stats
    FOR SELECT USING (true);

CREATE POLICY "Users can update own LeetCode stats" ON leetcode_stats
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own stats" ON leetcode_stats
    FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for leetcode_submissions
CREATE POLICY "Users can view own submissions" ON leetcode_submissions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own submissions" ON leetcode_submissions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for daily_challenges
CREATE POLICY "Daily challenges are viewable by everyone" ON daily_challenges
    FOR SELECT USING (true);

-- RLS Policies for interview_questions
CREATE POLICY "Interview questions are viewable by everyone" ON interview_questions
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can post questions" ON interview_questions
    FOR INSERT WITH CHECK (auth.uid() = posted_by);

CREATE POLICY "Users can update own questions" ON interview_questions
    FOR UPDATE USING (auth.uid() = posted_by);

CREATE POLICY "Users can delete own questions" ON interview_questions
    FOR DELETE USING (auth.uid() = posted_by);

-- RLS Policies for interview_question_upvotes
CREATE POLICY "Upvotes are viewable by everyone" ON interview_question_upvotes
    FOR SELECT USING (true);

CREATE POLICY "Users can upvote questions" ON interview_question_upvotes
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove their upvotes" ON interview_question_upvotes
    FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for projects
CREATE POLICY "Projects are viewable by everyone" ON projects
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create projects" ON projects
    FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Project creators can update their projects" ON projects
    FOR UPDATE USING (auth.uid() = created_by);

CREATE POLICY "Project creators can delete their projects" ON projects
    FOR DELETE USING (auth.uid() = created_by);

-- RLS Policies for project_members
CREATE POLICY "Project members are viewable by everyone" ON project_members
    FOR SELECT USING (true);

CREATE POLICY "Users can join projects" ON project_members
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can leave projects" ON project_members
    FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for events
CREATE POLICY "Events are viewable by everyone" ON events
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create events" ON events
    FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Event creators can update their events" ON events
    FOR UPDATE USING (auth.uid() = created_by);

-- RLS Policies for event_registrations
CREATE POLICY "Registrations are viewable by everyone" ON event_registrations
    FOR SELECT USING (true);

CREATE POLICY "Users can register for events" ON event_registrations
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can cancel their registrations" ON event_registrations
    FOR DELETE USING (auth.uid() = user_id);

-- Function to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, avatar_url)
    VALUES (
        NEW.id,
        NEW.email,
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'avatar_url'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add update triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_resources_updated_at BEFORE UPDATE ON resources
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_interview_questions_updated_at BEFORE UPDATE ON interview_questions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
