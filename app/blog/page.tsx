export const metadata = {
    title: 'Blog',
    description: 'Thoughts, tutorials, and project updates from my development journey.',
};

export const dynamic = 'force-dynamic';
import { query } from '@/lib/db';
import Link from 'next/link';

export default async function BlogPage() {
    const res = await query('SELECT title, date, slug, excerpt, thumbnail_url FROM blogs ORDER BY id DESC');
    const blogs = res.rows;

    return (
        <div>
            <section>
                <h1 className="title-underline">blog</h1>
                <div className="blog-list" style={{ marginTop: '2.5rem' }}>
                    {blogs.length > 0 ? (
                        blogs.map((post, index) => (
                            <Link href={`/blog/${post.slug}`} key={index} className="blog-item" style={{ color: 'inherit', textDecoration: 'none', alignItems: 'center' }}>
                                {post.thumbnail_url && (
                                    <div style={{ width: '120px', height: '80px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, border: '1px solid var(--card-border)' }}>
                                        <img src={post.thumbnail_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                )}
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '0.25rem' }}>{post.date}</span>
                                    <span className="blog-title" style={{ color: 'var(--accent)', fontSize: '1.25rem' }}>
                                        {post.title}
                                    </span>
                                    <p className="muted" style={{ margin: '0.25rem 0 0 0', fontSize: '0.95rem' }}>
                                        {post.excerpt}
                                    </p>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="muted">No blog posts yet. Check back soon!</p>
                    )}
                </div>
            </section>
        </div>
    );
}
