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
    const thumbnailUrl = formData.get('thumbnail_url');
    const content = formData.get('content') as string;

    if (id) {
        await query(
            'UPDATE blogs SET title = $1, date = $2, slug = $3, excerpt = $4, thumbnail_url = $5, content = $6 WHERE id = $7',
            [title, date, slug, excerpt, thumbnailUrl, content, id]
        );
    } else {
        await query(
            'INSERT INTO blogs (title, date, slug, excerpt, thumbnail_url, content) VALUES ($1, $2, $3, $4, $5, $6)',
            [title, date, slug, excerpt, thumbnailUrl, content]
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

// Project Actions
export async function upsertProject(formData: FormData) {
    const id = formData.get('id');
    const title = formData.get('title');
    const description = formData.get('description');
    const url = formData.get('url');
    const thumbnailUrl = formData.get('thumbnail_url');
    const isArchived = formData.get('is_archived') === 'on';

    if (id) {
        await query(
            'UPDATE projects SET title = $1, description = $2, url = $3, thumbnail_url = $4, is_archived = $5 WHERE id = $6',
            [title, description, url, thumbnailUrl, isArchived, id]
        );
    } else {
        await query(
            'INSERT INTO projects (title, description, url, thumbnail_url, is_archived) VALUES ($1, $2, $3, $4, $5)',
            [title, description, url, thumbnailUrl, isArchived]
        );
    }

    revalidatePath('/projects');
}

export async function deleteProject(id: number) {
    await query('DELETE FROM projects WHERE id = $1', [id]);
    revalidatePath('/projects');
}
