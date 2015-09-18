var express = require('express');
var app = express();
var db = require('./models');
var bodyParser = require('body-parser');
var request = require('request');
var bcrypt = require('bcrypt');
var router = require('router');
var nodemailer = require('nodemailer');
var ejsLayouts = require('express-ejs-layouts');


//
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname));
console.log('got here');
app.use(ejsLayouts);






app.get('/', function(req, res){
   var url = 'http://api.nytimes.com/svc/topstories/v1/world.json?api-key=';
  request({
    url: url,
    qs:{
      'api-key': process.env.NYTIMES_KEY
    }
  }, function(error, response, data){
      // console.log(data);
      res.render('main/index', {results: JSON.parse(data).results});
       // res.send(data);


  });

});



app.post('/contact', function (req, res) {
  // res.send(req.body);
//   var mailBody = "";
//   for(key in req.body){
//     mailBody += key + ':\t' + req.body[key] + '\n\n';
//   }
//   res.send(mailBody);

var transporter = nodemailer.createTransport({
  service: 'yahoo',
  auth: {
    user: process.env.YAHOO_EMAIL,
    pass: process.env.YAHOO_PASSWORD
  }
});
transporter.sendMail({
  from:'osamasapp@yahoo.com',
  to:'osamaasaid@gmail.com',
  subject:req.body.subject,
  text:req.body.message
},function(err,info){
//   console.log('err',err);
//   console.log('info',info);
  // if (!req.body.message){
  //   alert('Message connot be empty');
  // }
  // else{
    res.redirect('/thanks');
  // }
  });

});

app.get('/thanks', function(req,res){
  res.render('main/thanks')
})

app.get('/contact', function(req,res){
  res.render('main/contact')
});




app.listen(process.env.PORT || 3000);