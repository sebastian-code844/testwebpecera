import {Request, Response} from 'express';
import { connect } from '../models/userModel'; // se agrego en clase 03

//Paso32
const listado=[
	{"id":"1","usuario":"Juan Perez","password":"123456"},
	{"id":"2","usuario":"Pepe Cadena","password":"123456"},
	{"id":"3","usuario":"Martin Gonzalez","password":"123456"}
];

class UserController{

	public signin(req:Request,res:Response){
		console.log(req.body);
        //res.send('Sign In!!!'); //Paso 10 //Comentada en el Paso 12
        res.render("partials/signinForm"); //Paso 12
	}
    public login(req:Request,res:Response){ //Paso 16
		console.log(req.body);
        //res.send('Datos recibidos!!!');
        //res.send({"Recibido":req.body});
        if(req.body.usuario=="Pepe"&&req.body.password=="123456") //Paso 31
			res.redirect("home");
			//res.redirect("https://www.google.com");
		else//Falta enviar el resultado estilizado a traves de una vista
        	res.send({"Usuario no registrado Recibido":req.body});
	}

    //registro - Paso 19
	public signup(req:Request,res:Response){
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

    public home(req:Request,res:Response){
		console.log(req.body);
        //res.send('Bienvenido!!!'); //Paso 31.B
		//res.render("partials/home");
		// Paso 7 - ejemplo03
		// res.render("partials/home",{listado}); //Paso 32		
		res.render("partials/home");
	}

	public process(req:Request,res:Response){
		console.log(req.body);
        res.send('Datos recibidos!!!');
		//res.render("partials/home",{listado});
	}

	//CRUD Paso 11 ejemplo03
	public async list(req:Request,res:Response){
		/*
		console.log(req.body);
        res.send('Listado de usuarios!!!');
		*/
		// Paso 13 ejemplo03
		const db = await connect();
		const usuarios=await db.query('SELECT * FROM usuarios');
		//devuelve tabla mas proiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
		return res.json(usuarios[0]);
	}

	public async find(req:Request,res:Response){
		/*
		console.log(req.params.id);
        res.send('Usuario '+ req.params.id +' encontrado!!!');
		*/
		// Paso 13 ejemplo03
		const { id } = req.params; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.
		const db = await connect();
		console.log(id);
		const usuarios:any = await db.query('SELECT * FROM usuarios WHERE id = ?',[id]); 
		//Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
		console.log(usuarios[0].length)
		if(usuarios[0].length > 0){ //Si lo encontro lo devuelvo sin relleno.
			return res.json(usuarios[0][0]);//Enviamos solo la fila devuelta. Sin el envoltorio. Pos 0,0 de la tabla
		}
		//console.log(games);
		res.status(404).json({text:"No se encuentra el usuario"});
	}

	public async addUser(req:Request,res:Response){
		/*
		console.log(req.body);
        res.send('Usuario agregado!!!');
		*/
		// Paso 13 ejemplo03
		const db = await connect();
		await db.query('INSERT INTO usuarios SET ?',[req.body]);
		return res.json({message:'Usuario cargado'});
	}

	public async update(req:Request,res:Response){
		/*
		console.log(req.body);
        res.send('Usuario '+ req.params.id +' actualizado!!!');
		*/
		// Paso 13 ejemplo03
		const db = await connect();
		const { id } = req.params; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.		
		const user = await db.query('UPDATE usuarios SET ? WHERE ID = ?',[req.body, id]);
		return res.json({text:'Usuario actualizado N° '+req.params.id});
	}

	public async delete(req:Request,res:Response){
		/*
		console.log(req.body);
        res.send('Usuario '+ req.params.id +' Eliminado!!!');
		*/
		// Paso 13 ejemplo03
		const db = await connect();
		const { id } = req.params; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.
		
		const games = await db.query('DELETE FROM usuarios WHERE ID = ?',[id]);
		return res.json({text:'Usuario eliminado'});
	}
	//FIN CRUD
}

//Paso 10
const userController = new UserController(); 
export default userController;