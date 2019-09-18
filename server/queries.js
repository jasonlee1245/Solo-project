const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'solo',
  password: 'password',
  port: 5432,
})

const createTable = (request, response, next) => {
  const table = "CREATE TABLE IF NOT EXISTS applications (_id SERIAL PRIMARY KEY, company VARCHAR, email VARCHAR,application TIMESTAMP, firstEmail TIMESTAMP, secondEmail TIMESTAMP, nextInterview TIMESTAMP, interviewCount INTEGER)";
  pool.query(table, (err, result) => {
    if (err) throw err;
    console.log(result)
    console.log("Table created");
    next();
  });
}

const getApps = (request, response, next) => {
  pool.query('SELECT * FROM applications ORDER BY _id ASC', (err, results) => {
    if(err) next({err});
    response.body = results;
    pool.end();
    next();
  })
}

const newApp = (request, response, next) => {
  const {company} = request.body;
  pool.query('INSERT INTO applications (company) VALUES ($1)', [company], (err, results) => {
    if(err) next({err});
    response.body = results;
  })
}



module.exports = {
  createTable,
  getApps,
  newApp,
}