import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from 'better-auth/cookies'

// Define protected routes
const protectedRoutes = ["/profile", "/post/create", "/post/edit"];

export async function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;

  const session = getSessionCookie(request)

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathName.startsWith(route)
  );

  // যদি protected route হয় এবং user লগইন না করে থাকে
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  //if user is already logged in and user is accesing auth route they will automatically redirect to homepage
  if(pathName === '/auth' && session){
    return NextResponse.redirect(new URL('/', request.url))
  }

  // সব ঠিক থাকলে request চলতে দাও
  return NextResponse.next();
}


export const config = {
    matcher : ['/profile/:path*', '/post/create', '/post/edit/:path*', '/auth']
}