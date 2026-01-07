import ProjectCard from '@/components/ProjectCard';

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

async function getRepos(): Promise<Repo[]> {
    const username = process.env.GITHUB_USERNAME || 'syslink-sh';
    const token = process.env.GITHUB_TOKEN;

    try {
        const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, {
            headers: token ? { Authorization: `token ${token}` } : {},
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (!res.ok) {
            console.error('Failed to fetch repos:', res.statusText);
            return [];
        }

        return res.json();
    } catch (error) {
        console.error('Error fetching repos:', error);
        return [];
    }
}

export default async function ProjectsPage() {
    const repos = await getRepos();

    const currentRepos = repos.filter(repo => !repo.archived && !repo.name.startsWith('.'));
    const archivedRepos = repos.filter(repo => repo.archived);

    return (
        <div>
            <section>
                <h1 className="title-underline">projects</h1>

                <h2>current</h2>
                {currentRepos.length > 0 ? (
                    <div className="grid">
                        {currentRepos.map(repo => (
                            <ProjectCard key={repo.id} repo={repo} isActive={true} />
                        ))}
                    </div>
                ) : (
                    <p className="muted">No projects found.</p>
                )}

                {archivedRepos.length > 0 && (
                    <>
                        <h2>archived</h2>
                        <div className="grid">
                            {archivedRepos.map(repo => (
                                <ProjectCard key={repo.id} repo={repo} isActive={false} />
                            ))}
                        </div>
                    </>
                )}
            </section>
        </div>
    );
}
