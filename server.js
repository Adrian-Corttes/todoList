const express = require("express");
const passport = require("passport");
const session = require("express-session");
const path = require("path");
const PORT = 8000;

const {Users} = require('./models');

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
app.use(session({
    secret: "academlo secret",
    resave: false,
    saveUninitialized: true
}));

const passportLocalStrategy = passport.authenticate("local", {
    successRedirect: '/categorias',
    failureRedirect: '/login'
});

app.use(passport.initialize());
app.use(passport.session());

//Middleware de aplicación
//req -> Request (solicitud/petición del usuario)
//res -> Response (respuesta hacía el usuario)
//next -> Es continuar con la ejecución del siguiente middleware
//next(error) -> Al momento de recibir un valor como argumento, se ejecutará el middleware para el manejo de errores
app.get("/", (req, res, next) => {
    res.render("pages/home", {title: "Inicio"});
});

app.get("/login", (req, res, next) => {
    res.render("pages/login", {title: "Iniciar sesión"});
});

app.post("/login", passportLocalStrategy, (error, req, res, next) => {
    if(error) return console.log(error.message);
})

app.get("/registro", (req, res, next) => {
    res.render("pages/register", {title: "Registro"});
});

app.post("/registro", async (req, res, next) => {
    let {firstname, lastname, email, password} = req.body;
    try{
        await Users.create({firstname, lastname, email, password});
        res.redirect("/registro");
    }catch(error){
        console.log(error);
    }
});

//Restringir el acceso a los usuarios que no están autenticados
//Implementar un sistema de inicio de sesión y registro
app.get("/categorias", (req, res, next) => {
    if(req.isAuthenticated()){
        let username = `${req.user.firstname} ${req.user.lastname}`;
        return res.render("pages/categories", {title: "Categorias", username});
    }
    return res.redirect("/login");
});

app.get("/logout", (req, res) => {
    req.logout(); //Quitamos la sesión activa del usuario
    return res.redirect("/login"); //Redireccionamos a inicio
});

app.listen(PORT, () => {
    console.log(`El servidor está escuchando sobre el puerto ${PORT}`);
});