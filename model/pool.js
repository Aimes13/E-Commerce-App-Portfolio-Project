const Pool = require('pg').Pool;
const dotenv = require('dotenv');
dotenv.config({ path: '../.env'});

const pool = new Pool({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
});

pool.connect((error) => {
    if(error) {
        console.log(error)
    } else {
        console.log("My database connected!")
    }
});

module.exports = pool;