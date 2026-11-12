import { createClient } from '../supabase/client';

/**
 * Aptitude Tests API
 * Handles aptitude questions, test sessions, and scores
 */

// Get random questions for a test
export async function getAptitudeQuestions(
  section: string,
  difficulty: string,
  count: number = 10
) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('aptitude_questions')
    .select('*')
    .eq('section', section)
    .eq('difficulty', difficulty)
    .limit(count);

  if (error) {
    console.error('Get aptitude questions error:', error);
    throw error;
  }

  // Randomize the questions
  return data.sort(() => Math.random() - 0.5);
}

// Get questions by topic
export async function getQuestionsByTopic(section: string, topic: string) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('aptitude_questions')
    .select('*')
    .eq('section', section)
    .eq('topic', topic)
    .order('difficulty');

  if (error) {
    console.error('Get questions by topic error:', error);
    throw error;
  }

  return data;
}

// Start a new test session
export async function startTestSession(
  section: string,
  mode: 'Practice' | 'Test',
  difficulty: string,
  totalQuestions: number
) {
  const supabase = createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('Not authenticated');
  }

  const { data, error } = await supabase
    .from('aptitude_test_sessions')
    .insert({
      user_id: user.id,
      section,
      mode,
      difficulty,
      total_questions: totalQuestions,
    })
    .select()
    .single();

  if (error) {
    console.error('Start test session error:', error);
    throw error;
  }

  return data;
}

// Submit answer for a question
export async function submitAnswer(
  sessionId: string,
  questionId: string,
  userAnswer: string,
  isCorrect: boolean
) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('aptitude_test_answers')
    .insert({
      session_id: sessionId,
      question_id: questionId,
      user_answer: userAnswer,
      is_correct: isCorrect,
    })
    .select()
    .single();

  if (error) {
    console.error('Submit answer error:', error);
    throw error;
  }

  return data;
}

// Complete test session
export async function completeTestSession(
  sessionId: string,
  correctAnswers: number,
  timeTaken: number
) {
  const supabase = createClient();
  
  // Get session details
  const { data: session } = await supabase
    .from('aptitude_test_sessions')
    .select('total_questions')
    .eq('id', sessionId)
    .single();

  if (!session) {
    throw new Error('Session not found');
  }

  const score = (correctAnswers / session.total_questions) * 100;

  const { data, error } = await supabase
    .from('aptitude_test_sessions')
    .update({
      correct_answers: correctAnswers,
      score,
      time_taken: timeTaken,
      completed_at: new Date().toISOString(),
    })
    .eq('id', sessionId)
    .select()
    .single();

  if (error) {
    console.error('Complete test session error:', error);
    throw error;
  }

  return data;
}

// Get user's test history
export async function getTestHistory(userId?: string, limit: number = 10) {
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
    .from('aptitude_test_sessions')
    .select('*')
    .eq('user_id', targetUserId)
    .not('completed_at', 'is', null)
    .order('completed_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Get test history error:', error);
    throw error;
  }

  return data;
}

// Get leaderboard
export async function getLeaderboard(section?: string, limit: number = 50) {
  const supabase = createClient();
  
  let query = supabase
    .from('aptitude_test_sessions')
    .select(`
      user_id,
      score,
      profiles!user_id(full_name, department, avatar_url)
    `)
    .not('completed_at', 'is', null);

  if (section) {
    query = query.eq('section', section);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Get leaderboard error:', error);
    throw error;
  }

  // Calculate average scores per user
  const userScores = new Map();
  
  data.forEach((session: any) => {
    if (!userScores.has(session.user_id)) {
      userScores.set(session.user_id, {
        user_id: session.user_id,
        profile: session.profiles,
        scores: [],
      });
    }
    userScores.get(session.user_id).scores.push(session.score);
  });

  // Calculate average and sort
  const leaderboard = Array.from(userScores.values())
    .map((user: any) => ({
      user_id: user.user_id,
      full_name: user.profile?.full_name || 'Anonymous',
      department: user.profile?.department || 'N/A',
      avatar_url: user.profile?.avatar_url,
      average_score: user.scores.reduce((a: number, b: number) => a + b, 0) / user.scores.length,
      tests_taken: user.scores.length,
    }))
    .sort((a, b) => b.average_score - a.average_score)
    .slice(0, limit);

  return leaderboard;
}

// Get user statistics
export async function getUserStats(userId?: string) {
  const supabase = createClient();
  
  let targetUserId = userId;
  
  if (!targetUserId) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('Not authenticated');
    }
    targetUserId = user.id;
  }

  const { data: sessions, error } = await supabase
    .from('aptitude_test_sessions')
    .select('*')
    .eq('user_id', targetUserId)
    .not('completed_at', 'is', null);

  if (error) {
    console.error('Get user stats error:', error);
    throw error;
  }

  if (!sessions || sessions.length === 0) {
    return {
      tests_taken: 0,
      average_score: 0,
      total_time_spent: 0,
      best_score: 0,
    };
  }

  const stats = {
    tests_taken: sessions.length,
    average_score: sessions.reduce((sum, s) => sum + s.score, 0) / sessions.length,
    total_time_spent: sessions.reduce((sum, s) => sum + (s.time_taken || 0), 0),
    best_score: Math.max(...sessions.map(s => s.score)),
  };

  return stats;
}
