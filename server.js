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

app.get('/api/timestamp/', (req, res) => {
  let date = new Date()
  res.json({
    unix:date.getTime(),
    utc:date.toUTCString()})
})

// If str is date_string => Date.parse(str)
// IF str is sate_unix => parseInt(str)
// Then convert to UTC format by [new Date().toUTCString();]

app.get('/api/timestamp/:date_string', (req, res) => {
  var date_string = req.params.date_string;
  let regex_unix = /\d{5,}/;
  
  if (parseInt(date_string) > 10000) {
    let date = new Date(parseInt(date_string)); 
    res.json({
      unix:date.getTime(),
      utc:date.toUTCString()
    })
  }
  
  let date = new Date(date_string)
  if (date.toString() == "Invalid Date") {
    res.json({ error : "Invalid Date" })
  } else {
    res.json({
      unix:date.getTime(),
      utc:date.toUTCString()
    })
  }
})

app.listen(process.env.PORT || 8080)
