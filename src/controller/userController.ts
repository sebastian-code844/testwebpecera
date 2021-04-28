import {Request, Response} from 'express';
import userModel from '../models/userModel'; 

class UserController{

	public signin(req:Request,res:Response){
		console.log(req.body);
        res.render("partials/signinForm");
	}
    public async login(req:Request,res:Response){
		const { usuario, password } = req.body; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.
        const result = await userModel.buscarUsuario(usuario);
        console.log(usuario);
        console.log(password);
        console.log(result);
        if (!result)
            res.send({ "Usuario no registrado Recibido": req.body });
        if (result.Usuario == usuario && result.Password == password){
			res.redirect("./home");
			return;
		}
        res.send({ "Usuario y/o contraseña incorrectos": req.body });
	}

    //registro
	public signup(req:Request,res:Response){
		console.log(req.body);
        //res.send('Sign Up!!!');
		res.render("partials/signupForm");
	}

    public home(req:Request,res:Response){
		console.log(req.body);       
        res.render("partials/home");
	}

	//CRUD
	public async list(req:Request,res:Response){
		console.log(req.body);
        const usuarios = await userModel.listar();
        console.log(usuarios);
        return res.json(usuarios);
        //res.send('Listado de usuarios!!!');
	}

	public async find(req:Request,res:Response){
		console.log(req.params.id);
        const { id } = req.params;
        const usuario = await userModel.buscarId(id);
        if (usuario)
            return res.json(usuario);
        res.status(404).json({ text: "User doesn't exists" });
	}

	public async addUser(req:Request,res:Response){
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

	public async update(req:Request,res:Response){
		console.log(req.body);
        const { id } = req.params;
        const result = await userModel.actualizar(req.body, id);
        //res.send('Usuario '+ req.params.id +' actualizado!!!');
        return res.json({ text: 'updating a user ' + id });
	}

	public async delete(req:Request,res:Response){
		console.log(req.body);
        //res.send('Usuario '+ req.params.id +' Eliminado!!!');
        const { id } = req.params; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.
        const result = await userModel.eliminar(id);
        return res.json({ text: 'deleting a user ' + id });
	}
	//FIN CRUD

	public async control(req:Request,res:Response){
		//res.send('Controles');
        const usuarios = await userModel.listar();
        const users = usuarios;
        res.render('partials/controls', { users: usuarios });		
	}

	public procesar(req:Request,res:Response){
		console.log(req.body);
        res.send('Datos recibidos!!!');
		//res.render("partials/home",{listado});
	}
}

const userController = new UserController(); 
export default userController;