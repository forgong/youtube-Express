var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var compression = require('compression');
var topicRouter = require('./routes/topic.js');
var indexRouter = require('./routes/index.js');
var helmet = require('helmet');

// var path = require('path');
// var sanitizeHtml = require('sanitize-html');
// var qs = require('querystring');
// var template = require('./lib/template.js');
app.use(helmet());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended : false}));
app.use(compression());

app.get('*', function (req, res, next){
  fs.readdir('./data', function (err,filelist){
    req.list = filelist;
    next();
  })
})

app.use('/', indexRouter);
app.use('/topic', topicRouter);

// app.get('/', (req, res) => res.send('Hello World'));

app.use(function(req, res, next){
  res.status(404).send('Sorry cant find that!');
})

app.use(function (err, req, res, next){
  console.log(err.stack);
  res.status(500).send('Something broke!');
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});



/*
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var path = require('path');
var sanitizeHtml = require('sanitize-html');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if(pathname === '/'){
      
      } else {
       
      }
    } else if(pathname === '/create'){
      
    } else if(pathname === '/create_process'){
      
    } else if(pathname === '/update'){
      
    } else if(pathname === '/update_process'){
      
    } else if(pathname === '/delete_process'){
      
    } else {
      response.writeHead(404);
      response.end('Not found');
    }
});
app.listen(3000);
*/