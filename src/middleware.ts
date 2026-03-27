import { NextRequest, NextResponse } from 'next/server';

/**
 * Middleware para proteger rutas administrativas.
 * Verifica la existencia de la cookie de sesión.
 * (La validación criptográfica del JWT se hace de forma segura en Node.js vía /api/admin/check)
 */

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Solo proteger rutas /admin (excepto login y api)
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login') && !pathname.startsWith('/api')) {

    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      // Redirigir a login si no hay token
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',  // Proteger todas las subrutas de /admin
  ],
};