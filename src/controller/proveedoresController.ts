const listado=[
	{"id":"1","proveedor":"Vidrieria Tato's","telefono":"1168874588"},
	{"id":"2","proveedor":"Accesorios para tu Pecera","telefono":"1168874594"},
	{"id":"3","proveedor":"Herramientas","telefono":"1168874523"}
];

import {Request, Response} from 'express';
import proveedoresModel from '../models/proveedoresModel';

class proveedoresController{

   //CRUD

  public async addProveedor(req:Request,res:Response)
   {
	const usuario = req.body;
	delete usuario.repassword;
	console.log(req.body);
	//res.send('Usuario agregado!!!');
	const busqueda = await proveedoresModel.buscarNombre(usuario.nombre);
	if (!busqueda) {
		const result = await proveedoresModel.crear(usuario);
		return res.json({ message: 'Proveedor saved!!' });
	}
	return res.json({ message: 'Proveedor exists!!' });

}

	public async list(req:Request,res:Response){
		console.log(req.body);
        const usuarios = await proveedoresModel.listar();
        console.log(usuarios);
        return res.json(usuarios);
        //res.send('Listado de usuarios!!!');
	}

	public async find(req:Request,res:Response){
		console.log(req.params.id);
        const { id } = req.params;
        const usuario = await proveedoresModel.buscarId(id);
        if (usuario)
            return res.json(usuario);
        res.status(404).json({ text: "Proveedor doesn't exists" });
	}

	public async update(req:Request,res:Response){
		console.log(req.body);
        const { id } = req.params;
        const result = await proveedoresModel.actualizar(req.body, id);
        //res.send('Usuario '+ req.params.id +' actualizado!!!');
        return res.json({ text: 'updating Proveedor ' + id });
	}

	public async delete(req:Request,res:Response){
		console.log(req.body);
        //res.send('Usuario '+ req.params.id +' Eliminado!!!');
        const { id } = req.params; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.
        const result = await proveedoresModel.eliminar(id);
        return res.json({ text: 'deleting Proveedor' + id });
		
	}
	
	//FIN CRUD

	public async control(req: Request,res: Response)
	{
		//res.send('Controles');
        const proveedores = await proveedoresModel.listar();
        const proveedor = proveedores;
        res.render('partials/proveedores', { proveedor: proveedores });
		
	}
}

const ProveedoresController = new proveedoresController(); 
export default ProveedoresController;
