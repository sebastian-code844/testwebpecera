import { Router, Request, Response } from 'express';
import userController from '../controller/userController'; //ruta relativa

class UserRoutes{
	public router: Router = Router();
	constructor(){
		this.config();
	}
	config():void{
        //se asocian rutas con el metodo de una clase existente:

		this.router.get('/',(req:Request,res:Response)=> {
            res.send('Main!!!');
            //res.render("partials/principal");               
        });
        /*this.router.get('/signin',(req:Request,res:Response)=> {
            res.send('Sign In!!!');
            //res.render("partials/principal");
        }); //El msj ahora esta en userController*/ //Paso 9
        this.router.get('/signin',userController.signin); 
        this.router.post('/signin',userController.login); //Paso 15

        //registro - Paso 18
		this.router.get('/signup',userController.signup);
		this.router.post('/signup',userController.addUser);

        //Home del usuario
		/*this.router.get('/home',(req:Request,res:Response)=> {
            res.send('Bienvenido!!!')});*/
        
        this.router.get('/home',userController.home);
	}
}

//Exportamos el enrutador con 

const userRoutes = new UserRoutes();
export default userRoutes.router;