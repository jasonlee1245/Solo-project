const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./queries')
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', db.createTable, db.getApps, function(req, res) {
  const index = path.resolve(__dirname, '../index.html')
  res.sendFile(index)
})
app.all('*', (req, res) => {
  res.sendStatus(404);
});

app.use(function (err, req, res, next) {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign(defaultErr, err);
  res.status(errorObj.status).json(errorObj);
})
  
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
  
module.exports = app;
