import { Router, Request, Response } from 'express';
import proveedoresController from "../controller/proveedoresController";
class proveedoresRoutes{
	public router: Router = Router();
	constructor(){
		this.config();
	}
	config():void{

		this.router.get('/',(req:Request,res:Response)=> {
            //res.send('Proveedores!!! Fibertel y la re concha de tu vieja');
			res.render("partials/proveedores");
            //res.render("partials/principal");
        });
	        //CRUD
            //CRUD
		this.router.get('/list',proveedoresController.list);
		this.router.get('/find/:id',proveedoresController.find);
		this.router.post('/add',proveedoresController.addProveedor);
		this.router.put('/update/:id',proveedoresController.update);
		this.router.delete('/delete/:id',proveedoresController.delete);
        //Fin de crud
        this.router.get('/controles',proveedoresController.control);
	}
}

//Exportamos el enrutador con 

const ProveedoresRoutes = new proveedoresRoutes();
export default ProveedoresRoutes.router;