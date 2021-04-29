import {Request, Response} from 'express';
import productsModel from '../models/productsModel'; 

class ProductsController{
	//CRUD
	public async list(req:Request,res:Response){
		console.log(req.body);
        const productos = await productsModel.listar();
        console.log(productos);
        return res.json(productos);
        //res.send('Listado de productos!!!');
	}

	public async find(req:Request,res:Response){
		console.log(req.params.id);
        const { id } = req.params;
        const producto = await productsModel.buscarId(id);
        if (producto)
            return res.json(producto);
        res.status(404).json({ text: "Products doesn't exists" });
	}

	public async addProduct(req:Request,res:Response){
		const producto = req.body;       
        console.log(req.body);
        //res.send('Usuario agregado!!!');
        const busqueda = await productsModel.buscarCodigo(producto.codigo);
        if (!busqueda) {
            const result = await productsModel.crear(producto);
            return res.json({ message: 'Product saved!!' });
        }
        return res.json({ message: 'Product exists!!' });
	}

	public async update(req:Request,res:Response){
		console.log(req.body);
        const { id } = req.params;
        const result = await productsModel.actualizar(req.body, id);
        //res.send('Usuario '+ req.params.id +' actualizado!!!');
        return res.json({ text: 'updating a product ' + id });
	}

	public async delete(req:Request,res:Response){
		console.log(req.body);
        //res.send('Usuario '+ req.params.id +' Eliminado!!!');
        const { id } = req.params; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.
        const result = await productsModel.eliminar(id);
        return res.json({ text: 'deleting a user ' + id });
	}
	//FIN CRUD

    public async control(req:Request,res:Response){
		//res.send('Controles');
        const productos = await productsModel.listar();
        const products = productos;
        res.render('partials/products', { products: productos });		
	}
}

const productsController = new ProductsController(); 
export default productsController;