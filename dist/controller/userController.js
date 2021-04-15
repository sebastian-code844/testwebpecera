"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Paso32
const listado = [
    { "id": "1", "usuario": "Juan Perez", "password": "123456" },
    { "id": "2", "usuario": "Pepe Cadena", "password": "123456" },
    { "id": "3", "usuario": "Martin Gonzalez", "password": "123456" }
];
class UserController {
    signin(req, res) {
        console.log(req.body);
        //res.send('Sign In!!!'); //Paso 10 //Comentada en el Paso 12
        res.render("partials/signinForm"); //Paso 12
    }
    login(req, res) {
        console.log(req.body);
        //res.send('Datos recibidos!!!');
        //res.send({"Recibido":req.body});
        if (req.body.usuario == "Pepe" && req.body.password == "123456") //Paso 31
            res.redirect("home");
        //res.redirect("https://www.google.com");
        else //Falta enviar el resultado estilizado a traves de una vista
            res.send({ "Usuario no registrado Recibido": req.body });
    }
    //registro - Paso 19
    signup(req, res) {
        console.log(req.body);
        //res.send('Sign Up!!!');
        res.render("partials/signupForm");
    }
    addUser(req, res) {
        console.log(req.body);
        //res.send('Datos recibidos!!!');
        res.send({ "Recibido": req.body }); //Paso 22        
    }
    home(req, res) {
        console.log(req.body);
        //res.send('Bienvenido!!!'); //Paso 31.B
        //res.render("partials/home");
        res.render("partials/home", { listado }); //Paso 32
    }
    process(req, res) {
        console.log(req.body);
        res.send('Datos recibidos!!!');
        //res.render("partials/home",{listado});
    }
}
//Paso 10
const userController = new UserController();
exports.default = userController;
//# sourceMappingURL=userController.js.map