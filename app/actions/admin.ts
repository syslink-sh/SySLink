'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { query } from '../../lib/db';
import { randomBytes } from 'crypto';

export async function login(usernameInput: string, passwordInput: string) {
    const adminUser = process.env.username || 'syslink';
    const adminPass = process.env.adminpassword || 'FF102030405060ff';

    if (usernameInput === adminUser && passwordInput === adminPass) {
        // Generate a random token for every login
        const token = randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

        // Store session in database
        await query('INSERT INTO admin_sessions (token, expires_at) VALUES ($1, $2)', [token, expiresAt]);

        const cookieStore = await cookies();
        cookieStore.set('admin_session', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 3600, // 1 hour
        });

        redirect('/admin');
        return { success: true };
    }

    return { success: false, message: 'Invalid credentials' };
}

export async function logout() {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_session')?.value;

    if (token) {
        await query('DELETE FROM admin_sessions WHERE token = $1', [token]);
    }

    cookieStore.delete('admin_session');
    redirect('/admin/login');
}
