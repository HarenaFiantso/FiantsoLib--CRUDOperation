const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  password: 'tsy tadidiko',
  host: 'localhost',
  port: 5432,
  database: 'fiantsolib',
});

module.exports = pool;
