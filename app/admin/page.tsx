import Link from 'next/link';
import { logout } from '@/app/actions/admin';

export default function AdminDashboard() {
    return (
        <div className="container">
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
                <h1 className="title-underline">Admin</h1>
                <form action={logout}>
                    <button type="submit" className="nav-item" style={{ border: 'none', cursor: 'pointer', background: 'none' }}>
                        Logout
                    </button>
                </form>
            </header>

            <div className="grid">
                <Link href="/admin/skills" className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                    <h2 style={{ marginTop: 0 }}>Skills</h2>
                    <p className="muted">Manage your coding skills and proficiency levels.</p>
                </Link>
                <Link href="/admin/blogs" className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                    <h2 style={{ marginTop: 0 }}>Blogs</h2>
                    <p className="muted">Write, edit, and manage your blog posts.</p>
                </Link>
            </div>

            <div style={{ marginTop: '4rem', textAlign: 'center' }}>
                <Link href="/" className="muted">← Back to public site</Link>
            </div>
        </div>
    );
}
