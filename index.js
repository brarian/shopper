const express = require('express'); 
const app = express(); 
const port = 3000; 
//homepage
app.get(`/`, (req, res)=> {
  res.send(`homepage`); 
})
//user reg
app.get(`/login`, (req, res)=> {

})
//user login

//signout


app.listen(port, ()=> 
  console.log(`app is listening on port ${port}`)
)