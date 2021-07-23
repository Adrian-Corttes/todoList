const {Router} = require('express');
const authCtrl = require('../controllers/auth.controller');

const authRouter = Router();


//Flujo de autenticación
authRouter.get('/login', authCtrl.renderLogin);
authRouter.post('/login', authCtrl.localAuthStrategy)
authRouter.get('/registro', authCtrl.renderRegister);
authRouter.post('/registro', authCtrl.register);
authRouter.get('/logout', authCtrl.logout);

//Autenticación por medio de facebook y google
authRouter.get('/auth/google', authCtrl.gAuthStrategy);
authRouter.get('/auth/facebook', authCtrl.fbAuthStrategy);

authRouter.get('/auth/google/callback', authCtrl.gCallback);
authRouter.get('/auth/facebook/callback', authCtrl.fbCallback);

module.exports = authRouter;
