import { query } from '@/lib/db';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface BlogPostProps {
    params: Promise<{ slug: string }>;
}

export default async function BlogPost({ params }: BlogPostProps) {
    const { slug } = await params;

    const res = await query('SELECT title, date, content FROM blogs WHERE slug = $1', [slug]);
    const post = res.rows[0];

    if (!post) {
        notFound();
    }

    return (
        <article style={{ maxWidth: '700px' }}>
            <header style={{ marginBottom: '3rem' }}>
                <h1 className="title-underline" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                    {post.title}
                </h1>
                <div className="muted" style={{ fontStyle: 'italic', fontSize: '1rem' }}>
                    {post.date}
                </div>
            </header>

            <div className="blog-content" style={{ fontSize: '1.15rem', lineHeight: '1.8', opacity: 0.9 }}>
                {post.content && Array.isArray(post.content) ? (
                    post.content.map((paragraph: string, i: number) => {
                        const escaped = paragraph
                            .replace(/&/g, '&amp;')
                            .replace(/</g, '&lt;')
                            .replace(/>/g, '&gt;')
                            .replace(/"/g, '&quot;')
                            .replace(/'/g, '&#039;');

                        const formatted = escaped.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

                        return (
                            <p key={i} dangerouslySetInnerHTML={{ __html: formatted }} />
                        );
                    })
                ) : (
                    <p className="muted">Full content coming soon.</p>
                )}
            </div>

            <footer style={{ marginTop: '5rem', paddingTop: '2.5rem', borderTop: '1px solid var(--card-border)' }}>
                <Link href="/blog" style={{ fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    ← Back to all posts
                </Link>
            </footer>
        </article>
    );
}
