var express = require("express"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser");

var config = require("../../config")();

var app = express();

var environment = config.env;

// database setup
// mongoose.connect("mongodb://localhost/<appName>")

// middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// api goes here.

// static files
switch (environment) {
    case 'production':
        console.log("**** BUILD ****");
        app.use(express.static(config.build));
        app.use("/*", express.static(config.build + "index.html"));
        break;
    default:
        console.log("**** DEV ****");
        app.use(express.static(config.client));
        app.use(express.static(config.root));
        app.use("/*", express.static(config.index));
        break;
}

app.listen(config.port, function () {
    console.log("Server started, listening on port: " + config.port);
});
