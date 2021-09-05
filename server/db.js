// requires pg library
const Pool = require('pg').Pool;

// connection to database, Pool is just an open set of database connections
const pool = new Pool({
    user: 'postgres',
    password: 'password',
    host: 'localhost',
    port: 5432,
    database: 'perntodo'
});

// exports pool
module.exports = pool;