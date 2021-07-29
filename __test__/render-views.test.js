const authCtrl = require('../controllers/auth.controller');
const catCtrl = require('../controllers/category.controller');


//pruebas unitarias
describe("Probando el renderizado de las vistas", () => {
   it("Renderizado login", () => {
       //Datos de renderizado
       const view = "pages/login";
       const payload = {"title": "Iniciar sesión"};

       //Petición y Respuesta para el cliente
       const req = {};
       const res = {
           render: jest.fn()
       }

       jest.spyOn(authCtrl, "renderLogin");

       authCtrl.renderLogin(req, res);

       expect(res.render).toHaveBeenCalled();
       expect(res.render).toHaveBeenCalledWith(view, payload);
   });

   it("Renderizado registro", () => {
       //Datos de renderizado
       const view = "pages/register";
       const payload = {"title": "Registro"};

       //Petición y Respuesta para el cliente
       const req = {};
       const res = {
           render: jest.fn()
       }

       jest.spyOn(authCtrl, "renderRegister");

       authCtrl.renderRegister(req, res);

       expect(res.render).toHaveBeenCalled();
       expect(res.render).toHaveBeenCalledWith(view, payload);
   });

   it("Renderizado categorias", () => {
       //Petición y Respuesta para el cliente
       const req = {
           user: {
               firstname: 'John',
               lastname: 'Doe'
           }
       };

       //Datos de renderizado
       const view = "pages/categories";
       const username = `${req.user.firstname} ${req.user.lastname}`;
       const payload = {"title": "Categorias", username};

       
       const res = {
           render: jest.fn()
       }

       jest.spyOn(catCtrl, "renderCategory");

       catCtrl.renderCategory(req, res);

       expect(res.render).toHaveBeenCalled();
       expect(res.render).toHaveBeenCalledWith(view, payload);
   });

   it("Cerrando sesión", () => {
       const req = {
           logout: jest.fn()
       };

       //Datos de renderizado
       const route = "/login";
       
       const res = {
           redirect: jest.fn()
       }

       jest.spyOn(authCtrl, "logout");

       authCtrl.logout(req, res);

       expect(req.logout).toHaveBeenCalled();
       expect(res.redirect).toHaveBeenCalled();
       expect(res.redirect).toHaveBeenCalledWith(route);
   })
});
