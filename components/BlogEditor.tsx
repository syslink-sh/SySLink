'use client';

import { useState, useRef } from 'react';

interface BlogEditorProps {
    action: (formData: FormData) => Promise<void>;
}

export default function BlogEditor({ action }: BlogEditorProps) {
    const [content, setContent] = useState('');
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
            <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', opacity: 0.7 }}>Thumbnail URL</label>
                <input
                    name="thumbnail_url"
                    type="text"
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
                        required
                        className="admin-input"
                    />
                </div>
                <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', opacity: 0.7 }}>Date</label>
                    <input
                        name="date"
                        type="text"
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
                    required
                    className="admin-input"
                    style={{ resize: 'none' }}
                />
            </div>

            <div className="writing-kit">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <button type="button" onClick={() => insertText('**', '**')} className="kit-btn" title="Bold">B</button>
                    <button type="button" onClick={() => insertText('_', '_')} className="kit-btn" title="Italic">I</button>
                    <button type="button" onClick={() => insertText('### ', '')} className="kit-btn" title="Heading 3">H3</button>
                    <button type="button" onClick={() => insertText('- ', '')} className="kit-btn" title="Bullet List">• list</button>
                    <button type="button" onClick={() => insertText('> ', '')} className="kit-btn" title="Quote">" quote</button>
                    <button type="button" onClick={() => insertText('---\n', '')} className="kit-btn" title="Divider">— hr</button>
                    <button type="button" onClick={() => insertText('[', '](url)')} className="kit-btn" title="Link">link</button>
                    <button type="button" onClick={() => insertText('(*', '*)')} className="kit-btn" title="Image">img</button>
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

            <button type="submit" className="nav-item active" style={{ border: 'none', cursor: 'pointer', textAlign: 'center', padding: '1rem' }}>
                Publish Post
            </button>

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
