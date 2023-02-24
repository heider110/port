require("dotenv").config()
const express = require("express")
const path = require('path')
const bodyParser=require("body-parser");
const nodemailer = require("nodemailer");
const { urlencoded } = require("body-parser");

const app = express();

app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/assets'));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'index'))
});
const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure:false,
    
    auth: {
        user: 'alkhazaly@outlook.de',
        pass: process.env.password
    },
    tls:{
      rejectUnauthorized: false,
    }
});
app.post('/send', function(req, res) {
  
  

  const mailOptions = {
      from: 'alkhazaly@outlook.de',
      to: 'alkhazaly@outlook.de',
      email:req.body.email,
      subject: req.body.subject,
      text: 'Name: '+req.body.name+'\nEmail: '+req.body.email+'\nMessage: '+req.body.message
  };

  const mailSendBack = {
    from: 'alkhazaly@outlook.de',
    to: req.body.email,
    subject: "don't reply",
    text: 'Hello '+req.body.name
};

  transporter.sendMail(mailOptions , function(error, info){
      if(error){
          console.log(error);
          res.send(error);
      }else{
         
          res.send('Message sent: ' + info.response);
         
  transporter.sendMail(mailSendBack , function(error, info){
    if(error){
        console.log(error);
        res.send(error);
    }else{
       
        res.send('Message sent: ' + info.response);
       
    }
});
      }
  });

});


app.get("/crypto-wallet", (req, res) => {
  res.sendFile(path.join(__dirname, 'crypto-wallet'))
});

app.get("/simon", (req, res) => {
  res.sendFile(path.join(__dirname, 'simon'))
});

app.listen(process.env.PORT ||3000, () => {
  console.log('Listening on port ' + 5000);
});
