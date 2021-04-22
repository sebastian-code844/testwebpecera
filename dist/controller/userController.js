"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = require("../models/userModel"); // se agrego en clase 03
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
    /* Paso 11 ejemplo03 la comento
    public addUser(req:Request,res:Response){
        console.log(req.body);
        //res.send('Datos recibidos!!!');
        res.send({"Recibido":req.body}); //Paso 22
    }
    */
    home(req, res) {
        console.log(req.body);
        //res.send('Bienvenido!!!'); //Paso 31.B
        //res.render("partials/home");
        // Paso 7 - ejemplo03
        // res.render("partials/home",{listado}); //Paso 32		
        res.render("partials/home");
    }
    process(req, res) {
        console.log(req.body);
        res.send('Datos recibidos!!!');
        //res.render("partials/home",{listado});
    }
    //CRUD Paso 11 ejemplo03
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /*
            console.log(req.body);
            res.send('Listado de usuarios!!!');
            */
            // Paso 13 ejemplo03
            const db = yield userModel_1.connect();
            const usuarios = yield db.query('SELECT * FROM usuarios');
            //devuelve tabla mas proiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
            return res.json(usuarios[0]);
        });
    }
    find(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /*
            console.log(req.params.id);
            res.send('Usuario '+ req.params.id +' encontrado!!!');
            */
            // Paso 13 ejemplo03
            const { id } = req.params; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.
            const db = yield userModel_1.connect();
            console.log(id);
            const usuarios = yield db.query('SELECT * FROM usuarios WHERE id = ?', [id]);
            //Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
            console.log(usuarios[0].length);
            if (usuarios[0].length > 0) { //Si lo encontro lo devuelvo sin relleno.
                return res.json(usuarios[0][0]); //Enviamos solo la fila devuelta. Sin el envoltorio. Pos 0,0 de la tabla
            }
            //console.log(games);
            res.status(404).json({ text: "No se encuentra el usuario" });
        });
    }
    addUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /*
            console.log(req.body);
            res.send('Usuario agregado!!!');
            */
            // Paso 13 ejemplo03
            const db = yield userModel_1.connect();
            yield db.query('INSERT INTO usuarios SET ?', [req.body]);
            return res.json({ message: 'Usuario cargado' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /*
            console.log(req.body);
            res.send('Usuario '+ req.params.id +' actualizado!!!');
            */
            // Paso 13 ejemplo03
            const db = yield userModel_1.connect();
            const { id } = req.params; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.		
            const user = yield db.query('UPDATE usuarios SET ? WHERE ID = ?', [req.body, id]);
            return res.json({ text: 'Usuario actualizado N° ' + req.params.id });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /*
            console.log(req.body);
            res.send('Usuario '+ req.params.id +' Eliminado!!!');
            */
            // Paso 13 ejemplo03
            const db = yield userModel_1.connect();
            const { id } = req.params; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.
            const games = yield db.query('DELETE FROM usuarios WHERE ID = ?', [id]);
            return res.json({ text: 'Usuario eliminado' });
        });
    }
}
//Paso 10
const userController = new UserController();
exports.default = userController;
//# sourceMappingURL=userController.js.map