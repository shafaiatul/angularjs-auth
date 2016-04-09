var express = require('express');
var app = express();
var jwt = require('express-jwt');
var cors = require('cors');

app.use(cors());

var authCheck = jwt({
    secret: new Buffer('TU-LFTwFRFPfzKRgUvIUcGt9K8KktdduANy07yXb0kYWZefzqMJtoZ2FG9Kujxio', 'base64'),
    audience: 'yyHwCjUyKxjqi58SeXHJaVb6eHVNqwp9'
});

app.get('/api/public', function(req, res) {
    res.json({message: "Hello from a public Endpoint you dont need to be authenticated."});
});

app.get('/api/private', authCheck, function(req, res) {
    res.json({message: "Hello from a private Endpoint you DO need to be authenticated."});
});

app.listen(3001);

console.log('Listen on http://localhost:3001');
