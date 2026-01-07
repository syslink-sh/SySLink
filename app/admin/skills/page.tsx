export const dynamic = 'force-dynamic';
import { query } from '../../../lib/db';
import { upsertSkill, deleteSkill } from '../../actions/content';
import Link from 'next/link';

export default async function AdminSkillsPage() {
    const res = await query('SELECT * FROM skills ORDER BY name ASC');
    const skills = res.rows;

    return (
        <div className="container">
            <header style={{ marginBottom: '4rem' }}>
                <Link href="/admin" className="nav-item" style={{ fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', border: '1px solid var(--card-border)', opacity: 0.8 }}>
                    <span style={{ fontSize: '1.2rem' }}>‹</span> dashboard
                </Link>
                <h1 className="title-underline" style={{ marginTop: '1rem' }}>Manage Skills</h1>
            </header>

            <section className="card" style={{ padding: '2rem', marginBottom: '3rem' }}>
                <h2 style={{ marginTop: 0 }}>Add New Skill</h2>
                <form action={upsertSkill} style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: '1fr 1fr auto', alignItems: 'end' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', opacity: 0.7 }}>Name</label>
                        <input
                            name="name"
                            type="text"
                            placeholder="e.g. Next.js"
                            required
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: '8px',
                                border: '1px solid var(--card-border)',
                                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                                color: 'white'
                            }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', opacity: 0.7 }}>Level</label>
                        <input
                            name="level"
                            type="text"
                            placeholder="e.g. Expert"
                            required
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: '8px',
                                border: '1px solid var(--card-border)',
                                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                                color: 'white'
                            }}
                        />
                    </div>
                    <button type="submit" className="nav-item active" style={{ border: 'none', cursor: 'pointer', height: 'fit-content' }}>
                        Add Skill
                    </button>
                </form>
            </section>

            <section>
                <h2>Current Skills</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {skills.map((skill) => (
                        <div key={skill.id} className="card" style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <span style={{ fontWeight: 600, marginRight: '1rem' }}>{skill.name}</span>
                                <span className="muted">{skill.level}</span>
                            </div>
                            <form action={async () => {
                                'use server';
                                await deleteSkill(skill.id);
                            }}>
                                <button type="submit" style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem' }}>
                                    Delete
                                </button>
                            </form>
                        </div>
                    ))}
                    {skills.length === 0 && <p className="muted">No skills found.</p>}
                </div>
            </section>
        </div>
    );
}
