require("dotenv").config()
const express = require("express")
const path = require('path')
const bodyParser=require("body-parser");
const nodemailer = require("nodemailer");
const ejs = require("ejs")

const app = express();
app.use(express.static("views"));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/assets'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');



app.get("/", (req, res) => {
  res.render(path.join(__dirname, '/index'))
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
    subject: "Auto-reply: Thank you for contacting me",
    text: 'Hello '+req.body.name+",\n\nThank you for contacting me. I have received your message and will respond as soon as possible.\n\nBest regards,\nHaidar Alkhazaly"
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
  res.render(path.join(__dirname, '/views/crypto-wallet'))
});

app.get("/simon", (req, res) => {
  res.render(path.join(__dirname, '/views/simon'))
});
let port =process.env.PORT ||3000;
app.listen(port, () => {
  console.log('Listening on port ' +port);
});
