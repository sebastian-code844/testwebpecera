import { Request, Response } from 'express';
import userModel from '../models/userModel';
import flash from "connect-flash";

class UserController {

    //registro
    public signup(req: Request, res: Response) {
        console.log(req.body);
        //res.send('Sign Up!!!');
        res.render("partials/signupForm");
    }

    public signin(req: Request, res: Response) {
        console.log(req.body);
        res.render("partials/signinForm");
    }

    public async login(req: Request, res: Response) {
        const { usuario, password } = req.body; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.
        const result = await userModel.buscarUsuario(usuario);
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
    }

    // Paso 14
    public showError(req: Request, res: Response) {
        //res.send({ "Usuario y/o contraseña incorrectos": req.body }); // Paso 15
        res.render("partials/error"); // Paso 15

    }

    public home(req: Request, res: Response) {
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
    public async list(req: Request, res: Response) {
        console.log(req.body);
        const usuarios = await userModel.listar();
        console.log(usuarios);
        return res.json(usuarios);
        //res.send('Listado de usuarios!!!');
    }

    public async find(req: Request, res: Response) {
        console.log(req.params.id);
        const { id } = req.params;
        const usuario = await userModel.buscarId(id);
        if (usuario)
            return res.json(usuario);
        res.status(404).json({ text: "User doesn't exists" });
    }

    public async addUser(req: Request, res: Response) {
        const usuario = req.body;
        delete usuario.repassword;
        console.log(req.body);
        //res.send('Usuario agregado!!!');
        const busqueda = await userModel.buscarUsuario(usuario.Usuario);
        if (!busqueda) {
            const result = await userModel.crear(usuario);
            return res.json({ message: 'User saved!!' });
        }
        return res.json({ message: 'User exists!!' });
    }

    public async update(req: Request, res: Response) {
        console.log(req.body);
        const { id } = req.params;
        const result = await userModel.actualizar(req.body, id);
        //res.send('Usuario '+ req.params.id +' actualizado!!!');
        return res.json({ text: 'updating a user ' + id });
    }

    public async delete(req: Request, res: Response) {
        console.log(req.body);
        //res.send('Usuario '+ req.params.id +' Eliminado!!!');
        const { id } = req.params; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.
        const result = await userModel.eliminar(id);
        //return res.json({ text: 'deleting a user ' + id });
        res.redirect('../control'); // Paso 19 redirije despues del delete a la vista de la tabla
    }
    //FIN CRUD

    public async control(req: Request, res: Response) {
        //res.send('Controles');
        // Paso 6 si no fue autenticado envialo a la ruta principal
        if (!req.session.auth) {
            // res.redirect("/"); Paso 17
            req.flash('error_session', 'Debes iniciar sesion para ver esta seccion'); // Paso 17
            res.redirect("./error"); // Paso 17
        }
        const usuarios = await userModel.listar();
        const users = usuarios;
        res.render('partials/controls', { users: usuarios, mi_session: true });	//  Paso 18  debemos enviar mi_session en true para que se dibuje el boton	
    }

    public async procesar(req: Request, res: Response) {
        console.log(req.body);
        // Paso 6 si no fue autenticado envialo a la ruta principal
        if (!req.session.auth) {
            // res.redirect("/"); Paso 17
            req.flash('error_session', 'Debes iniciar sesion para ver esta seccion'); // Paso 17
            res.redirect("./error"); // Paso 17
        }
        // Paso 20
        let usuario = req.body.usuario;
        var usuarios: any = [];
        console.log(usuario);
        if (usuario !== undefined) { // Falla comprobacion cuando envio vacio
            for (let elemento of usuario) {
                const encontrado = await userModel.buscarId(elemento);
                if (encontrado) {
                    usuarios.push(encontrado);
                    console.log(encontrado);
                }

            }
        }
        console.log(usuarios);
        res.render("partials/seleccion", { usuarios, home: req.session.user, mi_session:true }); // Paso 21 renderizamos la vista
        // res.send('Datos recibidos!!!');		
    }

    // Paso 8 cierre de sesion
    public endSession(req: Request, res: Response) {
        console.log(req.body);
        req.session.user = {};
        req.session.auth = false;
        req.session.destroy(() => console.log("Session finalizada"));
        res.redirect("/");
    }

}

const userController = new UserController();
export default userController;