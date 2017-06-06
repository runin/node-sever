var http = require('http');
var url = require('url');


var server = http.createServer(function(req, res){
    var query = url.parse(req.url, true).query;
    if(req.url == "/favicon.ico") return;
    console.log(`req.url=${req.url}`);
    console.log(`url.parse=${JSON.stringify(url.parse(req.url))}`);
    console.log(`url.true=${url.parse(req.url, true)}`);

    res.writeHead(200, {'Content-Type': 'text/html;chartset=UTF8'});
    res.end('sucess');
});

server.listen(3000, '127.0.0.1');