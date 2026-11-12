import { createClient } from '../supabase/client';

/**
 * Resources API
 * Handles academic resources (Notes, Assignments, Lab Manuals, PYQs)
 */

// Get all resources with optional filters
export async function getResources(filters?: {
  department?: string;
  year_level?: string;
  resource_type?: string;
  search?: string;
}) {
  const supabase = createClient();
  
  let query = supabase
    .from('resources')
    .select(`
      *,
      uploader:profiles!uploaded_by(full_name, department)
    `)
    .order('created_at', { ascending: false });

  if (filters?.department && filters.department !== 'All') {
    query = query.eq('department', filters.department);
  }

  if (filters?.year_level && filters.year_level !== 'All') {
    query = query.eq('year_level', filters.year_level);
  }

  if (filters?.resource_type) {
    query = query.eq('resource_type', filters.resource_type);
  }

  if (filters?.search) {
    query = query.or(`title.ilike.%${filters.search}%,subject.ilike.%${filters.search}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Get resources error:', error);
    throw error;
  }

  return data;
}

// Get single resource by ID
export async function getResource(id: string) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('resources')
    .select(`
      *,
      uploader:profiles!uploaded_by(full_name, department, avatar_url)
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Get resource error:', error);
    throw error;
  }

  return data;
}

// Create new resource
export async function createResource(resource: {
  title: string;
  description?: string;
  resource_type: string;
  department: string;
  year_level: string;
  subject: string;
  file_url?: string;
  file_size?: number;
}) {
  const supabase = createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('Not authenticated');
  }

  const { data, error } = await supabase
    .from('resources')
    .insert({
      ...resource,
      uploaded_by: user.id,
    })
    .select()
    .single();

  if (error) {
    console.error('Create resource error:', error);
    throw error;
  }

  return data;
}

// Update resource
export async function updateResource(id: string, updates: {
  title?: string;
  description?: string;
  subject?: string;
}) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('resources')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Update resource error:', error);
    throw error;
  }

  return data;
}

// Delete resource
export async function deleteResource(id: string) {
  const supabase = createClient();
  
  const { error } = await supabase
    .from('resources')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Delete resource error:', error);
    throw error;
  }
}

// Increment download count
export async function incrementDownloadCount(id: string) {
  const supabase = createClient();
  
  const { data: resource } = await supabase
    .from('resources')
    .select('download_count')
    .eq('id', id)
    .single();

  if (resource) {
    const { error } = await supabase
      .from('resources')
      .update({ download_count: resource.download_count + 1 })
      .eq('id', id);

    if (error) {
      console.error('Increment download count error:', error);
    }
  }
}

// Upload file to storage
export async function uploadResourceFile(file: File, path: string) {
  const supabase = createClient();
  
  const { data, error } = await supabase.storage
    .from('resources')
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    console.error('Upload file error:', error);
    throw error;
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('resources')
    .getPublicUrl(data.path);

  return { path: data.path, url: publicUrl };
}

// Delete file from storage
export async function deleteResourceFile(path: string) {
  const supabase = createClient();
  
  const { error } = await supabase.storage
    .from('resources')
    .remove([path]);

  if (error) {
    console.error('Delete file error:', error);
    throw error;
  }
}
