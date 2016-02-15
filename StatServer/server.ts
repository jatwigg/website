import http = require('http');
var ps = require('ps-nodejs');
var port = process.env.port || 1337
http.createServer(function (req, res) {

    // A simple pid lookup
    ps.lookup({
        command: '',
        arguments: '',
    }, function (err, resultList) {
        if (err) {
            resultList = { "error": "there was a problem" };
            //throw new Error(err);
        }

        //resultList.forEach(function (process) {
        //    if (process) {

        //        console.log('PID: %s, COMMAND: %s, ARGUMENTS: %s', process.pid, process.command, process.arguments);
        //    }
        //});
        res.writeHead(200, { 'Content-Type': 'text/json' });
        res.end(JSON.stringify(resultList));
    });
    //var response =
    //    {
    //        hello: 'world'
    //    };
    //res.end(JSON.stringify(response));
}).listen(port);