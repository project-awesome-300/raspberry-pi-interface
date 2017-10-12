var express = require('express');
var path = require('path');
var app = express();
const cors = require('cors')

const corsOptions = {
    origin: 'http://localhost:4200'
}

app.use(cors(corsOptions))

app.set('port', 3000);
app.set('view engine', 'jade');
var moduleName;

app.get('/', function(req, res){
    console.log('GET /')
    var html = '<html><body><form method="post" action="http://localhost:3000">Name: <input type="text" name="name" /><input type="submit" value="Submit" /></form></body>';
    // var html = fs.readFileSync('index.html');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
    });
    
    app.post('/', function(req, res){
    console.log('POST /');
    console.log(req.body);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('thanks');
    });
    

app.listen(app.get('port'));
console.log('Express server listening on port ' + app.get('port'));




