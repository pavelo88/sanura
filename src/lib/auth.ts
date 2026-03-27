import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';
const JWT_EXPIRY = '24h';

export interface AdminToken {
  iat: number;
  exp: number;
  admin: true;
  sessionId: string;
}

/**
 * Genera un JWT para sesión de admin
 */
export function generateAdminToken(sessionId: string): string {
  return jwt.sign(
    {
      admin: true,
      sessionId,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRY }
  );
}

/**
 * Verifica y decodifica un JWT
 */
export function verifyAdminToken(token: string): AdminToken | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AdminToken;
    return decoded;
  } catch (error) {
    return null;
  }
}

/**
 * Obtiene el token del httpOnly cookie
 */
export async function getAdminTokenFromCookies(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  return token || null;
}

/**
 * Almacena el token en httpOnly cookie (seguro para XSS)
 */
export async function setAdminCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60, // 24 horas
    path: '/',
  });
}

/**
 * Remueve el token del cookie
 */
export async function clearAdminCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('admin_token');
}

/**
 * Valida credenciales de admin
 */
export function validateAdminPassword(inputPassword: string): boolean {
  const correctPassword = process.env.ADMIN_PASSWORD;
  if (!correctPassword) {
    console.error('ADMIN_PASSWORD no está configurado en env variables');
    return false;
  }
  return inputPassword === correctPassword;
}
