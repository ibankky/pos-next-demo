import { NextResponse } from 'next/server';

/**
 * Middleware ตรวจ token และ redirect
 * @param {import('next/server').NextRequest} request
 */
export function middleware(request) {
  const token = request.cookies.get('token')?.value;

  const isLoginPage = request.nextUrl.pathname.startsWith('/login');
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/pos');

  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // ถ้า login แล้ว แต่ดันเข้า /auth/login → redirect กลับไปหน้าแรก
  if (token && isLoginPage) {
    return NextResponse.redirect(new URL('/pos', request.url));
  } 

  return NextResponse.next(); // ผ่านได้
}

export const config = {
  matcher: [
    '/((?!api|_next|favicon.ico).*)', // ตรวจทุกหน้า ยกเว้น API/static
  ],
};
