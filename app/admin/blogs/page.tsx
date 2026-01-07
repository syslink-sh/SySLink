import { query } from '@/lib/db';
import { upsertBlog, deleteBlog } from '@/app/actions/content';
import Link from 'next/link';

export default async function AdminBlogsPage() {
    const res = await query('SELECT * FROM blogs ORDER BY id DESC');
    const blogs = res.rows;

    return (
        <div className="container">
            <header style={{ marginBottom: '4rem' }}>
                <Link href="/admin" className="muted">← Back to Dashboard</Link>
                <h1 className="title-underline" style={{ marginTop: '1rem' }}>Manage Blogs</h1>
            </header>

            <section className="card" style={{ padding: '2rem', marginBottom: '3rem' }}>
                <h2 style={{ marginTop: 0 }}>Create New Post</h2>
                <form action={upsertBlog} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', opacity: 0.7 }}>Title</label>
                            <input
                                name="title"
                                type="text"
                                required
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    borderRadius: '8px',
                                    border: '1px solid var(--card-border)',
                                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                                    color: 'white'
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', opacity: 0.7 }}>Date</label>
                            <input
                                name="date"
                                type="text"
                                placeholder="Jan 7, 2026"
                                required
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    borderRadius: '8px',
                                    border: '1px solid var(--card-border)',
                                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                                    color: 'white'
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', opacity: 0.7 }}>Slug</label>
                            <input
                                name="slug"
                                type="text"
                                placeholder="post-title"
                                required
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    borderRadius: '8px',
                                    border: '1px solid var(--card-border)',
                                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                                    color: 'white'
                                }}
                            />
                        </div>
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', opacity: 0.7 }}>Excerpt</label>
                        <textarea
                            name="excerpt"
                            rows={2}
                            required
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: '8px',
                                border: '1px solid var(--card-border)',
                                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                                color: 'white',
                                resize: 'none'
                            }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', opacity: 0.7 }}>Content (One paragraph per line, use **bold**)</label>
                        <textarea
                            name="content"
                            rows={8}
                            required
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: '8px',
                                border: '1px solid var(--card-border)',
                                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                                color: 'white'
                            }}
                        />
                    </div>
                    <button type="submit" className="nav-item active" style={{ border: 'none', cursor: 'pointer', textAlign: 'center' }}>
                        Publish Post
                    </button>
                </form>
            </section>

            <section>
                <h2>Existing Posts</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {blogs.map((blog) => (
                        <div key={blog.id} className="card" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                            <div>
                                <h3 style={{ marginBottom: '0.25rem' }}>{blog.title}</h3>
                                <p className="muted" style={{ fontSize: '0.85rem' }}>{blog.date} • /{blog.slug}</p>
                            </div>
                            <form action={async () => {
                                'use server';
                                await deleteBlog(blog.id);
                            }}>
                                <button type="submit" style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem' }}>
                                    Delete
                                </button>
                            </form>
                        </div>
                    ))}
                    {blogs.length === 0 && <p className="muted">No blog posts found.</p>}
                </div>
            </section>
        </div>
    );
}
