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
  
  const {data} = await supabase.auth.getUser();
  const url = new URL(request.url);
  console.log(data)
  if(data.user){
    if(url.pathname === '/auth'){

      //Maybe i need to do return NextResponse.redirect(new URL ("/", request.url))
      return NextResponse.redirect(
        new URL ("/", request.url)
      )
    }
    return NextResponse.next();
  }else{
    if(protectedPaths.includes(url.pathname)){
      //Maybe i need to do return NextResponse.redirect(new URL ("/auth", request.url))
      return NextResponse.redirect(
        new URL ("/auth?next=" + url.pathname, request.url)
      );
    }
  }

  console.log(url.pathname)
  await supabase.auth.getUser()

  return NextResponse.next();
}