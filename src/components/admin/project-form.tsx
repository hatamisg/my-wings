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
import type { Project } from '@/types/database'
import { createProject, updateProject } from '@/lib/actions/projects'
import { toast } from 'sonner'
import ImageUpload from './image-upload'

interface ProjectFormProps {
  project?: Project
  isEdit?: boolean
}

const projectCategories = [
  'Web Development',
  'Mobile Development',
  'Desktop Application',
  'E-commerce',
  'API/Backend',
  'Data Science',
  'AI/ML',
  'DevOps',
  'Other'
]

const commonTechnologies = [
  'React', 'Next.js', 'TypeScript', 'JavaScript', 'Node.js', 'Express.js',
  'Python', 'Django', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Redis',
  'Tailwind CSS', 'Shadcn/ui', 'Prisma', 'Supabase', 'Vercel', 'AWS',
  'Docker', 'Kubernetes', 'GraphQL', 'REST API', 'Socket.io'
]

export default function ProjectForm({ project, isEdit = false }: ProjectFormProps) {
  const [title, setTitle] = useState(project?.title || '')
  const [slug, setSlug] = useState(project?.slug || '')
  const [description, setDescription] = useState(project?.description || '')
  const [content, setContent] = useState(project?.content || '')
  const [shortDescription, setShortDescription] = useState(project?.short_description || '')
  const [imageUrl, setImageUrl] = useState(project?.image_url || '')
  const [githubUrl, setGithubUrl] = useState(project?.github_url || '')
  const [liveUrl, setLiveUrl] = useState(project?.live_url || '')
  const [technologies, setTechnologies] = useState<string[]>(project?.technologies || [])
  const [newTech, setNewTech] = useState('')
  const [category, setCategory] = useState(project?.category || '')
  const [featured, setFeatured] = useState(project?.featured || false)
  const [status, setStatus] = useState(project?.status || 'published')
  const [orderIndex, setOrderIndex] = useState(project?.order_index || 0)
  const [author, setAuthor] = useState(project?.author || 'Hatami Sugandi')
  const [publishedAt, setPublishedAt] = useState(
    project?.published_at ? new Date(project.published_at).toISOString().slice(0,16) : ''
  )
  const [features, setFeatures] = useState<string[]>(project?.features || [])
  const [newFeature, setNewFeature] = useState('')
  const [screenshots, setScreenshots] = useState<string[]>(project?.screenshots || [])
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

  const addTechnology = (tech: string) => {
    if (tech && !technologies.includes(tech)) {
      setTechnologies([...technologies, tech])
      setNewTech('')
    }
  }

  const removeTechnology = (techToRemove: string) => {
    setTechnologies(technologies.filter(tech => tech !== techToRemove))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('slug', slug)
      formData.append('description', description)
      formData.append('content', content)
      formData.append('short_description', shortDescription)
      formData.append('image_url', imageUrl)
      formData.append('github_url', githubUrl)
      formData.append('live_url', liveUrl)
      technologies.filter(Boolean).forEach(tech => formData.append('technologies', tech))
      features.filter(Boolean).forEach(f => formData.append('features', f))
      screenshots.filter(Boolean).forEach(s => formData.append('screenshots', s))
      formData.append('category', category)
      formData.append('featured', featured ? 'on' : 'off')
      formData.append('status', status)
      formData.append('order_index', orderIndex.toString())
      if (author) formData.append('author', author)
      if (publishedAt) formData.append('published_at', new Date(publishedAt).toISOString())

      if (isEdit && project) {
        await updateProject(project.id, formData)
        toast.success('Project updated successfully!')
      } else {
        await createProject(formData)
        toast.success('Project created successfully!')
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
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter project title"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="project-slug"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="short_description">Short Description</Label>
                <Input
                  id="short_description"
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="Brief description for cards and previews"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detailed project description"
                  rows={6}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Long content or markdown for the project detail page"
                  rows={10}
                />
              </div>

              <div className="space-y-2">
                <ImageUpload
                  value={imageUrl}
                  onChange={setImageUrl}
                  label="Project Image"
                  folder="projects"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="github_url">GitHub URL</Label>
                  <Input
                    id="github_url"
                    type="url"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/username/repo"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="live_url">Live URL</Label>
                  <Input
                    id="live_url"
                    type="url"
                    value={liveUrl}
                    onChange={(e) => setLiveUrl(e.target.value)}
                    placeholder="https://project-demo.com"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Technologies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="flex items-center gap-1">
                    {tech}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => removeTechnology(tech)}
                    />
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  placeholder="Add technology"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      addTechnology(newTech)
                    }
                  }}
                />
                <Button 
                  type="button" 
                  onClick={() => addTechnology(newTech)}
                  size="sm"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Quick add:</p>
                <div className="flex flex-wrap gap-1">
                  {commonTechnologies.map((tech) => (
                    <Button
                      key={tech}
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => addTechnology(tech)}
                      disabled={technologies.includes(tech)}
                    >
                      {tech}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {features.map((f) => (
                  <Badge key={f} variant="secondary" className="flex items-center gap-1">
                    {f}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setFeatures(features.filter(x => x !== f))} />
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="Add feature"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      if (newFeature && !features.includes(newFeature)) setFeatures([...features, newFeature])
                      setNewFeature('')
                    }
                  }}
                />
                <Button type="button" size="sm" onClick={() => {
                  if (newFeature && !features.includes(newFeature)) setFeatures([...features, newFeature])
                  setNewFeature('')
                }}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Screenshots (up to 4)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {screenshots.map((url, idx) => (
                  <div key={idx} className="relative">
                    <ImageUpload
                      value={url}
                      onChange={(u) => {
                        const next = [...screenshots]
                        next[idx] = u
                        setScreenshots(next)
                      }}
                      label={`Screenshot ${idx + 1}`}
                      folder="projects/screenshots"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="mt-2"
                      onClick={() => setScreenshots(screenshots.filter((_, i) => i !== idx))}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
              {screenshots.length < 4 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setScreenshots([...screenshots, ''])}
                >
                  Add Screenshot
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input id="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="published_at">Published At</Label>
                <Input
                  id="published_at"
                  type="datetime-local"
                  value={publishedAt}
                  onChange={(e) => setPublishedAt(e.target.value)}
                />
              </div>
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

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {projectCategories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="order_index">Order Index</Label>
                <Input
                  id="order_index"
                  type="number"
                  value={orderIndex}
                  onChange={(e) => setOrderIndex(parseInt(e.target.value) || 0)}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={featured}
                  onCheckedChange={setFeatured}
                />
                <Label htmlFor="featured">Featured Project</Label>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-2">
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting 
                ? (isEdit ? 'Updating...' : 'Creating...') 
                : (isEdit ? 'Update Project' : 'Create Project')
              }
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}
