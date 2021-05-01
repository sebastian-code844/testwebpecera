import { Router, Request, Response } from 'express';
class IndexRoutes {
	public router: Router = Router();
	constructor() {
		this.config();
	}
	config(): void {
		this.router.get('/', (req: Request, res: Response) => {
			req.session.auth = false; // Paso 4 - inicio sesion
			req.session.user = {}; // Paso 4 - inicio sesion
			res.render("partials/principal");
		});
	}
}

//Exportamos el enrutador con 

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;