'use client';

import { useState, useRef } from 'react';

interface BlogEditorProps {
    action: (formData: FormData) => Promise<void>;
    initialData?: {
        id?: number;
        title?: string;
        date?: string;
        slug?: string;
        excerpt?: string;
        thumbnail_url?: string;
        content?: string;
    };
}

export default function BlogEditor({ action, initialData }: BlogEditorProps) {
    const [content, setContent] = useState(initialData?.content || '');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const insertText = (prefix: string, suffix: string = '') => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        const selected = text.substring(start, end);
        const before = text.substring(0, start);
        const after = text.substring(end);

        const newText = before + prefix + selected + suffix + after;
        setContent(newText);

        // Reset focus and selection
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(
                start + prefix.length,
                end + prefix.length
            );
        }, 0);
    };

    return (
        <form action={action} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <input type="hidden" name="id" value={initialData?.id || ''} />

            <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', opacity: 0.7 }}>Thumbnail URL</label>
                <input
                    name="thumbnail_url"
                    type="text"
                    defaultValue={initialData?.thumbnail_url || ''}
                    placeholder="https://images.unsplash.com/..."
                    className="admin-input"
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1.5rem' }}>
                <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', opacity: 0.7 }}>Title</label>
                    <input
                        name="title"
                        type="text"
                        defaultValue={initialData?.title || ''}
                        required
                        className="admin-input"
                    />
                </div>
                <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', opacity: 0.7 }}>Date</label>
                    <input
                        name="date"
                        type="text"
                        defaultValue={initialData?.date || ''}
                        placeholder="Jan 7, 2026"
                        required
                        className="admin-input"
                    />
                </div>
                <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', opacity: 0.7 }}>Slug</label>
                    <input
                        name="slug"
                        type="text"
                        defaultValue={initialData?.slug || ''}
                        placeholder="post-title"
                        required
                        className="admin-input"
                    />
                </div>
            </div>

            <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', opacity: 0.7 }}>Excerpt</label>
                <textarea
                    name="excerpt"
                    rows={2}
                    defaultValue={initialData?.excerpt || ''}
                    required
                    className="admin-input"
                    style={{ resize: 'none' }}
                />
            </div>

            <div className="writing-kit" style={{ border: '1px solid var(--card-border)', borderRadius: '12px', padding: '1rem', backgroundColor: 'rgba(255,255,255,0.01)' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--card-border)' }}>
                    <div style={{ display: 'flex', gap: '0.25rem', borderRight: '1px solid var(--card-border)', paddingRight: '0.5rem' }}>
                        <button type="button" onClick={() => insertText('# ', '')} className="kit-btn">H1</button>
                        <button type="button" onClick={() => insertText('## ', '')} className="kit-btn">H2</button>
                        <button type="button" onClick={() => insertText('### ', '')} className="kit-btn">H3</button>
                    </div>

                    <div style={{ display: 'flex', gap: '0.25rem', borderRight: '1px solid var(--card-border)', paddingRight: '0.5rem' }}>
                        <button type="button" onClick={() => insertText('**', '**')} className="kit-btn" title="Bold">B</button>
                        <button type="button" onClick={() => insertText('_', '_')} className="kit-btn" title="Italic">I</button>
                        <button type="button" onClick={() => insertText('~~', '~~')} className="kit-btn" title="Strikethrough">S</button>
                        <button type="button" onClick={() => insertText('`', '`')} className="kit-btn" title="Inline Code">C</button>
                    </div>

                    <div style={{ display: 'flex', gap: '0.25rem', borderRight: '1px solid var(--card-border)', paddingRight: '0.5rem' }}>
                        <button type="button" onClick={() => insertText('- ', '')} className="kit-btn" title="Bullet List">•</button>
                        <button type="button" onClick={() => insertText('1. ', '')} className="kit-btn" title="Numbered List">1.</button>
                        <button type="button" onClick={() => insertText('- [ ] ', '')} className="kit-btn" title="Task List">☑</button>
                    </div>

                    <div style={{ display: 'flex', gap: '0.25rem', borderRight: '1px solid var(--card-border)', paddingRight: '0.5rem' }}>
                        <button type="button" onClick={() => insertText('> ', '')} className="kit-btn" title="Quote">"</button>
                        <button type="button" onClick={() => insertText('---\n', '')} className="kit-btn" title="Divider">—</button>
                        <button type="button" onClick={() => insertText('```\n', '\n```')} className="kit-btn" title="Code Block">Code</button>
                    </div>

                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                        <button type="button" onClick={() => insertText('| Col | Col |\n|---|---|\n| Val | Val |', '')} className="kit-btn" title="Table">Table</button>
                        <button type="button" onClick={() => insertText('[', '](url)')} className="kit-btn" title="Link">link</button>
                        <button type="button" onClick={() => insertText('(*', '*)')} className="kit-btn" title="Image">img</button>
                    </div>

                    <div style={{ marginLeft: 'auto', fontSize: '0.75rem', opacity: 0.5, alignSelf: 'center' }}>
                        {content.split(/\s+/).filter(Boolean).length} words
                    </div>
                </div>
                <textarea
                    ref={textareaRef}
                    name="content"
                    rows={12}
                    required
                    className="admin-input"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Wake up, samurai. We have a blog to write..."
                    style={{ fontFamily: 'monospace', fontSize: '1rem' }}
                />
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="submit" className="nav-item active" style={{ flex: 1, border: 'none', cursor: 'pointer', textAlign: 'center', padding: '1rem' }}>
                    {initialData?.id ? 'Update Post' : 'Publish Post'}
                </button>
                {initialData?.id && (
                    <a href="/admin/blogs" className="nav-item" style={{ border: '1px solid var(--card-border)', padding: '1rem', textAlign: 'center' }}>
                        Cancel Edit
                    </a>
                )}
            </div>

            <style jsx>{`
                .admin-input {
                    width: 100%;
                    padding: 0.75rem;
                    border-radius: 8px;
                    border: 1px solid var(--card-border);
                    background-color: rgba(255, 255, 255, 0.03);
                    color: white;
                    outline: none;
                }
                .admin-input:focus {
                    border-color: var(--link);
                }
                .kit-btn {
                    background: var(--card-bg);
                    border: 1px solid var(--card-border);
                    color: white;
                    padding: 0.25rem 0.75rem;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 0.8rem;
                    font-weight: bold;
                }
                .kit-btn:hover {
                    border-color: var(--link);
                    background: rgba(128, 128, 128, 0.1);
                }
            `}</style>
        </form>
    );
}
