const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

async function setupDatabase() {
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    password: process.env.DB_PASSWORD || 'password',
    port: 5432,
  });

  try {
    await client.connect();
    console.log('Connected to PostgreSQL server');

    try {
      await client.query('CREATE DATABASE donor_management');
      console.log('Database "donor_management" created');
    } catch (err) {
      if (err.code === '42P04') {
        console.log('Database "donor_management" already exists');
      } else {
        throw err;
      }
    }

    await client.end();

    const dbClient = new Client({
      user: 'postgres',
      host: 'localhost',
      database: 'donor_management',
      password: process.env.DB_PASSWORD || 'password',
      port: 5432,
    });

    await dbClient.connect();
    console.log('Connected to donor_management database');

    const migrationPath = path.join(__dirname, '../../database/migrations/init.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
    
    await dbClient.query(migrationSQL);
    console.log('Migration executed successfully');

    await dbClient.end();
    console.log('Database setup complete!');

  } catch (err) {
    console.error('Database setup failed:', err.message);
    process.exit(1);
  }
}

setupDatabase();