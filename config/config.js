var express = require('express');

(function() {
    module.exports = function(app) {
        app.use('/', express.static('public/app/views'));
        app.use('/public', express.static('public/app/css'));
        app.use('/js', express.static('public/app'))

        app.use(function(req, res, next) {
            res.setHeader('ACCESS-CONTROL-ALLOW-Origin', '*');
            res.setHeader('ACCESS-CONTROL-ALLOW-Method', 'GET,POST,PUT,DELETE');
            res.setHeader('ACCESS-CONTROL-ALLOW-Headers', 'X-Requested-With,content-type');
            next();
        })
    }
})()
