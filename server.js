'use strict'
// server/app.js
var express = require('express');
// const morgan = require('morgan');
// const path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Player = require('./model/player');


var app = express();
var router = express.Router();
// Setup logger
// app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// var mongoDB = 'mongodb://<dbuser>:<dbpassword>@ds151108.mlab.com:51108/heroku_svls88p3';
var mongoDB = 'mongodb://127.0.0.1:27017/reactExpres';
mongoose.connect(mongoDB, { useMongoClient: true })
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



//now we should configure the APi to use bodyParser and look for JSON data in the body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

    //and remove cacheing so we get the most recent comments
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

// Serve static assets
// app.use(express.static(path.resolve(__dirname, '..', 'build', 'index.html')));

// Always return the main index.html, so react-router render the route in the client
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
// });

router.get('/', function(req, res) {
    // console.log("We reached here");
    res.json({ message: 'API Initialized!'});
});

router.route('/player')

    .post(function(req, res) {
        // console.log("We reached here @ POST");
        var player = new Player();
        // console.log("POST", req.body);
        (req.body.name) ? player.name = req.body.name : null;
        (req.body.text) ? player.text = req.body.text : "NA";

        player.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Player successfully added!' });
        });
    })

    .get(function(req, res) {
        //looks at our Comment Schema
        Player.find(function(err, players) {
            if (err)
                res.send(err);
            //responds with a json object of our database comments.
            res.json(players)
        });
    });


app.use('/api', router);

// module.exports = app;

var PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});