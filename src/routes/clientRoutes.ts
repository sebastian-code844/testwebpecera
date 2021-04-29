import { Router, Request, Response } from 'express';
import clientController from '../controller/clientController'; //ruta relativa

class UserRoutes{
	public router: Router = Router();
	constructor(){
		this.config();
	}
	config():void{
        //se asocian rutas con el metodo de una clase existente:

		this.router.get('/',(req:Request,res:Response)=> {
            res.send('Clients!!!');
            //res.render("partials/principal");               
        });
        
        //CRUD
        this.router.get('/list',clientController.list);
        this.router.get('/find/:id',clientController.find);
        this.router.post('/add',clientController.addClient);
        this.router.put('/update/:id',clientController.update);
        this.router.delete('/delete/:id',clientController.delete);
        // FIN CRUD

        this.router.get('/control',clientController.control);
        
	}
}

//Exportamos el enrutador con 
const clientRoutes = new UserRoutes();
export default clientRoutes.router;