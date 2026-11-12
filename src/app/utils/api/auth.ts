import { createClient } from '../supabase/client';

/**
 * Authentication API
 * Handles user sign up, sign in, sign out, and OAuth
 */

// Sign up with email and password
export async function signUp(email: string, password: string, userData: {
  full_name: string;
  department?: string;
  year_level?: string;
}) {
  const supabase = createClient();
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: userData.full_name,
        department: userData.department,
        year_level: userData.year_level,
      },
    },
  });

  if (error) {
    console.error('Sign up error:', error);
    throw error;
  }

  return data;
}

// Sign in with email and password
export async function signIn(email: string, password: string) {
  const supabase = createClient();
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Sign in error:', error);
    throw error;
  }

  return data;
}

// Sign in with Google OAuth
export async function signInWithGoogle() {
  const supabase = createClient();
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/`,
    },
  });

  if (error) {
    console.error('Google sign in error:', error);
    throw error;
  }

  return data;
}

// Sign out
export async function signOut() {
  const supabase = createClient();
  
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Sign out error:', error);
    throw error;
  }
}

// Get current session
export async function getSession() {
  const supabase = createClient();
  
  const { data: { session }, error } = await supabase.auth.getSession();

  if (error) {
    console.error('Get session error:', error);
    throw error;
  }

  return session;
}

// Get current user
export async function getCurrentUser() {
  const supabase = createClient();
  
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error) {
    console.error('Get user error:', error);
    throw error;
  }

  return user;
}

// Listen to auth state changes
export function onAuthStateChange(callback: (event: string, session: any) => void) {
  const supabase = createClient();
  
  const { data: { subscription } } = supabase.auth.onAuthStateChange(callback);

  return subscription;
}

// Update user password
export async function updatePassword(newPassword: string) {
  const supabase = createClient();
  
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    console.error('Update password error:', error);
    throw error;
  }

  return data;
}

// Send password reset email
export async function resetPassword(email: string) {
  const supabase = createClient();
  
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });

  if (error) {
    console.error('Reset password error:', error);
    throw error;
  }

  return data;
}
