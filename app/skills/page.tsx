export const dynamic = 'force-dynamic';
import { query } from '@/lib/db';

export default async function SkillsPage() {
    const res = await query('SELECT name, level FROM skills ORDER BY name ASC');
    const skills = res.rows;

    return (
        <div>
            <section>
                <h1 className="title-underline">skills</h1>
                <h2 style={{ marginTop: '0', opacity: 0.8 }}>The following are my skills:</h2>

                <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', marginTop: '2.5rem' }}>
                    {skills.length > 0 ? (
                        skills.map((skill, index) => (
                            <div key={index} className="card" style={{ padding: '1.25rem' }}>
                                <div style={{ fontWeight: '700', color: 'var(--link)', marginBottom: '0.25rem', fontSize: '1.1rem' }}>
                                    {skill.name}
                                </div>
                                <div className="muted" style={{ fontSize: '0.85rem', fontWeight: '500' }}>
                                    {skill.level}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="muted">No Skills</p>
                    )}
                </div>
            </section>
        </div>
    );
}
