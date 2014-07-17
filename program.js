var express = require('express');
var path = require('path');
var jade = require('jade');
var app = express();

app.set(process.argv[3], path.join(__dirname, 'templates'));

app.set('view engine', 'jade');


app.get('/home', function(req, res) {
    var date = new Date();
    res.render('index',{date: date.toDateString()});
});
   
app.listen(process.argv[2]);
