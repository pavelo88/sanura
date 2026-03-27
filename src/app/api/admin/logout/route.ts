import { NextRequest, NextResponse } from 'next/server';
import { clearAdminCookie } from '@/lib/auth';

/**
 * POST /api/admin/logout
 * Elimina la sesión de admin
 */

export async function POST(request: NextRequest) {
  try {
    await clearAdminCookie();

    return NextResponse.json(
      {
        success: true,
        message: 'Sesión cerrada correctamente',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Error al cerrar sesión' },
      { status: 500 }
    );
  }
}
