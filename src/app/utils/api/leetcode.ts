import { createClient } from '../supabase/client';

/**
 * LeetCode Integration API
 * Handles LeetCode stats, submissions, and daily challenges
 */

// Get or create user's LeetCode stats
export async function getLeetCodeStats(userId?: string) {
  const supabase = createClient();
  
  let targetUserId = userId;
  
  if (!targetUserId) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('Not authenticated');
    }
    targetUserId = user.id;
  }

  const { data, error } = await supabase
    .from('leetcode_stats')
    .select('*')
    .eq('user_id', targetUserId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Get LeetCode stats error:', error);
    throw error;
  }

  // If no stats exist, create default
  if (!data) {
    const { data: newStats, error: createError } = await supabase
      .from('leetcode_stats')
      .insert({
        user_id: targetUserId,
        total_solved: 0,
        easy_solved: 0,
        medium_solved: 0,
        hard_solved: 0,
      })
      .select()
      .single();

    if (createError) {
      console.error('Create LeetCode stats error:', createError);
      throw createError;
    }

    return newStats;
  }

  return data;
}

// Update LeetCode stats (simulated sync)
export async function updateLeetCodeStats(stats: {
  username?: string;
  total_solved?: number;
  easy_solved?: number;
  medium_solved?: number;
  hard_solved?: number;
  current_streak?: number;
  max_streak?: number;
  global_ranking?: number;
  acceptance_rate?: number;
}) {
  const supabase = createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('Not authenticated');
  }

  const { data, error } = await supabase
    .from('leetcode_stats')
    .upsert({
      user_id: user.id,
      ...stats,
      last_synced_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error('Update LeetCode stats error:', error);
    throw error;
  }

  return data;
}

// Get user's LeetCode submissions
export async function getLeetCodeSubmissions(userId?: string, limit: number = 10) {
  const supabase = createClient();
  
  let targetUserId = userId;
  
  if (!targetUserId) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('Not authenticated');
    }
    targetUserId = user.id;
  }

  const { data, error } = await supabase
    .from('leetcode_submissions')
    .select('*')
    .eq('user_id', targetUserId)
    .order('submitted_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Get LeetCode submissions error:', error);
    throw error;
  }

  return data;
}

// Add LeetCode submission
export async function addLeetCodeSubmission(submission: {
  problem_title: string;
  problem_slug?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  status: string;
  runtime_ms?: number;
  memory_mb?: number;
  language?: string;
}) {
  const supabase = createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('Not authenticated');
  }

  const { data, error } = await supabase
    .from('leetcode_submissions')
    .insert({
      user_id: user.id,
      ...submission,
    })
    .select()
    .single();

  if (error) {
    console.error('Add LeetCode submission error:', error);
    throw error;
  }

  // If accepted, update stats
  if (submission.status === 'Accepted') {
    const stats = await getLeetCodeStats(user.id);
    await updateLeetCodeStats({
      total_solved: stats.total_solved + 1,
      easy_solved: submission.difficulty === 'Easy' ? stats.easy_solved + 1 : stats.easy_solved,
      medium_solved: submission.difficulty === 'Medium' ? stats.medium_solved + 1 : stats.medium_solved,
      hard_solved: submission.difficulty === 'Hard' ? stats.hard_solved + 1 : stats.hard_solved,
    });
  }

  return data;
}

// Get today's daily challenge
export async function getDailyChallenge() {
  const supabase = createClient();
  
  const today = new Date().toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('daily_challenges')
    .select('*')
    .eq('date', today)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Get daily challenge error:', error);
    throw error;
  }

  return data;
}

// Get progress data for charts
export async function getLeetCodeProgress(userId?: string, months: number = 6) {
  const supabase = createClient();
  
  let targetUserId = userId;
  
  if (!targetUserId) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('Not authenticated');
    }
    targetUserId = user.id;
  }

  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - months);

  const { data, error } = await supabase
    .from('leetcode_submissions')
    .select('submitted_at, status')
    .eq('user_id', targetUserId)
    .eq('status', 'Accepted')
    .gte('submitted_at', startDate.toISOString())
    .order('submitted_at');

  if (error) {
    console.error('Get LeetCode progress error:', error);
    throw error;
  }

  // Group by month
  const monthlyData = new Map();
  
  data.forEach((submission) => {
    const month = new Date(submission.submitted_at).toLocaleDateString('en-US', { month: 'short' });
    monthlyData.set(month, (monthlyData.get(month) || 0) + 1);
  });

  return Array.from(monthlyData.entries()).map(([month, solved]) => ({
    month,
    solved,
  }));
}

// Get global leaderboard based on total solved
export async function getLeetCodeLeaderboard(limit: number = 50) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('leetcode_stats')
    .select(`
      *,
      profiles!user_id(full_name, department, avatar_url)
    `)
    .order('total_solved', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Get LeetCode leaderboard error:', error);
    throw error;
  }

  return data.map((entry: any, index: number) => ({
    rank: index + 1,
    user_id: entry.user_id,
    full_name: entry.profiles?.full_name || 'Anonymous',
    department: entry.profiles?.department || 'N/A',
    avatar_url: entry.profiles?.avatar_url,
    total_solved: entry.total_solved,
    current_streak: entry.current_streak,
  }));
}
