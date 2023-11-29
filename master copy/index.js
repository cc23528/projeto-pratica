//carregando modulos
const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const app = express();
const admin = require("./routes/admin");
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');

//configuracoes:
//sessão
app.use(session({
  secret: 'cursodenose',
  resave: true,
  saveUninitialized: true
}));
app.use(flash());

//middleware:
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

//handlebars:
app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//body-parser:
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());

//public
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  // console.log("sou um middleware")
  next();
});

//rotas
app.use('/admin', admin);

//outros
//configurando porta
const PORT = 8081;
app.listen(PORT, () => {
  console.log('Servidor rodando na porta: ' + PORT);
});
