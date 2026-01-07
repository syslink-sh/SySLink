const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

async function down() {
    try {
        await client.connect();
        console.log('Connected to PostgreSQL');

        // Drop Blogs table
        await client.query('DROP TABLE IF EXISTS blogs;');
        console.log('Table "blogs" dropped');

        // Drop Skills table
        await client.query('DROP TABLE IF EXISTS skills;');
        console.log('Table "skills" dropped');

    } catch (err) {
        console.error('Error dropping tables:', err);
    } finally {
        await client.end();
    }
}

down();
