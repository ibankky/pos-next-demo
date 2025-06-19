import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token')?.value;

  const isAuth = !!token;
  const isLoginPage = request.nextUrl.pathname.startsWith('/login');

  // ถ้ายังไม่ได้ login → redirect ไป /login
  if (!isAuth && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // ถ้า login แล้วแต่พยายามเข้า /login อีก → redirect ไป /dashboard
  if (isAuth && isLoginPage) {
    return NextResponse.redirect(new URL('/main', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next|favicon.ico).*)', // ตรวจทุกหน้า ยกเว้น API/static
  ],
};
