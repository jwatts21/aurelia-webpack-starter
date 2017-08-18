const express = require('express')
const path = require('path')
const open  = require('open')


/* eslint-disable no-console */

const port = 3000;
const app = express();
// console.log('HERERE!!!')
// console.log(config)



app.use('/',express.static(__dirname + '/dist'));


// app.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname, 'dist/index.html'));
// });

app.get('/users', function(req, res) {
  // Hard coding for simplicity. Pretend this hits a real database
  res.json([
    {"id": 1,"firstName":"Bob","lastName":"Smith","email":"bob@gmail.com"},
    {"id": 2,"firstName":"Tammy","lastName":"Norton","email":"tnorton@yahoo.com"},
    {"id": 3,"firstName":"Tina","lastName":"Lee","email":"lee.tina@hotmail.com"}
  ]);
});

app.listen(port, function(err) {
  if (err) {
    console.log('error!!')
    console.log(err);
  } else {
  console.log('opening');
    open('http://localhost:' + port);
  }
});
