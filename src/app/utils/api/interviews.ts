import { createClient } from '../supabase/client';

/**
 * Interview Questions API
 * Handles company-wise interview questions and experiences
 */

// Get interview questions with filters
export async function getInterviewQuestions(filters?: {
  company?: string;
  type?: string;
  difficulty?: string;
  search?: string;
}) {
  const supabase = createClient();
  
  let query = supabase
    .from('interview_questions')
    .select(`
      *,
      poster:profiles!posted_by(full_name, department, avatar_url),
      upvote_count:interview_question_upvotes(count)
    `)
    .order('created_at', { ascending: false });

  if (filters?.company && filters.company !== 'All') {
    query = query.eq('company', filters.company);
  }

  if (filters?.type && filters.type !== 'All') {
    query = query.eq('type', filters.type);
  }

  if (filters?.difficulty) {
    query = query.eq('difficulty', filters.difficulty);
  }

  if (filters?.search) {
    query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Get interview questions error:', error);
    throw error;
  }

  return data;
}

// Get single interview question
export async function getInterviewQuestion(id: string) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('interview_questions')
    .select(`
      *,
      poster:profiles!posted_by(full_name, department, avatar_url)
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Get interview question error:', error);
    throw error;
  }

  return data;
}

// Create interview question
export async function createInterviewQuestion(question: {
  company: string;
  type: 'Coding' | 'HR' | 'Technical' | 'Experience';
  title: string;
  description: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  topics?: string[];
}) {
  const supabase = createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('Not authenticated');
  }

  const { data, error } = await supabase
    .from('interview_questions')
    .insert({
      ...question,
      posted_by: user.id,
    })
    .select()
    .single();

  if (error) {
    console.error('Create interview question error:', error);
    throw error;
  }

  return data;
}

// Update interview question
export async function updateInterviewQuestion(id: string, updates: {
  title?: string;
  description?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  topics?: string[];
}) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('interview_questions')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Update interview question error:', error);
    throw error;
  }

  return data;
}

// Delete interview question
export async function deleteInterviewQuestion(id: string) {
  const supabase = createClient();
  
  const { error } = await supabase
    .from('interview_questions')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Delete interview question error:', error);
    throw error;
  }
}

// Upvote a question
export async function upvoteQuestion(questionId: string) {
  const supabase = createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('Not authenticated');
  }

  // Check if already upvoted
  const { data: existing } = await supabase
    .from('interview_question_upvotes')
    .select('*')
    .eq('user_id', user.id)
    .eq('question_id', questionId)
    .single();

  if (existing) {
    // Remove upvote
    const { error } = await supabase
      .from('interview_question_upvotes')
      .delete()
      .eq('user_id', user.id)
      .eq('question_id', questionId);

    if (error) {
      console.error('Remove upvote error:', error);
      throw error;
    }

    // Decrement upvotes count
    const { data: question } = await supabase
      .from('interview_questions')
      .select('upvotes')
      .eq('id', questionId)
      .single();

    if (question) {
      await supabase
        .from('interview_questions')
        .update({ upvotes: Math.max(0, question.upvotes - 1) })
        .eq('id', questionId);
    }

    return { upvoted: false };
  } else {
    // Add upvote
    const { error } = await supabase
      .from('interview_question_upvotes')
      .insert({
        user_id: user.id,
        question_id: questionId,
      });

    if (error) {
      console.error('Add upvote error:', error);
      throw error;
    }

    // Increment upvotes count
    const { data: question } = await supabase
      .from('interview_questions')
      .select('upvotes')
      .eq('id', questionId)
      .single();

    if (question) {
      await supabase
        .from('interview_questions')
        .update({ upvotes: question.upvotes + 1 })
        .eq('id', questionId);
    }

    return { upvoted: true };
  }
}

// Check if user has upvoted a question
export async function hasUpvoted(questionId: string) {
  const supabase = createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return false;
  }

  const { data } = await supabase
    .from('interview_question_upvotes')
    .select('*')
    .eq('user_id', user.id)
    .eq('question_id', questionId)
    .single();

  return !!data;
}

// Get questions by company
export async function getQuestionsByCompany(company: string, limit: number = 20) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('interview_questions')
    .select(`
      *,
      poster:profiles!posted_by(full_name)
    `)
    .eq('company', company)
    .order('upvotes', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Get questions by company error:', error);
    throw error;
  }

  return data;
}

// Get trending questions (most upvoted in last 30 days)
export async function getTrendingQuestions(limit: number = 10) {
  const supabase = createClient();
  
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const { data, error } = await supabase
    .from('interview_questions')
    .select(`
      *,
      poster:profiles!posted_by(full_name, department)
    `)
    .gte('created_at', thirtyDaysAgo.toISOString())
    .order('upvotes', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Get trending questions error:', error);
    throw error;
  }

  return data;
}
