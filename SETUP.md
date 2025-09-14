# Portfolio Backend Setup Guide

This guide will help you set up your portfolio with Supabase backend and deploy it to Vercel.

## Prerequisites

- ✅ Supabase account (free tier)
- ✅ Vercel account (free tier)
- ✅ Your custom domain

## 1. Supabase Setup

### Step 1: Create Supabase Project

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Click "New project"
3. Choose your organization
4. Enter project name (e.g., "portfolio-hata")
5. Create a secure database password
6. Select region closest to your users
7. Click "Create new project"

### Step 2: Configure Database

1. Wait for project to finish setting up
2. Go to the SQL Editor in your Supabase dashboard
3. Copy the entire contents of `supabase-schema.sql` file from your project
4. Paste and run the SQL to create tables, indexes, and policies
5. Verify tables are created in Database > Tables

### Step 3: Set up Storage (for image uploads)

1. Go to Storage in Supabase dashboard
2. Create a new bucket called `images`
3. Make it public by going to bucket settings
4. Set the bucket policy by going to **SQL Editor** and running this SQL:

```sql
-- Allow public read access
CREATE POLICY "Public Access" ON storage.objects
FOR SELECT USING (bucket_id = 'images');

-- Allow authenticated users to upload
CREATE POLICY "Authenticated Upload" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');
```

**Catatan**: Jalankan SQL di atas di **SQL Editor** yang sama tempat Anda menjalankan `supabase-schema.sql`

### Step 4: Get API Keys

1. Go to Settings > API in Supabase dashboard
2. Copy these values:
   - Project URL https://mcgwesqppanxcmxurpzh.supabase.co
   - `anon/public` key = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jZ3dlc3FwcGFueGNteHVycHpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4NjUyMjgsImV4cCI6MjA3MzQ0MTIyOH0.AQd7zl0KJQk8ISnwOJtfUl0oV021e_FipMJMo9Jylr8
   - `service_role` key (keep this secret!) eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jZ3dlc3FwcGFueGNteHVycHpoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Nzg2NTIyOCwiZXhwIjoyMDczNDQxMjI4fQ.KmEji7jAPmN_NtZXUYWRMqr_OW-HJE-NA8ZOARjuYcc

### Step 5: Create Admin User

1. Go to Authentication > Users
2. Click "Add user"
3. Enter your email and secure password
4. Make sure to verify the email if required

## 2. Local Environment Setup

### Step 1: Install Dependencies

```bash
# Already done in your project
npm install
```

### Step 2: Configure Environment Variables

1. Update `.env.local` with your Supabase credentials:

```env
# Replace with your actual Supabase project values
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Your domain
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Step 3: Test Locally

```bash
npm run dev
```

1. Visit `http://localhost:3000`
2. Check if the site loads without errors
3. Go to `http://localhost:3000/admin/login`
4. Login with your admin credentials
5. Try creating a test project and blog post

## 3. Deployment to Vercel

### Step 1: Push to GitHub

1. Create a new GitHub repository
2. Push your code:

```bash
git add .
git commit -m "Initial portfolio setup"
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main
```

### Step 2: Connect Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure project:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

### Step 3: Add Environment Variables

1. In Vercel project settings > Environment Variables
2. Add these variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Step 4: Deploy

1. Click "Deploy"
2. Wait for build to complete
3. Test your deployed site

### Step 5: Custom Domain

1. Go to Vercel project > Settings > Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update `NEXT_PUBLIC_SITE_URL` to your custom domain
5. Redeploy

## 4. Post-Deployment Setup

### Step 1: Update Supabase Auth Settings

1. Go to Supabase > Authentication > URL Configuration
2. Add your production domain to "Site URL"
3. Add your domain to "Redirect URLs"

### Step 2: Test Everything

1. Visit your live site
2. Test admin login at `your-domain.com/admin/login`
3. Create a project and blog post
4. Verify they appear on the homepage
5. Test image uploads

### Step 3: Content Setup

1. Add your real projects in `/admin/projects`
2. Write your first blog posts in `/admin/blogs`
3. Update the About section and other content as needed

## 5. Ongoing Management

### Adding Content

- **Projects**: Login to `/admin/projects` to manage your portfolio projects
- **Blog Posts**: Login to `/admin/blogs` to write and publish articles
- **Images**: Use the built-in image uploader or add URLs directly

### Monitoring

- **Analytics**: Add Vercel Analytics or Google Analytics
- **Performance**: Monitor Core Web Vitals in Vercel dashboard
- **Database**: Check Supabase dashboard for usage stats

### Backups

- Supabase automatically backs up your data
- Consider exporting your data periodically from Supabase dashboard

## 6. Troubleshooting

### Common Issues

**Admin login not working:**

- Check environment variables are set correctly
- Verify admin user exists in Supabase Auth
- Check browser console for errors

**Images not uploading:**

- Verify Supabase storage bucket is created and public
- Check storage policies allow authenticated uploads
- Ensure file size is under 5MB

**Database connection errors:**

- Verify Supabase URL and keys are correct
- Check if project is paused (free tier limitation)
- Verify RLS policies allow access

**Deployment issues:**

- Check build logs in Vercel dashboard
- Verify all environment variables are set
- Ensure no TypeScript errors

### Getting Help

- Check Supabase docs: https://supabase.com/docs
- Check Vercel docs: https://vercel.com/docs
- Check Next.js docs: https://nextjs.org/docs

## 7. Optional Enhancements

### SEO

- Add metadata to blog posts
- Implement structured data
- Add sitemap generation

### Performance

- Optimize images with next/image
- Add caching headers
- Use CDN for static assets

### Features

- Add search functionality
- Implement commenting system
- Add newsletter subscription
- Add contact form

---

🎉 **Congratulations!** Your portfolio backend is now set up and deployed. You can manage all your content through the admin dashboard at `/admin`.
