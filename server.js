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

var express=require("express");
var path=require("path")
var app = express()
const MonthChoice=['January','February','Month','April','May','June','July','August','September','October','November','December']
app.use('/assets',express.static('assets'))


app.get('/:parsed', function (req, res) {
  
  if (isNaN(req.params.parsed)) {
    const time=new Date(req.params.parsed)
    if (typeof time=='number') {
      res.json({
        unix: time/1000,
        natural:MonthChoice[time.getMonth()]+' '+time.getDate()+', '+time.getFullYear()
    })
    } else {
      res.json({
        unix: null,
        time: null
      })
    }
  } else {
    const d = new Date(req.params.parsed*1000)
    res.json({
      unix: req.params.parsed,
      natural: MonthChoice[d.getMonth()]+' '+d.getDate()+', '+d.getFullYear()
    })
  }
  console.log(req.url)
})

app.get('/',function(req,res) {
    console.log(req.url)
    res.sendFile(path.join(__dirname+'/index.html'))
    
})

app.listen(process.env.PORT || 8080)
