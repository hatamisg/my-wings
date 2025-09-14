import BlogForm from '@/components/admin/blog-form'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NewBlogPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/blogs">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Posts
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Write New Post</h1>
          <p className="text-muted-foreground">
            Create a new blog post for your portfolio
          </p>
        </div>
      </div>

      <BlogForm />
    </div>
  )
}