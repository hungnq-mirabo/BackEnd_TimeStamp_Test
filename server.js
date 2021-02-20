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
var a = new Date(Date.parse("2015-12-25"))
console.log(a)
//console.log(a.valueOf(a))
//console.log(Date.parse())
//console.log(i)

app.get('/api/timestamp/:date_string', (req, res) => {
  var a = req.params.date_string
  var date = new Date(Date.parse(a))
  res.json(date)
})

app.listen(process.env.PORT || 8080)
