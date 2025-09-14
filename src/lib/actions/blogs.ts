'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import type { BlogInsert, BlogUpdate, BlogStatus } from '@/types/database'

// Validation schemas
const blogSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase with hyphens'),
  excerpt: z.string().optional(),
  content: z.string().min(1, 'Content is required'),
  featured_image: z.string().url().optional().or(z.literal('')),
  author: z.string().default('Hatami Sugandi'),
  tags: z.array(z.string()).default([]),
  category: z.string().optional(),
  featured: z.boolean().default(false),
  status: z.enum(['draft', 'published', 'archived']).default('published'),
  reading_time: z.number().optional(),
  published_at: z.string().optional(),
})

// Calculate reading time (average 200 words per minute)
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

// Get all blogs (for admin)
export async function getAllBlogs() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching blogs:', error)
    throw new Error('Failed to fetch blogs')
  }

  return data
}

// Get published blogs (for public site)
export async function getPublishedBlogs(limit?: number) {
  const supabase = await createClient()
  
  let query = supabase
    .from('blogs')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .order('created_at', { ascending: false })

  if (limit) {
    query = query.limit(limit)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching published blogs:', error)
    return []
  }

  return data
}

// Get featured blogs
export async function getFeaturedBlogs() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('status', 'published')
    .eq('featured', true)
    .order('published_at', { ascending: false })
    .limit(3)

  if (error) {
    console.error('Error fetching featured blogs:', error)
    return []
  }

  return data
}

// Get blog by slug
export async function getBlogBySlug(slug: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching blog:', error)
    return null
  }

  return data
}

// Get blog by ID (for admin)
export async function getBlogById(id: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching blog:', error)
    return null
  }

  return data
}

// Create new blog
export async function createBlog(formData: FormData) {
  const supabase = await createAdminClient()

  // Extract and validate form data
  const rawData = {
    title: formData.get('title') as string,
    slug: formData.get('slug') as string,
    excerpt: formData.get('excerpt') as string,
    content: formData.get('content') as string,
    featured_image: formData.get('featured_image') as string,
    author: formData.get('author') as string,
    tags: formData.getAll('tags') as string[],
    category: formData.get('category') as string,
    featured: formData.get('featured') === 'on',
    status: (formData.get('status') as BlogStatus) || 'published',
    published_at: formData.get('published_at') as string,
  }

  const validatedData = blogSchema.parse(rawData)

  // Calculate reading time
  const readingTime = calculateReadingTime(validatedData.content)

  // Set published_at if publishing and not already set
  let publishedAt = validatedData.published_at
  if (validatedData.status === 'published' && !publishedAt) {
    publishedAt = new Date().toISOString()
  }

  const { data, error } = await supabase
    .from('blogs')
    .insert([{
      ...validatedData,
      reading_time: readingTime,
      published_at: publishedAt,
    }])
    .select()
    .single()

  if (error) {
    console.error('Error creating blog:', error)
    throw new Error('Failed to create blog: ' + error.message)
  }

  revalidatePath('/admin/blogs')
  revalidatePath('/')
  redirect('/admin/blogs')
}

// Update blog
export async function updateBlog(id: string, formData: FormData) {
  const supabase = await createAdminClient()

  // Extract and validate form data
  const rawData = {
    title: formData.get('title') as string,
    slug: formData.get('slug') as string,
    excerpt: formData.get('excerpt') as string,
    content: formData.get('content') as string,
    featured_image: formData.get('featured_image') as string,
    author: formData.get('author') as string,
    tags: formData.getAll('tags') as string[],
    category: formData.get('category') as string,
    featured: formData.get('featured') === 'on',
    status: (formData.get('status') as BlogStatus) || 'published',
    published_at: formData.get('published_at') as string,
  }

  const validatedData = blogSchema.parse(rawData)

  // Calculate reading time
  const readingTime = calculateReadingTime(validatedData.content)

  // Set published_at if publishing for the first time
  let publishedAt = validatedData.published_at
  if (validatedData.status === 'published' && !publishedAt) {
    publishedAt = new Date().toISOString()
  }

  const { data, error } = await supabase
    .from('blogs')
    .update({
      ...validatedData,
      reading_time: readingTime,
      published_at: publishedAt,
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating blog:', error)
    throw new Error('Failed to update blog: ' + error.message)
  }

  revalidatePath('/admin/blogs')
  revalidatePath('/')
  redirect('/admin/blogs')
}

// Delete blog
export async function deleteBlog(id: string) {
  const supabase = await createAdminClient()

  const { error } = await supabase
    .from('blogs')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting blog:', error)
    throw new Error('Failed to delete blog')
  }

  revalidatePath('/admin/blogs')
  revalidatePath('/')
}

// Increment view count
export async function incrementViewCount(id: string) {
  const supabase = await createClient()

  // First get the current view count
  const { data: blog } = await supabase
    .from('blogs')
    .select('view_count')
    .eq('id', id)
    .single()

  if (blog) {
    const { error } = await supabase
      .from('blogs')
      .update({ view_count: (blog.view_count || 0) + 1 })
      .eq('id', id)

    if (error) {
      console.error('Error incrementing view count:', error)
    }
  }
}

// Generate slug from title
export async function generateBlogSlug(title: string): Promise<string> {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}