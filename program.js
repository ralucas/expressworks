var express = require('express');
var path = require('path');
var jade = require('jade');
var bodyParser = require('body-parser');
var fs = require('fs');
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

app.put('/message/:id', function(req, res) {
    var id = req.params.id;
    var response = require('crypto')
        .createHash('sha1')
        .update(new Date().toDateString() + id)
        .digest('hex');

    res.send(response);
});

app.get('/search', function(req, res) {
    var results = req.query.results;
    var type = req.query.type;
    var page = req.query.page;

    res.json(200, {
        results: results,
        type: type,
        page: page
    });
});

app.get('/books', function(req, res) {
    var output = {};
    fs.readFile(process.argv[3], function(err, data) {
        if (err) console.error(err, err.stack);
        output = JSON.parse(data);
        res.json(200, output);
    });
});

app.listen(process.argv[2]);
