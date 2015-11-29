var express = require("express"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser");

var app = express();

var port = process.env.PORT || 8000;
var environment = process.env.NODE_ENV || "dev";

// database setup
// mongoose.connect("mongodb://localhost/<appName>")

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
        app.use(express.static("./src/client/"));
        app.use(express.static("./"));
        app.use("/*", express.static("./src/client/index.html"));
        break;
}

app.listen(port, function() {
    console.log("Server started, listening on port: " + port);
});
