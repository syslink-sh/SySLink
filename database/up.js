const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function up() {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL');

    // Create Skills table
    await client.query(`
      CREATE TABLE IF NOT EXISTS skills (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        level TEXT NOT NULL
      );
    `);
    console.log('Table "skills" ensured');

    // Create Blogs table
    await client.query(`
      CREATE TABLE IF NOT EXISTS blogs (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        date TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        excerpt TEXT,
        thumbnail_url TEXT,
        content TEXT
      );
    `);
    console.log('Table "blogs" ensured');

    // Create Sessions table
    await client.query(`
          CREATE TABLE IF NOT EXISTS admin_sessions (
            token TEXT PRIMARY KEY,
            expires_at TIMESTAMP NOT NULL
          );
        `);
    console.log('Table "admin_sessions" ensured');

  } catch (err) {
    console.error('Error creating tables:', err);
  } finally {
    await client.end();
  }
}

up();
