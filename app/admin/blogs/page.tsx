import { query } from '@/lib/db';
import { upsertBlog, deleteBlog } from '@/app/actions/content';
import Link from 'next/link';
import BlogEditor from '@/components/BlogEditor';

export default async function AdminBlogsPage() {
    const res = await query('SELECT * FROM blogs ORDER BY id DESC');
    const blogs = res.rows;

    return (
        <div className="container">
            <header style={{ marginBottom: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
                <div>
                    <h1 className="title-underline" style={{ marginBottom: '1.5rem' }}>Manage Blogs</h1>
                    <p className="muted">Craft your stories and manage existing posts.</p>
                </div>
                <Link href="/admin" className="nav-item" style={{ fontSize: '0.9rem', border: '1px solid var(--card-border)' }}>
                    ← Dashboard
                </Link>
            </header>

            <section className="card" style={{ padding: '2rem', marginBottom: '3rem' }}>
                <h2 style={{ marginTop: 0, marginBottom: '2rem' }}>Create New Post</h2>
                <BlogEditor action={upsertBlog} />
            </section>

            <section>
                <h2>Existing Posts</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {blogs.map((blog: any) => (
                        <div key={blog.id} className="card" style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                {blog.thumbnail_url && (
                                    <div style={{ width: '60px', height: '40px', borderRadius: '4px', overflow: 'hidden', backgroundColor: '#000', border: '1px solid var(--card-border)' }}>
                                        <img src={blog.thumbnail_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                )}
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '1rem' }}>{blog.title}</h3>
                                    <p className="muted" style={{ fontSize: '0.8rem', margin: 0 }}>{blog.date} • /{blog.slug}</p>
                                </div>
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
