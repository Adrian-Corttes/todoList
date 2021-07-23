//Definimos la estrategia local con todas sus configuraciones
const passport = require('passport');
const bcrypt = require("bcryptjs");
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const {Users} = require('../models');
require("dotenv").config();

//Estrategia local
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    //Comprobar que exista el correo electronico en la DB
    try{
        let user = await Users.findOne({where: {email}});
        //user va a estar definido si el correo se encuentra en la DB
        //user = null si el correo no se encuentra en la DB        
        //Comprobar si la contraseña de la DB es igual a la que me envía el cliente
        if(user && bcrypt.compareSync(password, user.password)){
            //Vamos a enviar los datos del usuario al serializador
            return done(null, user);
        }
        //Las credenciales del usuario son incorrectas / no existe el correo en la DB
        return done(null, false);
    }catch(error){
        done(error);
    }
}));

//Estrategia google OAuth 2.0
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENTID,
    clientSecret: process.env.SECRET_GOOGLE,
    callbackURL: process.env.GOOGLE_REDIRECT_URI
}, (accessToken,refreshToken,profile,done)=>{
    return done(null, profile)
}));

///Serialización
passport.serializeUser((profile, done) => {
    //Firmar los datos del usuario
    return done(null, profile);
});

//Deserialización
passport.deserializeUser(async(profile, done) => {
    //Vamos a obtener los datos del usuario a partir del ID
    try{
        if(profile.id.toString().length <= 10){
            let user = await Users.findByPk(profile.id, {plain: true});
            done(null, user); //request -> request.user
        }
        else{
            //generado por google
            done(null, profile);
        } 
    }catch(error){
        done(error);
    }
});