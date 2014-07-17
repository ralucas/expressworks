var express = require('express');
var path = require('path');
var jade = require('jade');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded());

app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(process.argv[3]||path.join(__dirname, 'public')));
app.set(process.argv[3], path.join(__dirname, 'templates'));

app.set('view engine', 'jade');

app.get('/home', function(req, res) {
    var date = new Date();
    res.render('index',{date: date.toDateString()});
});
   
app.post('/form', function(req, res) {
    var text = req.body.str.split('').reverse().join('');
    res.send(text);
});

app.listen(process.argv[2]);
