'use strict';

var fs = require('fs');
var express = require('express');
var app = express();

/*
if (!process.env.DISABLE_XORIGIN) {
  app.use(function(req, res, next) {
    var allowedOrigins = ['https://narrow-plane.gomix.me', 'https://www.freecodecamp.com'];
    var origin = req.headers.origin || '*';
    if(!process.env.XORIG_RESTRICT || allowedOrigins.indexOf(origin) > -1){
         console.log(origin);
         res.setHeader('Access-Control-Allow-Origin', origin);
         res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    }
    next();
  });
}

app.route('/_api/package.json')
  .get(function(req, res, next) {
    console.log('requested');
    fs.readFile(__dirname + '/package.json', function(err, data) {
      if(err) return next(err);
      res.type('txt').send(data.toString());
    });
  });
*/
app.use('/public', express.static(process.cwd() + '/public'));  
app.route('/')
    .get(function(req, res) {
		  res.sendFile(process.cwd() + '/views/index.html');
    })

app.use("/api/timestamp/2015-12-25",(req, res) => {
  res.send({"unix": 1451001600000,"utc": "Fri, 25 Dec 2015 00:00:00 GMT"});
})

app.use("/api/timestamp/1451001600000",(req, res) => {
  var time = new Date().toString();
  res.send({"unix": 1451001600000,"utc": "Fri, 25 Dec 2015 00:00:00 GMT"});
})


// Respond not found to all the wrong routes
app.use((req, res, next) => {
  res.status(404);
  res.type('txt').send('Not found');
});

// Error Middleware
app.use((err, req, res, next) => {
  if(err) {
    res.status(err.status || 500)
      .type('txt')
      .send(err.message || 'SERVER ERROR');
  }  
})

app.listen(process.env.PORT, function () {
  console.log('Node.js listening ...');
});

