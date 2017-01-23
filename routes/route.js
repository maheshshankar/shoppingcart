var express = require('express');
var bodyParser = require('body-parser');
var apiRouter = express.Router();
var User = require("../api/models/user-model");
var jwt = require("jsonwebtoken");
var secretKey = 'nodeProject';

(function() {
    module.exports = function(app) {
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());

        apiRouter.route('/')
            .get(function(req, res) {
                //console.log("__dirname",__dirname);
                res.sendFile(__dirname + '/index.html');
            });

        apiRouter.route('/login')
            .post(function(req, res) {
                //console.log(req.body);
                var username = req.body.username;
                //console.log(username);
                User.findOne({ username: username }, function(err, user) {
                    if (err) throw err.message;
                    //res.json({one:user});
                    if (!user) {
                        res.json({ status: false, msg: "Invalid User" });
                    } else {
                        //res.json({status:true,msg:"User Exist"});
                        var Check = user.comparePassword(req.body.password);
                        if (!Check) {
                            res.json({ status: false, msg: "Invalid Credentials" });
                        } else {
                            var token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '1d' });
                            res.json({ msg: "Success", token: token });
                        }
                    }
                });
            });

        apiRouter.route('/')
            .post(function(req, res) {
                //console.log(req.body);
                var user = new User();
                user.name = req.body.name;
                user.username = req.body.username;
                user.password = req.body.password;
                user.save(function(err) {
                    if (err) throw err.message;
                    res.json({ msg: 'User Saved' });
                });
            });

        apiRouter.route('/all')
            .get(function(req, res) {
                //res.send('In Api');
                User.find(function(err, docs) {
                    if (err) throw err.message;
                    res.json({ records: docs });
                });
            });

        apiRouter.route("/user/:user_id")
            .get(function(req, res) {
                var userId = req.params.user_id;
                User.findById({ _id: userId }, function(err, doc) {
                    if (err) throw err.message;
                    res.json({ record: doc });
                });
            });

        apiRouter.route("/user/:user_id")
            .put(function(req, res) {
                var userId = req.params.user_id;
                User.findById({ _id: userId }, function(err, doc) {
                    if (err) throw err.message;
                    if (req.body.name) doc.name = req.body.name;
                    if (req.body.username) doc.username = req.body.username;
                    if (req.body.password) doc.password = req.body.password;
                    doc.save(function(err) {
                        if (err) throw err.message;
                        res.json({ msg: 'User Updated' });
                    });
                });
            });

        apiRouter.route("/user/:user_id")
            .delete(function(req, res) {
                var userId = req.params.user_id;
                User.remove({ _id: userId }, function(err) {
                    if (err) throw err.message;
                    res.json({ msg: "user Removed...!" });
                });
            });
        app.use('/api', apiRouter);

    }
})()
