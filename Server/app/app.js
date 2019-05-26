var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mysql = require("mysql");
var MongoClient = require('mongodb').MongoClient;
var Client = require('node-rest-client').Client;
var client = new Client();

/*app.set('views', './views');
app.set('view engine', 'pug');*/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/visualizza', function (req, res) {
    var args = {};
    client.get("https://3000-df7cac6b-cc76-41e1-a520-ee0ac7652c80.ws-eu0.gitpod.io/Visualizza", args, function (data, ress) {
        res.send({Mezzi: data});
    });
});


app.post('/segnala', function (req, res) {
    var args = {
        data: {
            ID: req.body.Scooter,
            desc: req.body.tipo
            },
        headers: { "Content-Type": "application/json" }
    };
    console.log(req.body);
    client.post("https://3000-df7cac6b-cc76-41e1-a520-ee0ac7652c80.ws-eu0.gitpod.io/Segnala", args, function (data, ress) {
        console.log(data);
        if (data.n == 1){
            res.send([{message: 'OK'}]);
        }else{
            res.send([{message: 'KO'}]);
        }
    });
});

app.post('/takeOn', function (req, res) {
    var args = {
        data: {
            IdMezzo: parseInt(req.query.Scooter),
            },
        headers: { "Content-Type": "application/json" }
    };
    client.post("https://3000-df7cac6b-cc76-41e1-a520-ee0ac7652c80.ws-eu0.gitpod.io/TakeOn", args, function (data, ress) {
        console.log(data);
        if (data.n == 1)
            res.send([{message: 'OK'}]);
        else
            res.send([{message: 'KO'}]);
    });
});

app.post('/takeOff', function (req, res) {
    var args = {
        data: {
            IdMezzo: parseInt(req.query.Scooter),
            },
        headers: { "Content-Type": "application/json" }
    };
    client.post("https://3000-df7cac6b-cc76-41e1-a520-ee0ac7652c80.ws-eu0.gitpod.io/TakeOff", args, function (data, ress) {
        console.log(data);
        if (data.n == 1)
            res.send([{message: 'OK'}]);
        else
            res.send([{message: 'KO'}]);
    });
});