export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          title: string
          slug: string
          description: string | null
          content: string | null
          short_description: string | null
          image_url: string | null
          github_url: string | null
          live_url: string | null
          technologies: string[] | null
          features: string[] | null
          screenshots: string[] | null
          category: string | null
          featured: boolean | null
          status: string | null
          order_index: number | null
          author: string | null
          published_at: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description?: string | null
          content?: string | null
          short_description?: string | null
          image_url?: string | null
          github_url?: string | null
          live_url?: string | null
          technologies?: string[] | null
          features?: string[] | null
          screenshots?: string[] | null
          category?: string | null
          featured?: boolean | null
          status?: string | null
          order_index?: number | null
          author?: string | null
          published_at?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string | null
          content?: string | null
          short_description?: string | null
          image_url?: string | null
          github_url?: string | null
          live_url?: string | null
          technologies?: string[] | null
          features?: string[] | null
          screenshots?: string[] | null
          category?: string | null
          featured?: boolean | null
          status?: string | null
          order_index?: number | null
          author?: string | null
          published_at?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      blogs: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string | null
          content: string
          featured_image: string | null
          author: string | null
          tags: string[] | null
          category: string | null
          featured: boolean | null
          status: string | null
          reading_time: number | null
          view_count: number | null
          published_at: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          title: string
          slug: string
          excerpt?: string | null
          content: string
          featured_image?: string | null
          author?: string | null
          tags?: string[] | null
          category?: string | null
          featured?: boolean | null
          status?: string | null
          reading_time?: number | null
          view_count?: number | null
          published_at?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          excerpt?: string | null
          content?: string
          featured_image?: string | null
          author?: string | null
          tags?: string[] | null
          category?: string | null
          featured?: boolean | null
          status?: string | null
          reading_time?: number | null
          view_count?: number | null
          published_at?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Helper types
export type Project = Database['public']['Tables']['projects']['Row']
export type ProjectInsert = Database['public']['Tables']['projects']['Insert']
export type ProjectUpdate = Database['public']['Tables']['projects']['Update']

export type Blog = Database['public']['Tables']['blogs']['Row']
export type BlogInsert = Database['public']['Tables']['blogs']['Insert']
export type BlogUpdate = Database['public']['Tables']['blogs']['Update']

// Status enums
export type ProjectStatus = 'draft' | 'published' | 'archived'
export type BlogStatus = 'draft' | 'published' | 'archived'
