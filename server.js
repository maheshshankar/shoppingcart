var express = require("express");
var app = express();
var morgan = require("morgan");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var fs = require("fs");
var port = 3335;

var db = require("./db/dbconnect")(app);
var db = require("./config/config")(app);
var route = require("./routes/route")(app);


app.listen(port, function() {
    console.log('App Started Listening at' + ' ' + port);
});
