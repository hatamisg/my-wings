import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FolderOpen, FileText, Eye, TrendingUp } from 'lucide-react'

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  // Fetch statistics
  const [
    { count: projectsCount },
    { count: blogsCount },
    { count: publishedProjects },
    { count: publishedBlogs }
  ] = await Promise.all([
    supabase.from('projects').select('*', { count: 'exact', head: true }),
    supabase.from('blogs').select('*', { count: 'exact', head: true }),
    supabase.from('projects').select('*', { count: 'exact', head: true }).eq('status', 'published'),
    supabase.from('blogs').select('*', { count: 'exact', head: true }).eq('status', 'published')
  ])

  const stats = [
    {
      name: 'Total Projects',
      value: projectsCount || 0,
      icon: FolderOpen,
      description: `${publishedProjects || 0} published`,
      color: 'text-blue-600',
      bg: 'bg-blue-100',
    },
    {
      name: 'Total Blogs',
      value: blogsCount || 0,
      icon: FileText,
      description: `${publishedBlogs || 0} published`,
      color: 'text-green-600',
      bg: 'bg-green-100',
    },
    {
      name: 'Published Content',
      value: (publishedProjects || 0) + (publishedBlogs || 0),
      icon: Eye,
      description: 'Live on website',
      color: 'text-purple-600',
      bg: 'bg-purple-100',
    },
    {
      name: 'Draft Content',
      value: (projectsCount || 0) + (blogsCount || 0) - ((publishedProjects || 0) + (publishedBlogs || 0)),
      icon: TrendingUp,
      description: 'Work in progress',
      color: 'text-orange-600',
      bg: 'bg-orange-100',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your portfolio.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.name}
              </CardTitle>
              <div className={`rounded-full p-2 ${stat.bg}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Portfolio setup completed</p>
                  <p className="text-xs text-muted-foreground">Admin panel is now ready</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <a 
              href="/admin/projects/new" 
              className="block p-3 rounded-lg border border-border hover:bg-accent text-sm font-medium"
            >
              + Add New Project
            </a>
            <a 
              href="/admin/blogs/new" 
              className="block p-3 rounded-lg border border-border hover:bg-accent text-sm font-medium"
            >
              + Write New Blog Post
            </a>
            <a 
              href="/" 
              target="_blank"
              className="block p-3 rounded-lg border border-border hover:bg-accent text-sm font-medium"
            >
              🌐 View Live Site
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}