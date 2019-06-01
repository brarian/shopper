const pg = require('pg');

const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const pool = new pg.Pool()

//homepage
app.get(`/`, (req, res) => {
  res.send(`welsome to our school API`);
});

app.get(`/student`, (req, res) => {
  pool.connect((err, client, done) => {
    const query = `SELECT * FROM students`;
    client.query(query, (error, result) => {
      done();
      if (error) {
        res.status(400).json({ error });
      }
      if (res.rows < "1") {
        res.status(404).send({
          status: "failed",
          message: "No student information found"
        });
      }
    });
  });
});
//user reg

//user login

//signout

app.listen(port, () => console.log(`app is listening on port ${port}`));
