var express = require('express');
var app = express();
var db = require('./models');
var bodyParser = require('body-parser');
var request = require('request');
var bcrypt = require('bcrypt');
var router = require('router');
var nodemailer = require('nodemailer');
var ejsLayouts = require('express-ejs-layouts');



app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(ejsLayouts);
app.use(express.static(__dirname));
console.log('got here');


app.get('/', function(req, res){
   var url = 'http://api.nytimes.com/svc/topstories/v1/home.json';
  request({
    url: url,
    qs:{
      'api-key': process.env.NYTIMES_KEY
    }
  }, function(error, response, data){
      // console.log(data);
      // res.render('layout.ejs', {results: JSON.parse(data).results[0]});
      res.send(data);


  });

});





app.listen(3000);