const passport = require("passport");
const { newUser } = require("../services/auth.service");

const renderLogin = (req, res) => {
   res.render("pages/login", { title: "Iniciar sesión" });
};

const renderRegister = (req, res) => {
   res.render("pages/register", { title: "Registro" });
};

const register = async (req, res, next) => {
   let { firstname, lastname, email, password } = req.body;

   try {
       await newUser({ firstname, lastname, email, password });
       res.redirect("/registro");
   } catch (error) {
       next(error);
   }
};

const logout = (req, res) => {
   req.logout(); //Quitamos la sesión activa del usuario
   return res.redirect("/login"); //Redireccionamos a inicio
};

const localAuthStrategy = passport.authenticate("local", {
   successRedirect: "/categorias",
   failureRedirect: "/login",
});

const gAuthStrategy = passport.authenticate("google", {
   session: true,
   scope: ["email", "profile"],
});

const fbAuthStrategy = passport.authenticate("facebook", {
   session: true,
   scope: ["email", "public_profile"],
});

const gCallback = passport.authenticate('google', {
   successRedirect: '/categorias',
   failureRedirect: '/login'
});

const fbCallback = passport.authenticate('facebook', {
   successRedirect: '/categorias',
   failureRedirect: '/login'
});


module.exports = {
   renderLogin,
   renderRegister,
   register,
   logout,
   localAuthStrategy,
   gAuthStrategy,
   fbAuthStrategy,
   gCallback,
   fbCallback
};
