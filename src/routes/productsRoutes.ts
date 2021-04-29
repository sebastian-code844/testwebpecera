import { Router, Request, Response } from 'express';
import productsController from '../controller/productsController'; //ruta relativa

class ProductsRoutes{
	public router: Router = Router();
	constructor(){
		this.config();
	}	
    config():void{
        //se asocian rutas con el metodo de una clase existente:
		this.router.get('/',(req:Request,res:Response)=> {
            res.send('Products!!!');                         
        });        

        //CRUD
        this.router.get('/list',productsController.list);
        this.router.get('/find/:id',productsController.find);
        this.router.post('/add',productsController.addProduct);
        this.router.put('/update/:id',productsController.update);
        this.router.delete('/delete/:id',productsController.delete);
        // FIN CRUD        

        this.router.get('/control',productsController.control);
	}
}

//Exportamos el enrutador con 
const productsRoutes = new ProductsRoutes();
export default productsRoutes.router;