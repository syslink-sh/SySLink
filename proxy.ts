import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';


export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Protect all /admin paths except login
    if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
        const sessionToken = request.cookies.get('admin_session')?.value;

        if (!sessionToken) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        // Check if session exists and is not expired
        const res = await query(
            'SELECT token FROM admin_sessions WHERE token = $1 AND expires_at > NOW()',
            [sessionToken]
        );

        if (res.rows.length === 0) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    return NextResponse.next();
}
