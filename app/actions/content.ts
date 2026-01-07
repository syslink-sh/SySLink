'use server';

import { query } from '@/lib/db';
import { revalidatePath } from 'next/cache';

// Skills Actions
export async function upsertSkill(formData: FormData) {
    const id = formData.get('id');
    const name = formData.get('name');
    const level = formData.get('level');

    if (id) {
        await query('UPDATE skills SET name = $1, level = $2 WHERE id = $3', [name, level, id]);
    } else {
        await query('INSERT INTO skills (name, level) VALUES ($1, $2)', [name, level]);
    }

    revalidatePath('/skills');
    revalidatePath('/admin/skills');
}

export async function deleteSkill(id: number) {
    await query('DELETE FROM skills WHERE id = $1', [id]);
    revalidatePath('/skills');
    revalidatePath('/admin/skills');
}

// Blog Actions
export async function upsertBlog(formData: FormData) {
    const id = formData.get('id');
    const title = formData.get('title');
    const date = formData.get('date');
    const slug = formData.get('slug');
    const excerpt = formData.get('excerpt');
    const contentStr = formData.get('content') as string;
    const content = contentStr.split('\n').filter(p => p.trim() !== '');

    if (id) {
        await query(
            'UPDATE blogs SET title = $1, date = $2, slug = $3, excerpt = $4, content = $5 WHERE id = $6',
            [title, date, slug, excerpt, content, id]
        );
    } else {
        await query(
            'INSERT INTO blogs (title, date, slug, excerpt, content) VALUES ($1, $2, $3, $4, $5)',
            [title, date, slug, excerpt, content]
        );
    }

    revalidatePath('/blog');
    revalidatePath(`/blog/${slug}`);
    revalidatePath('/admin/blogs');
}

export async function deleteBlog(id: number) {
    await query('DELETE FROM blogs WHERE id = $1', [id]);
    revalidatePath('/blog');
    revalidatePath('/admin/blogs');
}
