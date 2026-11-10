const mysql = require('mysql2/promise');
require('dotenv').config();

/**
 * Pool de conexiones a MySQL.
 * Crea las conexiones de forma perezosa (lazy) y las reutiliza.
 */
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'cine_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
