import {Request, Response} from 'express';

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

	public addUser(req:Request,res:Response){
		console.log(req.body);
        //res.send('Datos recibidos!!!');
		res.send({"Recibido":req.body}); //Paso 22        
	}

    public home(req:Request,res:Response){
		console.log(req.body);
        //res.send('Bienvenido!!!'); //Paso 31.B
		//res.render("partials/home");
		res.render("partials/home",{listado}); //Paso 32
	}

	public process(req:Request,res:Response){
		console.log(req.body);
        res.send('Datos recibidos!!!');
		//res.render("partials/home",{listado});
	}
	

}

//Paso 10
const userController = new UserController(); 
export default userController;