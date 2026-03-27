import { NextRequest, NextResponse } from 'next/server';
import { generateAdminToken, setAdminCookie, validateAdminPassword } from '@/lib/auth';
import { z } from 'zod';

/**
 * POST /api/admin/login
 * Valida contraseña y retorna JWT token en httpOnly cookie
 */

const loginSchema = z.object({
  password: z.string().min(1, 'Password es requerido'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = loginSchema.parse(body);

    // Validar contraseña contra variable de entorno (PRIVADA, no pública)
    if (!validateAdminPassword(password)) {
      return NextResponse.json(
        { error: 'Clave de acceso incorrecta' },
        { status: 401 }
      );
    }

    // Generar JWT con session ID único
    const sessionId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const token = generateAdminToken(sessionId);

    // Guardar en httpOnly cookie (seguro contra XSS)
    await setAdminCookie(token);

    return NextResponse.json(
      {
        success: true,
        message: 'Acceso concedido - Sesión iniciada',
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Input inválido', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
