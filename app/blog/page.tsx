export const metadata = {
    title: 'Blog',
    description: 'Thoughts, tutorials, and project updates from my development journey.',
};

export const dynamic = 'force-dynamic';
import { query } from '../../lib/db';
import Link from 'next/link';

export default async function BlogPage() {
    const res = await query('SELECT title, date, slug, excerpt, thumbnail_url FROM blogs ORDER BY id DESC');
    const blogs = res.rows;

    return (
        <div>
            <section>
                <h1 className="title-underline">blog</h1>
                <p className="muted" style={{ marginBottom: '3rem', fontSize: '1.1rem' }}>
                    Thoughts, tutorials, and project updates from my development journey.
                </p>

                <div className="blog-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {blogs.length > 0 ? (
                        blogs.map((post: any, index: number) => (
                            <Link href={`/blog/${post.slug}`} key={index} className="card" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', gap: '1.5rem', padding: '1.25rem', alignItems: 'center' }}>
                                {post.thumbnail_url && (
                                    <div style={{ width: '100px', height: '65px', borderRadius: '4px', overflow: 'hidden', flexShrink: 0, border: '1px solid var(--card-border)' }}>
                                        <img src={post.thumbnail_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                )}
                                <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                                    <span className="blog-title" style={{ color: 'var(--accent)', fontSize: '1.2rem', fontWeight: 600 }}>
                                        {post.title}
                                    </span>
                                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '0.25rem' }}>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{post.date}</span>
                                        <p className="muted" style={{ margin: 0, fontSize: '0.9rem', opacity: 0.8 }}>
                                            {post.excerpt}
                                        </p>
                                    </div>
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
