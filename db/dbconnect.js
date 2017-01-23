var mongoose = require('mongoose');

(function() {
    module.exports = function(app) {
        mongoose.connect("mongodb://localhost/mean", function(err) {
            if (err) throw err;
            console.log('DB Connection Established...!');
        });

        var db = mongoose.connection;
        mongoose.promise = global.promise;
    }
})()
