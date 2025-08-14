const { Pool } = require('pg');
const { config } = require('dotenv');

config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

const query = (text, params) => {
  return pool.query(text, params);
};

const getClient = async () => {
  const client = await pool.connect();
  return client;
};

module.exports = { query, getClient };