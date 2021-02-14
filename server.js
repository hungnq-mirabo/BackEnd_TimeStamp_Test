'use strict';

var fs = require('fs');
var express = require('express');
var app = express();

app.use('/public', express.static(process.cwd() + '/public'));  
app.route('/')
    .get(function(req, res) {
		  res.sendFile(process.cwd() + '/views/index.html');
    })

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

app.listen(process.env.PORT || 8080)
