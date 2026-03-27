import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/auth';

/**
 * GET /api/admin/check
 * Verifica si la sesión de admin es válida
 */

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }

    const verified = verifyAdminToken(token);
    if (!verified) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { authenticated: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('Check auth error:', error);
    return NextResponse.json(
      { authenticated: false },
      { status: 500 }
    );
  }
}
