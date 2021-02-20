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
var a = new Date(1451001600000)
console.log(a)
console.log(a.valueOf(a))
console.log(Date.parse(a))
console.log(i)

app.get('/api/timestamp/', (req, res) => {
  res.json(req.timestamp)
})

app.listen(process.env.PORT || 8080)
