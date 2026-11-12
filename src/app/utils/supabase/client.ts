import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info';

// Singleton instance
let supabaseInstance: ReturnType<typeof createSupabaseClient> | null = null;

export function createClient() {
  if (!supabaseInstance) {
    const supabaseUrl = `https://${projectId}.supabase.co`;
    supabaseInstance = createSupabaseClient(supabaseUrl, publicAnonKey);
  }
  return supabaseInstance;
}

// Database types for TypeScript
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          department: 'CSE' | 'ECE' | 'Mechanical' | 'Civil' | 'EEE' | null;
          year_level: '1st Year' | '2nd Year' | '3rd Year' | '4th Year' | null;
          role: 'student' | 'admin' | 'moderator';
          bio: string | null;
          leetcode_username: string | null;
          github_username: string | null;
          linkedin_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          department?: 'CSE' | 'ECE' | 'Mechanical' | 'Civil' | 'EEE' | null;
          year_level?: '1st Year' | '2nd Year' | '3rd Year' | '4th Year' | null;
          role?: 'student' | 'admin' | 'moderator';
          bio?: string | null;
          leetcode_username?: string | null;
          github_username?: string | null;
          linkedin_url?: string | null;
        };
        Update: {
          full_name?: string | null;
          avatar_url?: string | null;
          department?: 'CSE' | 'ECE' | 'Mechanical' | 'Civil' | 'EEE' | null;
          year_level?: '1st Year' | '2nd Year' | '3rd Year' | '4th Year' | null;
          bio?: string | null;
          leetcode_username?: string | null;
          github_username?: string | null;
          linkedin_url?: string | null;
        };
      };
      resources: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          resource_type: 'Notes' | 'Lab Manuals' | 'Assignments' | 'Mini Projects' | 'Previous Year Papers';
          department: 'CSE' | 'ECE' | 'Mechanical' | 'Civil' | 'EEE';
          year_level: '1st Year' | '2nd Year' | '3rd Year' | '4th Year';
          subject: string;
          file_url: string | null;
          file_size: number | null;
          download_count: number;
          uploaded_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          title: string;
          description?: string | null;
          resource_type: 'Notes' | 'Lab Manuals' | 'Assignments' | 'Mini Projects' | 'Previous Year Papers';
          department: 'CSE' | 'ECE' | 'Mechanical' | 'Civil' | 'EEE';
          year_level: '1st Year' | '2nd Year' | '3rd Year' | '4th Year';
          subject: string;
          file_url?: string | null;
          file_size?: number | null;
          uploaded_by: string;
        };
      };
      aptitude_test_sessions: {
        Row: {
          id: string;
          user_id: string;
          section: 'Quantitative Aptitude' | 'Logical Reasoning' | 'Verbal Ability' | 'Domain-Specific';
          mode: 'Practice' | 'Test';
          difficulty: 'Easy' | 'Medium' | 'Hard';
          total_questions: number;
          correct_answers: number;
          score: number;
          time_taken: number | null;
          started_at: string;
          completed_at: string | null;
        };
      };
      leetcode_stats: {
        Row: {
          id: string;
          user_id: string;
          username: string | null;
          total_solved: number;
          easy_solved: number;
          medium_solved: number;
          hard_solved: number;
          current_streak: number;
          max_streak: number;
          global_ranking: number | null;
          acceptance_rate: number | null;
          last_synced_at: string;
          created_at: string;
        };
      };
      interview_questions: {
        Row: {
          id: string;
          company: string;
          type: 'Coding' | 'HR' | 'Technical' | 'Experience';
          title: string;
          description: string;
          difficulty: 'Easy' | 'Medium' | 'Hard' | null;
          topics: string[];
          posted_by: string | null;
          upvotes: number;
          created_at: string;
          updated_at: string;
        };
      };
      projects: {
        Row: {
          id: string;
          title: string;
          description: string;
          status: 'Ongoing' | 'Looking for Members' | 'Completed';
          department: 'CSE' | 'ECE' | 'Mechanical' | 'Civil' | 'EEE' | null;
          tech_stack: string[];
          progress: number;
          team_size: number;
          looking_for: string[];
          github_url: string | null;
          demo_url: string | null;
          created_by: string | null;
          completed_at: string | null;
          created_at: string;
          updated_at: string;
        };
      };
      events: {
        Row: {
          id: string;
          title: string;
          description: string;
          type: string;
          date: string;
          time: string | null;
          venue: string | null;
          image_url: string | null;
          status: 'Registration Open' | 'Coming Soon' | 'Completed';
          max_attendees: number | null;
          current_attendees: number;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
      };
    };
  };
};
