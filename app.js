//Modulos
const express = require("express");
const passport = require("passport");
const session = require('./utils/session.conf');
const path = require("path");

//Rutas
const authRouter = require('./routes/auth.routes');
const catRouter = require('./routes/category.routes');

require('./config/passport');

const app = express();

//Configurar nuestra aplicación para procesar los datos a través de urlencoded
app.use(express.urlencoded({extended: true}));

//Middleware incorporado
app.use(express.static(path.join(__dirname, "public")));

//1. Definiendo en donde se ubicará el directorio views
app.set('views', path.join(__dirname, 'views')); 
//2. Definiendo el motor que usaremos
app.set('view engine', 'ejs');

//Middleware de terceros
app.use(session);

app.use(passport.initialize());
app.use(passport.session());

//Middleware de aplicació
app.get("/", (req, res, next) => {
    res.render("pages/home", {title: "Inicio"});
});

app.use(authRouter);
app.use(catRouter);

module.exports = app; 