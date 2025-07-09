import { protectedPaths } from '@/lib/constant'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )
  
  // Fetch the current user session
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error('Error fetching user:', error.message);
  }

  const url = new URL(request.url);
  const user = data?.user;

  // Redirect authenticated users away from the /auth page
  if (user && url.pathname === '/auth') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Redirect unauthenticated users trying to access protected paths
  if (!user && protectedPaths.includes(url.pathname)) {
    return NextResponse.redirect(new URL(`/auth?next=${url.pathname}`, request.url));
  }

  // Set or update the loggedIn cookie based on user authentication status
  response.cookies.set({
    name: 'loggedIn',
    value: user ? 'true' : 'false',
    path: '/',
    httpOnly: true, // Prevent access via JavaScript
    secure: process.env.NODE_ENV === 'production', // Only use secure cookies in production
    sameSite: 'strict',
  });

  // Optionally store user ID in a cookie for easier future access
  if (user) {
    response.cookies.set({
      name: 'userId',
      value: user.id,
      path: '/',
      httpOnly: true, // Not accessible via JavaScript
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
  }

  // Optional: Remove or comment out debug logging if not needed
  // console.log(url.pathname);
  
  return response;
}