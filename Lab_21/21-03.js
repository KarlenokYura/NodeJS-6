var express = require('express');
var cookies = require('cookie-parser');

var Users = require(__dirname + '/users.json');

app = express();
app.use(cookies());
app.use(express.urlencoded({exteded: true}));

app.get('/login', (req, res, next) => {
  console.log('Login')
  res.sendFile(__dirname + '/form.html');
});

app.post('/login', (req, res, next) => {
  console.log('params: ', req.body);
  var pass = Credential(req.body.user);
  if(verificate(pass, req.body.password)){
    res.cookie('token', 'xxx-yyy-zzz').redirect('/resource');
  }
  else
    res.redirect('/login');
});

app.get('/resource', (req, res) => {
  let cookie = req.cookies;
  console.log(cookie.token);

  if(cookie.token == 'xxx-yyy-zzz')
    res.end('Resource');
  else
    res.redirect('/login');
});

app.get('/logout', (req, res)=>{
  console.log('Logout');
  res.clearCookie('token');
  res.redirect('/login');
});

var Credential = (user) => {
  var us = Users.find(u => u.user.toLowerCase() == user.toLowerCase());
  if(us)
    return us.password;
  else
    return null;
};
var verificate = (pass1, pass2) => {
  return pass1 == pass2;
};

app.listen(3000)
.on('error', (e) => {console.log(`Listener | error: ${e.code}`)});
