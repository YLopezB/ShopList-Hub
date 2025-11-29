import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const userId = request.cookies.get('user_id')?.value
  const { pathname } = request.nextUrl
 
  const isPublicPage = ['/', '/login', '/register', '/forgot-password'].includes(pathname)
 
  // If the user is logged in and tries to access a public page, redirect them to their dashboard
  if (userId && isPublicPage) {
    const userRole = request.cookies.get('user_role')?.value;
    const url = request.nextUrl.clone()
    url.pathname = userRole === 'store' ? '/store/dashboard' : '/dashboard'
    return NextResponse.redirect(url)
  }
 
  // If the user is not logged in and tries to access a protected page, redirect them to the login page
  if (!userId && !isPublicPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
 
  // Otherwise, allow the request to proceed
  return NextResponse.next()
}
 
export const config = {
  // This will match all routes except for API routes, static files, and images
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|avatars).*)'],
}
