'use client';

interface Project {
    id: number;
    title: string;
    description: string;
    url: string;
    thumbnail_url?: string;
    is_archived: boolean;
}

export default function ProjectCard({ project }: { project: Project }) {
    return (
        <div className="card" style={{ padding: '1.5rem' }}>
            {project.thumbnail_url && (
                <div className="card-image" style={{ marginBottom: '1rem', borderRadius: '8px', overflow: 'hidden' }}>
                    <img
                        src={project.thumbnail_url}
                        alt={project.title}
                        style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                </div>
            )}
            <div className="card-content" style={{ padding: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                    <h3 style={{ margin: 0 }}>
                        <a href={project.url} target="_blank" rel="noopener noreferrer">
                            {project.title} ↗
                        </a>
                    </h3>
                    {project.is_archived && (
                        <span style={{ fontSize: '0.7rem', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>archived</span>
                    )}
                </div>
                <p className="muted" style={{ fontSize: '0.95rem', marginBottom: '1rem' }}>
                    {project.description || 'No description available.'}
                </p>
                <div style={{ fontSize: '0.85rem' }}>
                    <a href={project.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>
                        Visit Project ↗
                    </a>
                </div>
            </div>
        </div>
    );
}
