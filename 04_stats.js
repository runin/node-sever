var http = require('http');
var url = require('url');
var fs = require('fs');

var server = http.createServer(function(req, res){
    var pathname = url.parse(req.url).pathname;
    if(pathname === '/favicon.ico') return;
    console.log(pathname);
    if(pathname == '/'){
        fs.readFile('./static/index.html', function(err, data){
            res.writeHead(200, {'Content-Type': 'text/html;chartset=UTF8'});
            res.end(data);
        })
    }else{
        fs.readFile('./static/'+pathname, function(err, data){
            if(err) {
                fs.readFile('./static/404.html', function(err, data){
                    res.writeHead(404, {'Content-Type': 'text/html;chartset=UTF8'});
                    res.end(data);
                })
            }else{
                res.writeHead(200, {'Content-Type': 'text/html;chartset=UTF8'});
                res.end(data);
            }
        });
    }
});

server.listen(3000, '127.0.0.1');