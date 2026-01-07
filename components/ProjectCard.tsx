'use client';

interface Repo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    homepage: string;
    archived: boolean;
    stargazers_count: number;
    topics: string[];
}

export default function ProjectCard({ repo, isActive }: { repo: Repo; isActive: boolean }) {
    const getThumbnail = (name: string) => {
        const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'syslink-sh';
        return `https://opengraph.githubassets.com/1/${username}/${name}`;
    };

    return (
        <div className="card">
            <div className="card-image" style={{ backgroundColor: '#0a0a0a' }}>
                <img
                    src={getThumbnail(repo.name)}
                    alt={`${repo.name} preview`}
                    loading="lazy"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null; // Prevent infinite loop
                        target.src = `https://placehold.co/600x400/0a0a0a/38bdf8?text=${encodeURIComponent(repo.name)}`;
                    }}
                />
                {!isActive && (
                    <span className="project-tag"
                        style={{ backgroundColor: '#444', position: 'absolute', bottom: '10px', right: '10px', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                        archived
                    </span>
                )}
            </div>
            <div className="card-content">
                <h3 style={{ marginBottom: '0.5rem' }}>
                    <a href={repo.homepage || repo.html_url} target="_blank" rel="noopener noreferrer">
                        {repo.name} {repo.homepage ? '↗' : ''}
                    </a>
                </h3>
                <p className="muted" style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
                    {repo.description || 'No description available yet.'}
                </p>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem' }}>
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="muted">
                        GitHub ↗
                    </a>
                    {repo.stargazers_count > 0 && (
                        <span className="muted">★ {repo.stargazers_count}</span>
                    )}
                </div>
            </div>
        </div>
    );
}
