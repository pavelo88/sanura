import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/auth';

/**
 * Middleware para proteger rutas administrativas
 * Verifica JWT en httpOnly cookie antes de permitir acceso a /admin
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

    // Verificar que el token sea válido
    const verified = verifyAdminToken(token);
    if (!verified) {
      // Token inválido o expirado
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.delete('admin_token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',  // Proteger todas las subrutas de /admin
  ],
};
