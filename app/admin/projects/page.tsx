import { query } from '../../../lib/db';
import { upsertProject, deleteProject } from '../../actions/content';
import Link from 'next/link';

export default async function AdminProjectsPage({ searchParams }: { searchParams: Promise<{ edit?: string }> }) {
    const params = await searchParams;
    const editId = params.edit;

    const res = await query('SELECT * FROM projects ORDER BY id DESC');
    const projects = res.rows;

    let projectToEdit = null;
    if (editId) {
        const editRes = await query('SELECT * FROM projects WHERE id = $1', [editId]);
        projectToEdit = editRes.rows[0];
    }

    return (
        <div className="container" style={{ paddingBottom: '10rem' }}>
            <header style={{ marginBottom: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
                <div>
                    <h1 className="title-underline" style={{ marginBottom: '1.5rem' }}>Manage Projects</h1>
                    <p className="muted">List your works and deployments.</p>
                </div>
                <Link href="/admin" className="nav-item" style={{ fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', border: '1px solid var(--card-border)', opacity: 0.8 }}>
                    <span style={{ fontSize: '1.2rem' }}>‹</span> dashboard
                </Link>
            </header>

            <section className="card" style={{ padding: '2rem', marginBottom: '3rem' }}>
                <h2 style={{ marginTop: 0, marginBottom: '2rem' }}>
                    {projectToEdit ? 'Edit Project' : 'Add New Project'}
                </h2>
                <form action={upsertProject} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {projectToEdit && <input type="hidden" name="id" value={projectToEdit.id} />}

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>Title</label>
                        <input
                            name="title"
                            defaultValue={projectToEdit?.title}
                            required
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--card-border)', background: 'rgba(255,255,255,0.05)', color: 'inherit' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>Description</label>
                        <textarea
                            name="description"
                            defaultValue={projectToEdit?.description}
                            rows={3}
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--card-border)', background: 'rgba(255,255,255,0.05)', color: 'inherit' }}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>Project URL</label>
                            <input
                                name="url"
                                defaultValue={projectToEdit?.url}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--card-border)', background: 'rgba(255,255,255,0.05)', color: 'inherit' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>Thumbnail URL (optional)</label>
                            <input
                                name="thumbnail_url"
                                defaultValue={projectToEdit?.thumbnail_url}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--card-border)', background: 'rgba(255,255,255,0.05)', color: 'inherit' }}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <input
                            type="checkbox"
                            name="is_archived"
                            id="is_archived"
                            defaultChecked={projectToEdit?.is_archived}
                        />
                        <label htmlFor="is_archived" style={{ fontSize: '0.9rem' }}>Archive this project</label>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <button type="submit" className="nav-item" style={{ background: 'var(--accent)', color: 'white', border: 'none', cursor: 'pointer', padding: '0.75rem 2rem' }}>
                            {projectToEdit ? 'Update Project' : 'Add Project'}
                        </button>
                        {projectToEdit && (
                            <Link href="/admin/projects" className="nav-item" style={{ border: '1px solid var(--card-border)', cursor: 'pointer', padding: '0.75rem 2rem' }}>
                                Cancel
                            </Link>
                        )}
                    </div>
                </form>
            </section>

            <section>
                <h2>Existing Projects</h2>
                <div style={{ display: 'grid', gap: '1rem' }}>
                    {projects.map((project: any) => (
                        <div key={project.id} className="card" style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{project.title}</h3>
                                    <p className="muted" style={{ fontSize: '0.85rem', margin: 0 }}>{project.url}</p>
                                </div>
                                {project.is_archived && <span className="tag">Archived</span>}
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <Link href={`/admin/projects?edit=${project.id}`} style={{ fontSize: '0.85rem', color: 'var(--accent)' }}>
                                    Edit
                                </Link>
                                <form action={async () => {
                                    'use server';
                                    await deleteProject(project.id);
                                }}>
                                    <button type="submit" style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem' }}>
                                        Delete
                                    </button>
                                </form>
                            </div>
                        </div>
                    ))}
                    {projects.length === 0 && <p className="muted">No projects found.</p>}
                </div>
            </section>
        </div>
    );
}
