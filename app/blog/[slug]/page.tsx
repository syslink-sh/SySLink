import { query } from '@/lib/db';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
    const { slug } = await params;
    const res = await query('SELECT title, excerpt, thumbnail_url FROM blogs WHERE slug = $1', [slug]);
    const post = res.rows[0];

    if (!post) return {};

    return {
        title: post.title,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: post.thumbnail_url ? [post.thumbnail_url] : [],
        },
    };
}

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

            {post.thumbnail_url && (
                <div style={{ marginBottom: '3rem', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--card-border)' }}>
                    <img src={post.thumbnail_url} alt="" style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>
            )}

            <div className="blog-content" style={{ fontSize: '1.15rem', lineHeight: '1.8', opacity: 0.9 }}>
                {post.content && Array.isArray(post.content) ? (
                    post.content.map((paragraph: string, i: number) => {
                        // Handle images: (*url*)
                        if (paragraph.startsWith('(*') && paragraph.endsWith('*)')) {
                            const url = paragraph.slice(2, -2).trim();
                            return (
                                <div key={i} style={{ margin: '2.5rem 0', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--card-border)' }}>
                                    <img src={url} alt="" style={{ width: '100%', height: 'auto', display: 'block' }} />
                                </div>
                            );
                        }

                        // Handle HR: ---
                        if (paragraph === '---') {
                            return <hr key={i} style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid var(--card-border)' }} />;
                        }

                        // Handle Headers: ###
                        if (paragraph.startsWith('### ')) {
                            return <h3 key={i} style={{ marginTop: '2.5rem', marginBottom: '1.5rem', color: 'var(--accent)' }}>{paragraph.slice(4)}</h3>;
                        }

                        // Handle Quotes: >
                        if (paragraph.startsWith('> ')) {
                            return (
                                <blockquote key={i} style={{ margin: '2rem 0', padding: '1rem 1.5rem', borderLeft: '4px solid var(--accent)', backgroundColor: 'rgba(255, 255, 255, 0.03)', fontStyle: 'italic', borderRadius: '0 8px 8px 0' }}>
                                    {paragraph.slice(2)}
                                </blockquote>
                            );
                        }

                        // Handle Bullets: -
                        if (paragraph.startsWith('- ')) {
                            return (
                                <li key={i} style={{ marginLeft: '1.5rem', marginBottom: '0.75rem', listStyleType: 'square' }}>
                                    {paragraph.slice(2)}
                                </li>
                            );
                        }

                        const escaped = paragraph
                            .replace(/&/g, '&amp;')
                            .replace(/</g, '&lt;')
                            .replace(/>/g, '&gt;')
                            .replace(/"/g, '&quot;')
                            .replace(/'/g, '&#039;');

                        const formatted = escaped
                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            .replace(/_(.*?)_/g, '<em>$1</em>')
                            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" style="color: var(--accent); text-decoration: underline;">$1</a>');

                        return (
                            <p key={i} dangerouslySetInnerHTML={{ __html: formatted }} style={{ marginBottom: '1.5rem' }} />
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
