import { createClient } from '../supabase/client';

/**
 * Profiles API
 * Handles user profile CRUD operations
 */

// Get user profile by ID
export async function getProfile(userId: string) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Get profile error:', error);
    throw error;
  }

  return data;
}

// Get current user's profile
export async function getCurrentProfile() {
  const supabase = createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('Not authenticated');
  }

  return getProfile(user.id);
}

// Update user profile
export async function updateProfile(userId: string, updates: {
  full_name?: string;
  avatar_url?: string;
  department?: string;
  year_level?: string;
  bio?: string;
  leetcode_username?: string;
  github_username?: string;
  linkedin_url?: string;
}) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    console.error('Update profile error:', error);
    throw error;
  }

  return data;
}

// Get profiles by department
export async function getProfilesByDepartment(department: string) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('department', department)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Get profiles by department error:', error);
    throw error;
  }

  return data;
}

// Get profiles by year
export async function getProfilesByYear(year: string) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('year_level', year)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Get profiles by year error:', error);
    throw error;
  }

  return data;
}

// Search profiles by name
export async function searchProfiles(searchTerm: string) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .ilike('full_name', `%${searchTerm}%`)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Search profiles error:', error);
    throw error;
  }

  return data;
}
