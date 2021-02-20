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


var i = new Date().toUTCString();
var a = "05 October 2011"
var b = "1317772800000"
// If str is date_string => Date.parse(str)
// IF str is sate_unix => parseInt(str)

app.get('/api/timestamp/:date_string', (req, res) => {
  var a = req.params.date_string;
  let regex_date = /^(\d{4})-(\d{2})-(\d{2})/;
  let regex_unix = /\d{4,}/;
  if (regex_date.test(a)) {
    let date_Unix = Date.parse(a);
    let date_UTC = new Date(date_Unix).toUTCString();
    res.json({"unix":date_Unix,"utc":date_UTC})
  }
  if (regex_unix.test(a)) {
    let date_Unix = parseInt(a);
    let date_UTC = new Date(date_Unix).toUTCString();  
    res.json({"unix":date_Unix,"utc":date_UTC})
  }
})

app.listen(process.env.PORT || 8080)
