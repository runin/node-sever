var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');

var server = http.createServer(function(req, res){
    if(req.url == '/favicon.ico') return;
    var pathname = url.parse(req.url).pathname;
    
    /*fs.readdir('./static', function (err, files) {
        var directory = [];
        fs.stat('./static/'+files[0], function (err, stats) {
            aaa = stats.isDirectory();
            console.log('aaa=', aaa);
        });
        console.log(files);

        res.end();
    })*/
    var extname = path.extname(pathname);
    var getFileType = function (extname,callback) {
        fs.readFile('./static/type.json',function (err,data) {
            if(err){
                throw err;
                return;
            }
            callback(JSON.parse(data)[extname]);
        })

    };


    if(pathname == '/'){
        fs.readFile('./static/index.html',function (err, data) {
            if (err) {
                throw err;
                return;
            }
            res.writeHead(200, {'Context-Type': 'text/html'});
            res.end(data);
        });
    }else {
        fs.readFile(`./static/${pathname}`,function (err, data) {
            if (err) {
                fs.readFile('./static/404.html',function (err, data) {
                    if (err) {
                        throw err;
                        return;
                    }
                    res.writeHead(404, {'Context-Type': 'text/html'});
                    res.end(data);
                });
                return;
            }else{
                fs.readFile(`./static/${pathname}`,function (err, data) {
                    if (err) {
                        throw err;
                        return;
                    }
                    getFileType(extname,function (type) {
                        console.log(type);
                        res.writeHead(200, {'Context-Type': type});
                        res.end(data);
                    });

                });
            }
        });
    }
    

});

server.listen(3000, '127.0.0.1');
