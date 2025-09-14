'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { X, Plus } from 'lucide-react'
import type { Blog } from '@/types/database'
import { createBlog, updateBlog } from '@/lib/actions/blogs'
import { toast } from 'sonner'
import ImageUpload from './image-upload'

interface BlogFormProps {
  blog?: Blog
  isEdit?: boolean
}

const blogCategories = [
  'Tutorial',
  'Best Practices',
  'Tips & Tricks',
  'Industry News',
  'Personal',
  'Technology',
  'Web Development',
  'Mobile Development',
  'Design',
  'DevOps',
  'AI/ML',
  'Career',
  'Other'
]

const commonTags = [
  'React', 'Next.js', 'TypeScript', 'JavaScript', 'Node.js', 'CSS',
  'HTML', 'Web Development', 'Frontend', 'Backend', 'Full Stack',
  'Tutorial', 'Tips', 'Best Practices', 'Performance', 'SEO',
  'UI/UX', 'Design', 'Career', 'Learning', 'Productivity'
]

export default function BlogForm({ blog, isEdit = false }: BlogFormProps) {
  const [title, setTitle] = useState(blog?.title || '')
  const [slug, setSlug] = useState(blog?.slug || '')
  const [excerpt, setExcerpt] = useState(blog?.excerpt || '')
  const [content, setContent] = useState(blog?.content || '')
  const [featuredImage, setFeaturedImage] = useState(blog?.featured_image || '')
  const [author, setAuthor] = useState(blog?.author || 'Hatami Sugandi')
  const [tags, setTags] = useState<string[]>(blog?.tags || [])
  const [newTag, setNewTag] = useState('')
  const [category, setCategory] = useState(blog?.category || '')
  const [featured, setFeatured] = useState(blog?.featured || false)
  const [status, setStatus] = useState(blog?.status || 'draft')
  const [publishedAt, setPublishedAt] = useState(
    blog?.published_at ? new Date(blog.published_at).toISOString().slice(0, 16) : ''
  )
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Auto-generate slug from title
  useEffect(() => {
    if (!isEdit && title && !slug) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
      setSlug(generatedSlug)
    }
  }, [title, slug, isEdit])

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag])
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('slug', slug)
      formData.append('excerpt', excerpt)
      formData.append('content', content)
      formData.append('featured_image', featuredImage)
      formData.append('author', author)
      tags.forEach(tag => formData.append('tags', tag))
      formData.append('category', category)
      formData.append('featured', featured ? 'on' : 'off')
      formData.append('status', status)
      if (publishedAt) {
        formData.append('published_at', new Date(publishedAt).toISOString())
      }

      if (isEdit && blog) {
        await updateBlog(blog.id, formData)
        toast.success('Blog post updated successfully!')
      } else {
        await createBlog(formData)
        toast.success('Blog post created successfully!')
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Post Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter blog post title"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="blog-post-slug"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Brief description for the blog post preview"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your blog post content in Markdown format"
                  rows={20}
                  required
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Supports Markdown formatting. Preview functionality can be added later.
                </p>
              </div>

              <div className="space-y-2">
                <ImageUpload
                  value={featuredImage}
                  onChange={setFeaturedImage}
                  label="Featured Image"
                  folder="blog"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => removeTag(tag)}
                    />
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add tag"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      addTag(newTag)
                    }
                  }}
                />
                <Button 
                  type="button" 
                  onClick={() => addTag(newTag)}
                  size="sm"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Quick add:</p>
                <div className="flex flex-wrap gap-1">
                  {commonTags.map((tag) => (
                    <Button
                      key={tag}
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => addTag(tag)}
                      disabled={tags.includes(tag)}
                    >
                      {tag}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Publishing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {(status === 'published' || publishedAt) && (
                <div className="space-y-2">
                  <Label htmlFor="published_at">Publish Date & Time</Label>
                  <Input
                    id="published_at"
                    type="datetime-local"
                    value={publishedAt}
                    onChange={(e) => setPublishedAt(e.target.value)}
                  />
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={featured}
                  onCheckedChange={setFeatured}
                />
                <Label htmlFor="featured">Featured Post</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Metadata</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Author name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {blogCategories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-2">
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting 
                ? (isEdit ? 'Updating...' : 'Creating...') 
                : (isEdit ? 'Update Post' : 'Create Post')
              }
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}