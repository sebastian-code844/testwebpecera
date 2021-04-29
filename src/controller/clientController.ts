import {Request, Response} from 'express';
import clientModel from '../models/clientModel'; 

class ClientController{
    //CRUD
	public async list(req:Request,res:Response){
		console.log(req.body);
        const clientes = await clientModel.listar();
        console.log(clientes);
        return res.json(clientes);
        //res.send('Listado de clientes!!!');
	}

	public async find(req:Request,res:Response){
		console.log(req.params.id);
        const { id } = req.params;
        const cliente = await clientModel.buscarId(id);
        if (cliente)
            return res.json(cliente);
        res.status(404).json({ text: "Client doesn't exists" });
	}

	public async addClient(req:Request,res:Response){
		const cliente = req.body;
        delete cliente.repassword;
        console.log(req.body);
        //res.send('Usuario agregado!!!');
        const busqueda = await clientModel.buscarCliente(cliente.NumeroDocumento);// Hace referencia al campo Usuario de la tabla usuario.
        if (!busqueda) {
            const result = await clientModel.crear(cliente);
            return res.json({ message: 'Client saved!!' });
        }
        return res.json({ message: 'Client exists!!' });
	}

	public async update(req:Request,res:Response){
		console.log(req.body);
        const { id } = req.params;
        const result = await clientModel.actualizar(req.body, id);
        //res.send('Usuario '+ req.params.id +' actualizado!!!');
        return res.json({ text: 'updating a client ' + id });
	}

	public async delete(req:Request,res:Response){
		console.log(req.body);
        //res.send('Usuario '+ req.params.id +' Eliminado!!!');
        const { id } = req.params; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.
        const result = await clientModel.eliminar(id);
        return res.json({ text: 'deleting a client ' + id });
	}
	//FIN CRUD

	public async control(req:Request,res:Response){
		//res.send('Controles');
        const clientes = await clientModel.listar();
        const clients = clientes;
        res.render('partials/clients', { clients: clientes });		
	}

	
}

const clientController = new ClientController(); 
export default clientController;