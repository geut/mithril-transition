var fs = require("fs");
var browserify = require("browserify");
var babelify = require("babelify");
var Hapi = require('hapi');
var path = require('path');

browserify("./index.js", {
        debug: true
    })
    .transform(babelify)
    .bundle()
    .on("error", function (err) {
        console.log("Error : " + err.message);
    })
    .pipe(fs.createWriteStream("build.js"));

// Create a server with a host and port
var server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 3010,
    routes: {
        files: {
            relativeTo: __dirname
        }
    }
});

server.register(require('inert'), function (err) {
    if (err) {
       throw err;
    }

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: './',
                index: true
            }
        }
    });

    server.start(function () {
        console.log('Server running at:', server.info.uri);
    });
});
