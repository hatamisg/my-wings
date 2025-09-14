'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import type { ProjectInsert, ProjectUpdate, ProjectStatus } from '@/types/database'

// Validation schemas
const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase with hyphens'),
  description: z.string().optional(),
  short_description: z.string().optional(),
  image_url: z.string().url().optional().or(z.literal('')),
  github_url: z.string().url().optional().or(z.literal('')),
  live_url: z.string().url().optional().or(z.literal('')),
  technologies: z.array(z.string()).default([]),
  category: z.string().optional(),
  featured: z.boolean().default(false),
  status: z.enum(['draft', 'published', 'archived']).default('published'),
  order_index: z.number().default(0),
})

// Get all projects (for admin)
export async function getAllProjects() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('order_index', { ascending: true })
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching projects:', error)
    throw new Error('Failed to fetch projects')
  }

  return data
}

// Get published projects (for public site)
export async function getPublishedProjects() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('status', 'published')
    .order('order_index', { ascending: true })
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching published projects:', error)
    return []
  }

  return data
}

// Get featured projects
export async function getFeaturedProjects() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('status', 'published')
    .eq('featured', true)
    .order('order_index', { ascending: true })
    .limit(6)

  if (error) {
    console.error('Error fetching featured projects:', error)
    return []
  }

  return data
}

// Get project by slug
export async function getProjectBySlug(slug: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching project:', error)
    return null
  }

  return data
}

// Get project by ID (for admin)
export async function getProjectById(id: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching project:', error)
    return null
  }

  return data
}

// Create new project
export async function createProject(formData: FormData) {
  const supabase = await createAdminClient()

  // Extract and validate form data
  const rawData = {
    title: formData.get('title') as string,
    slug: formData.get('slug') as string,
    description: formData.get('description') as string,
    short_description: formData.get('short_description') as string,
    image_url: formData.get('image_url') as string,
    github_url: formData.get('github_url') as string,
    live_url: formData.get('live_url') as string,
    technologies: formData.getAll('technologies') as string[],
    category: formData.get('category') as string,
    featured: formData.get('featured') === 'on',
    status: (formData.get('status') as ProjectStatus) || 'published',
    order_index: parseInt(formData.get('order_index') as string) || 0,
  }

  const validatedData = projectSchema.parse(rawData)

  const { data, error } = await supabase
    .from('projects')
    .insert([validatedData])
    .select()
    .single()

  if (error) {
    console.error('Error creating project:', error)
    throw new Error('Failed to create project: ' + error.message)
  }

  revalidatePath('/admin/projects')
  revalidatePath('/')
  redirect('/admin/projects')
}

// Update project
export async function updateProject(id: string, formData: FormData) {
  const supabase = await createAdminClient()

  // Extract and validate form data
  const rawData = {
    title: formData.get('title') as string,
    slug: formData.get('slug') as string,
    description: formData.get('description') as string,
    short_description: formData.get('short_description') as string,
    image_url: formData.get('image_url') as string,
    github_url: formData.get('github_url') as string,
    live_url: formData.get('live_url') as string,
    technologies: formData.getAll('technologies') as string[],
    category: formData.get('category') as string,
    featured: formData.get('featured') === 'on',
    status: (formData.get('status') as ProjectStatus) || 'published',
    order_index: parseInt(formData.get('order_index') as string) || 0,
  }

  const validatedData = projectSchema.parse(rawData)

  const { data, error } = await supabase
    .from('projects')
    .update(validatedData)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating project:', error)
    throw new Error('Failed to update project: ' + error.message)
  }

  revalidatePath('/admin/projects')
  revalidatePath('/')
  redirect('/admin/projects')
}

// Delete project
export async function deleteProject(id: string) {
  const supabase = await createAdminClient()

  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting project:', error)
    throw new Error('Failed to delete project')
  }

  revalidatePath('/admin/projects')
  revalidatePath('/')
}

// Update project order
export async function updateProjectsOrder(updates: { id: string; order_index: number }[]) {
  const supabase = await createAdminClient()

  const promises = updates.map(({ id, order_index }) =>
    supabase
      .from('projects')
      .update({ order_index })
      .eq('id', id)
  )

  await Promise.all(promises)

  revalidatePath('/admin/projects')
  revalidatePath('/')
}

// Generate slug from title
export async function generateSlug(title: string): Promise<string> {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}