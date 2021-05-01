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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../models/userModel"));
class UserController {
    //registro
    signup(req, res) {
        console.log(req.body);
        //res.send('Sign Up!!!');
        res.render("partials/signupForm");
    }
    signin(req, res) {
        console.log(req.body);
        res.render("partials/signinForm");
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { usuario, password } = req.body; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.
            const result = yield userModel_1.default.buscarUsuario(usuario);
            console.log(usuario);
            console.log(password);
            console.log(result);
            if (!result) {
                // res.send({ "Usuario no registrado ": req.body }); // Paso 13 sacamos todos los send!!
                req.flash('error_session', 'Usuario no registrado'); // Paso 13 (agregue llaves y else if)
                res.redirect("./error"); // Paso 13
            }
            else if (result.Usuario == usuario && result.Password == password) {
                req.session.user = result; // Paso 5  guardo datos de bd en objeto user
                req.session.auth = true; // Paso 5 variable de sesion usuario autenticado
                res.redirect("./home");
                return;
            }
            else {
                // res.send({ "Usuario y/o contraseña incorrectos": req.body }); // Paso 13 sacamos todos los send!!
                req.flash('error_session', 'Usuario y/o Password Incorrectos'); // Paso 13
                res.redirect("./error"); // Paso 13
            }
        });
    }
    // Paso 14
    showError(req, res) {
        //res.send({ "Usuario y/o contraseña incorrectos": req.body }); // Paso 15
        res.render("partials/error"); // Paso 15
    }
    home(req, res) {
        console.log(req.body);
        // Paso 6 si no fue autenticado envialo a la ruta principal   
        if (!req.session.auth) {
            //res.redirect("/"); Paso 17
            req.flash('error_session', 'Debes iniciar sesion para ver esta seccion'); // Paso 17
            res.redirect("./error"); // Paso 17
        }
        res.render("partials/home", { mi_session: true }); // Paso 18  debemos enviar mi_session en true para que se dibuje el boton	
    }
    //CRUD
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const usuarios = yield userModel_1.default.listar();
            console.log(usuarios);
            return res.json(usuarios);
            //res.send('Listado de usuarios!!!');
        });
    }
    find(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.params.id);
            const { id } = req.params;
            const usuario = yield userModel_1.default.buscarId(id);
            if (usuario)
                return res.json(usuario);
            res.status(404).json({ text: "User doesn't exists" });
        });
    }
    addUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = req.body;
            delete usuario.repassword;
            console.log(req.body);
            //res.send('Usuario agregado!!!');
            const busqueda = yield userModel_1.default.buscarUsuario(usuario.Usuario);
            if (!busqueda) {
                const result = yield userModel_1.default.crear(usuario);
                return res.json({ message: 'User saved!!' });
            }
            return res.json({ message: 'User exists!!' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const { id } = req.params;
            const result = yield userModel_1.default.actualizar(req.body, id);
            //res.send('Usuario '+ req.params.id +' actualizado!!!');
            return res.json({ text: 'updating a user ' + id });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            //res.send('Usuario '+ req.params.id +' Eliminado!!!');
            const { id } = req.params; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.
            const result = yield userModel_1.default.eliminar(id);
            //return res.json({ text: 'deleting a user ' + id });
            res.redirect('../control'); // Paso 19 redirije despues del delete a la vista de la tabla
        });
    }
    //FIN CRUD
    control(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //res.send('Controles');
            // Paso 6 si no fue autenticado envialo a la ruta principal
            if (!req.session.auth) {
                // res.redirect("/"); Paso 17
                req.flash('error_session', 'Debes iniciar sesion para ver esta seccion'); // Paso 17
                res.redirect("./error"); // Paso 17
            }
            const usuarios = yield userModel_1.default.listar();
            const users = usuarios;
            res.render('partials/controls', { users: usuarios, mi_session: true }); //  Paso 18  debemos enviar mi_session en true para que se dibuje el boton	
        });
    }
    procesar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            // Paso 6 si no fue autenticado envialo a la ruta principal
            if (!req.session.auth) {
                // res.redirect("/"); Paso 17
                req.flash('error_session', 'Debes iniciar sesion para ver esta seccion'); // Paso 17
                res.redirect("./error"); // Paso 17
            }
            // Paso 20
            let usuario = req.body.usuario;
            var usuarios = [];
            console.log(usuario);
            if (usuario !== undefined) { // Falla comprobacion cuando envio vacio
                for (let elemento of usuario) {
                    const encontrado = yield userModel_1.default.buscarId(elemento);
                    if (encontrado) {
                        usuarios.push(encontrado);
                        console.log(encontrado);
                    }
                }
            }
            console.log(usuarios);
            res.render("partials/seleccion", { usuarios, home: req.session.user, mi_session: true }); // Paso 21 renderizamos la vista
            // res.send('Datos recibidos!!!');		
        });
    }
    // Paso 8 cierre de sesion
    endSession(req, res) {
        console.log(req.body);
        req.session.user = {};
        req.session.auth = false;
        req.session.destroy(() => console.log("Session finalizada"));
        res.redirect("/");
    }
}
const userController = new UserController();
exports.default = userController;
//# sourceMappingURL=userController.js.map