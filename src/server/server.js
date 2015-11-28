var express = require("express"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser");

var app = express();

var environment = process.env.NODE_ENV || "dev";

// database setup
// mongoose.connect("mongodb://localhost/<appName>")


// api goes here.

// static files
switch (environment) {
    case 'production':
        console.log("**** BUILD ****");
        app.use(express.static("./build"));
        app.use("/*", express.static("./build/ndex.html"));
        break;
    default:
        console.log("**** DEV ****");
        var config = require("../../config")();
        // middleware setup
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(express.static(config.client));
        app.use(express.static(config.root));
        app.use("/*", express.static(config.index));
        break;
}

app.listen(config.port, function () {
    console.log("Server started, listening on port: " + config.port);
});
