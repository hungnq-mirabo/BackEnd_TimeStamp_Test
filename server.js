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
/*  let today = new Date()
  let date_UTC = today.toUTCString();
  let date_Unix = today.valueOf();
  res.json({"unix":date_Unix,"utc":date_UTC}) */
  res.json({ unix: Date.now(), utc: Date() });
})

// If str is date_string => Date.parse(str)
// IF str is sate_unix => parseInt(str)
// Then convert to UTC format by [new Date().toUTCString();]

app.get('/api/timestamp/:date_string', (req, res) => {
  var date_string = req.params.date_string;
  let regex_date = /^(\d{4})-(\d{2})-(\d{2})/;
  let regex_unix = /\d{5,}/;
  
  if (regex_unix.test(date_string)) {
    let date_Unix = parseInt(date_string);
    let date_UTC = new Date(date_Unix).toUTCString();  
    res.json({"unix":date_Unix,"utc":date_UTC})
  } 
  else {
    let date = new Date(date_string)
    console.log(date.toString() === "Invalid Date")
    if (date.toString() !== "Invalid Date") {
      let date_Unix = date.valueOf();
      let date_UTC = date.toUTCString();
      res.json({"unix":date_Unix,"utc":date_UTC})
    }
    else {
      res.json({ error : "Invalid Date" })
    }
  }
})

app.listen(process.env.PORT || 8080)
