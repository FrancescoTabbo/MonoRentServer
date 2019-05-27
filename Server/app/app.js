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

app.post('/login', function(req, res){
    console.log("uno");
    console.log(req.body);
    var conn = mysql.createConnection({
        host: "remotemysql.com",
        user: "JPQ7c5oklq",
        password: "g4JgzatqTc",
        database: "JPQ7c5oklq"
    });
    var nickname = req.body.nickname;
    var password = req.body.password;

    conn.connect(function(err) {
        console.log("due");
        if (err) throw err;
        console.log("Connected!");
        conn.query("SELECT * FROM User WHERE user = '" + nickname + "' AND password ='" + password + "'" ,function(errr, fields){
            if (errr) throw errr;
            console.log("tre");
            res.send(fields);
        });
    });
});

app.post('/register', function(req, res){
    console.log("uno");
    console.log(req.body);
    var conn = mysql.createConnection({
        host: "remotemysql.com",
        user: "JPQ7c5oklq",
        password: "g4JgzatqTc",
        database: "JPQ7c5oklq"
    });
    var nickname = req.body.nickname;
    var password = req.body.password;
    var nome =req.body.name;
    var cognome =req.body.cognome;
    var email =req.body.email;
    var indirizzo =req.body.indirizzo;
    var telefono =req.body.telefono;

    conn.connect(function(err) {
        console.log("due");
        if (err) throw err;
        console.log("Connected!");
        conn.query("INSERT INTO User(nome, cognome, email, password, user, indirizzo, telefono) VALUES( '" + nome +"', '" + cognome + "', '" + email + "', '" + password + "', '" + nickname + "', '" + indirizzo + "', '" + telefono + "')"  ,function(errr, fields){
            if (errr) throw errr;
            console.log("tre");
            res.send(fields);
        });
    });
});

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

app.listen(3000, function(){});