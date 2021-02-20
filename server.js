'use strict';

var fs = require('fs');
var express = require('express');
var app = express();

app.use('/public', express.static(process.cwd() + '/public'));  
app.route('/')
    .get(function(req, res) {
		  res.sendFile(process.cwd() + '/views/index.html');
    })

app.use('/assets',express.static('assets'))

var str = '1451001600000';
var i = new Date().toUTCString();
var t = new Date(1317772800000)
console.log(t.valueOf(t))
console.log(Date.parse("05 October 2011"))
//console.log(i)

app.get('/api/timestamp/:date_string', (req, res) => {
  var a = req.params.date_string
  console.log(a, typeof a)
  //var date = new Date(Date.parse(a))
  //res.json(date)
})

app.listen(process.env.PORT || 8080)
