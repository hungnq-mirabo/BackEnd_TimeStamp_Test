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
var a = "05 October 2011"
var b = "1317772800000"
b = parseInt(b)
var t = new Date(b)
console.log(t)
//console.log(t.valueOf(t))
//console.log(Date.parse("05 October 2011"))
//console.log(i)

app.get('/api/timestamp/:date_string', (req, res) => {
  var a = req.params.date_string;
  let regex_date = /^(\d{4})-(\d{2})-()/;
  let regex_unix = /\d{4,}/;
  let unix = "dsdf";
  console.log(a, typeof a)
  //var date = new Date(Date.parse(a))
  //res.json(date)
})

app.listen(process.env.PORT || 8080)
