export const metadata = {
    title: 'Skills',
    description: 'The technical stack and tools I use to bring ideas to life.',
};

export const dynamic = 'force-dynamic';
import { query } from '../../lib/db';

export default async function SkillsPage() {
    const res = await query('SELECT name, level FROM skills ORDER BY name ASC');
    const skills = res.rows;

    return (
        <div>
            <section>
                <h1 className="title-underline">skills</h1>
                <p className="muted" style={{ marginBottom: '3rem', fontSize: '1.1rem' }}>
                    The following are my skills and the tools I use to build projects.
                </p>

                <div className="grid">
                    {skills.length > 0 ? (
                        skills.map((skill: any, index: number) => (
                            <div key={index} className="card" style={{ padding: '1.5rem' }}>
                                <div style={{ fontWeight: '600', marginBottom: '0.25rem', fontSize: '1rem' }}>
                                    {skill.name}
                                </div>
                                <div className="muted" style={{ fontSize: '0.85rem' }}>
                                    {skill.level}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="muted">No skills found.</p>
                    )}
                </div>
            </section>
        </div>
    );
}
