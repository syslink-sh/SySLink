import { query } from '@/lib/db';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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

    const res = await query('SELECT title, date, content, thumbnail_url FROM blogs WHERE slug = $1', [slug]);
    const post = res.rows[0];

    if (!post) {
        notFound();
    }

    // Pre-process content to handle custom image syntax
    const processedContent = post.content
        ?.replace(/\(\*(.*?)\*\)/g, '![]($1)') // Handle (*url*)
        ?.replace(/\(\n(.*?)\n\)/g, '![]($1)') // Handle (\nurl\n)
        || '';

    return (
        <article style={{ maxWidth: '800px', margin: '0 auto' }}>
            <header style={{ marginBottom: '4rem' }}>
                <h1 className="title-underline" style={{ fontSize: '3rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>
                    {post.title}
                </h1>
                <div className="muted" style={{ fontStyle: 'italic', fontSize: '1.1rem' }}>
                    {post.date}
                </div>
            </header>

            {post.thumbnail_url && (
                <div style={{ marginBottom: '4rem', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--card-border)', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
                    <img src={post.thumbnail_url} alt="" style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>
            )}

            <div className="blog-content">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        h1: ({ children }) => <h1 style={{ marginTop: '3rem', marginBottom: '1.5rem', color: 'var(--accent)' }}>{children}</h1>,
                        h2: ({ children }) => <h2 style={{ marginTop: '2.5rem', marginBottom: '1.25rem', color: 'var(--accent)', borderBottom: '1px solid var(--card-border)', paddingBottom: '0.5rem' }}>{children}</h2>,
                        h3: ({ children }) => <h3 style={{ marginTop: '2rem', marginBottom: '1rem', color: 'var(--accent)' }}>{children}</h3>,
                        p: ({ children }) => <p style={{ marginBottom: '1.75rem', fontSize: '1.15rem', lineHeight: '1.8', opacity: 0.9 }}>{children}</p>,
                        ul: ({ children }) => <ul style={{ marginBottom: '2rem', paddingLeft: '1.5rem', listStyleType: 'square' }}>{children}</ul>,
                        ol: ({ children }) => <ol style={{ marginBottom: '2rem', paddingLeft: '1.5rem' }}>{children}</ol>,
                        li: ({ children }) => <li style={{ marginBottom: '0.75rem', fontSize: '1.1rem', opacity: 0.9 }}>{children}</li>,
                        blockquote: ({ children }) => (
                            <blockquote style={{ margin: '2.5rem 0', padding: '1.5rem 2rem', borderLeft: '4px solid var(--accent)', backgroundColor: 'rgba(255, 255, 255, 0.03)', fontStyle: 'italic', borderRadius: '0 12px 12px 0', fontSize: '1.2rem' }}>
                                {children}
                            </blockquote>
                        ),
                        img: ({ src, alt }) => (
                            <div style={{ margin: '3rem 0', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--card-border)' }}>
                                <img src={src} alt={alt || ''} style={{ width: '100%', height: 'auto', display: 'block' }} />
                            </div>
                        ),
                        code: ({ children, className }) => {
                            const inline = !className;
                            return inline ? (
                                <code style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '0.2rem 0.4rem', borderRadius: '4px', fontSize: '0.9em', fontFamily: 'monospace' }}>{children}</code>
                            ) : (
                                <pre style={{ backgroundColor: '#0d1117', padding: '1.5rem', borderRadius: '12px', overflowX: 'auto', border: '1px solid var(--card-border)', marginBottom: '2rem' }}>
                                    <code className={className} style={{ fontFamily: 'monospace', fontSize: '0.95rem', lineHeight: '1.6' }}>{children}</code>
                                </pre>
                            );
                        },
                        hr: () => <hr style={{ margin: '4rem 0', border: 'none', borderTop: '1px solid var(--card-border)' }} />,
                        a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>{children}</a>,
                        table: ({ children }) => (
                            <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid var(--card-border)' }}>{children}</table>
                            </div>
                        ),
                        th: ({ children }) => <th style={{ border: '1px solid var(--card-border)', padding: '0.75rem', backgroundColor: 'rgba(255,255,255,0.05)', textAlign: 'left' }}>{children}</th>,
                        td: ({ children }) => <td style={{ border: '1px solid var(--card-border)', padding: '0.75rem' }}>{children}</td>,
                    }}
                >
                    {processedContent}
                </ReactMarkdown>
            </div>

            <footer style={{ marginTop: '5rem', paddingTop: '2.5rem', borderTop: '1px solid var(--card-border)' }}>
                <Link href="/blog" style={{ fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    ← Back to all posts
                </Link>
            </footer>
        </article>
    );
}
