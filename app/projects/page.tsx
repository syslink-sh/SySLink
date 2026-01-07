import ProjectCard from '../../components/ProjectCard';
import { query } from '../../lib/db';

export const metadata = {
    title: 'Projects',
    description: 'A collection of my work and open-source contributions.',
};

export default async function ProjectsPage() {
    const res = await query('SELECT * FROM projects ORDER BY is_archived ASC, id DESC');
    const projects = res.rows;

    const activeProjects = projects.filter(p => !p.is_archived);
    const archivedProjects = projects.filter(p => p.is_archived);

    return (
        <div>
            <section>
                <h1 className="title-underline">projects</h1>
                <p className="muted" style={{ marginBottom: '3rem', fontSize: '1.1rem' }}>
                    A collection of my work, ranging from small utilities to full-scale applications.
                </p>

                {activeProjects.length > 0 ? (
                    <div className="grid">
                        {activeProjects.map(project => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                ) : (
                    <p className="muted">No active projects found.</p>
                )}

                {archivedProjects.length > 0 && (
                    <div style={{ marginTop: '5rem' }}>
                        <h2 style={{ fontSize: '1.25rem', opacity: 0.7, marginBottom: '2rem' }}>archived</h2>
                        <div className="grid" style={{ opacity: 0.8 }}>
                            {archivedProjects.map(project => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
}
