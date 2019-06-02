const express = require("express");
const app = express();
const http = require("http").createServer(app);
const pg = require("pg");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

//const db_connection = "postgres://main:main_pass@5432/userlogin";
const config = {
  user: "main", //this is the db user credential
  database: "School",
  password: "mainpass",
  port: 5432,
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000
};

const pool = new pg.Pool(config);

app.get(`/`, (req, res) => {
  res.sendFile("login.html", { root: __dirname });
});

app.get(`/signup`, (req, res) => {
  res.sendFile("signup.html", { root: __dirname });
});

app.get("/loginsuccess", (req, res) => {
  res.sendFile("login_sucess.html", { root: __dirname });
});

app.post("/signup", urlencodedParser, (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  pool.on('connect', () => {
    console.log('connected to the Database');
  });

  pool.connect(pool, (error, pool, done)=> {
    if (error){
      return next(error)
    }
    pool.query('INSERT INTO userlogin(username, email, password) VALUES ($1, $2, $3)', [username, email, password], (error, result)=> {
      done(); 
      if (error){
        console.log(error)
      }
    })
  })

});

http.listen(8000, ()=> {
  console.log("listening on port 8000")
})