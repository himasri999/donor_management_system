const { Client } = require('pg');
require('dotenv').config();

async function testConnection() {
  const client = new Client({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'donor_management',
    password: process.env.DB_PASSWORD || 'password',
    port: process.env.DB_PORT || 5432,
  });

  try {
    await client.connect();
    console.log('✅ Database connection successful!');
    
    const result = await client.query('SELECT NOW()');
    console.log('Current time:', result.rows[0].now);
    
    const tables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    console.log('Tables:', tables.rows.map(row => row.table_name));
    
    await client.end();
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
    console.error('Check your .env file and PostgreSQL service');
  }
}

testConnection();