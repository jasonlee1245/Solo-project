const Pool = require('pg').Pool
const connectionString = 'postgres://renuaagz:2jmP4rxS6ER3rmCYaigm4hxf-xySPcE7@salt.db.elephantsql.com:5432/renuaagz'
const pool = new Pool({
  connectionString: connectionString
})

const createTable = (request, response, next) => {
  const table = "CREATE TABLE IF NOT EXISTS applications (_id SERIAL PRIMARY KEY, company VARCHAR, email VARCHAR,application DATE, firstemail DATE, secondemail DATE, nextinterview DATE, interviewcount VARCHAR)";
  pool.query(table, (err, result) => {
    if (err) throw err;
    next();
  });
}

const getApps = (req, res, next) => {
  pool.query('SELECT * FROM applications ORDER BY _id ASC', (err, results) => {
    if(err) next({err});
    res.body = results.rows;
    next();
  })
}

const newApp = (req, res, next) => {
  if(!req.body) next({log: 'req.body not found', message: {err: 'error in newApp'}})
  const {company} = req.body;
  pool.query('INSERT INTO applications (company) VALUES ($1)', [company], (err, results) => {
    if(err) next({err});
    return next();
  })
}

const updateApp = (req, res, next) => {
  for(let i = 0; i < req.body.length; i++) {
    console.log(req.body[i])
    const {_id, company, email, application, firstemail, secondemail, nextinterview, interviewcount} = req.body[i];
    pool.query(`UPDATE applications SET company = $1, email = $2, application = $3, firstemail = $4, secondemail = $5, nextinterview = $6, interviewcount = $7 WHERE _id = $8`, [company, email, application, firstemail, secondemail, nextinterview, interviewcount, _id], (err, results) => {
      if(err) next({err});
    })
  }
  next();
}

const deleteApp = (req, res, next) => {
  const id = req.params._id;
  pool.query('DELETE FROM applications WHERE _id = $1', [id], (err, results) => {
    if(err) next({err});
    next();
  })
}

module.exports = {
  createTable,
  getApps,
  newApp,
  updateApp,
  deleteApp
}