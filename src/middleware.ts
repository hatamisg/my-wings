import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // DISABLED FOR TESTING - Layout handles auth now
  console.log('Middleware (disabled) for:', request.nextUrl.pathname)
  return NextResponse.next()
  
  // When re-enabled, redirect to /login instead of /admin/login
  // const loginUrl = new URL('/login', request.url)
}

export const config = {
  matcher: [
    /*
     * Match all admin routes
     */
    '/admin/:path*',
  ],
}