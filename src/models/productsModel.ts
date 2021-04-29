import { createPool } from 'mysql2/promise';

class ProductsModel {
	private db: any;
	constructor() {
		this.config(); //aplicamos la conexion con la BD.
	}

	async config() {//Parametro de conexion con la BD.
		this.db = await createPool({
			host: 'localhost',
			user: 'root',
			password:'',
			database: 'heroku_4505cc56058eb11',
			connectionLimit: 10
		});
	}

	async listar() {//Devuelve todas las filas de la tabla producto
		//const db=this.connection;
		const productos = await this.db.query('SELECT * FROM producto');
		//console.log(productos[0]);
		//devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
		return productos[0];
	}

	//Devuelve un objeto cuya fila en la tabla productos coincide con id.
	//Si no la encuentra devuelve null
	async buscarId(id: string) {
		const encontrado: any = await this.db.query('SELECT * FROM producto WHERE Id = ?', [id]);
		//Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
		if (encontrado.length > 1)
			return encontrado[0][0];
		return null;
	}
	
    //Devuelve un objeto cuya fila en la tabla productos coincide con nombre.
	//Si no la encuentra devuelve null
	async buscarCodigo(codigo: string) {
		const encontrado: any = await this.db.query('SELECT * FROM producto WHERE CodigoProducto = ?', [codigo]);
		//Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
		if (encontrado.length > 1)
			return encontrado[0][0];
		return null;
	}

	//Devuelve 1 si logro crear un nuevo producto de la tabla productos
	async crear(producto: object) {
		const result = (await this.db.query('INSERT INTO producto SET ?', [producto]))[0].affectedRows;
		console.log(result);
		return result;
	}

	//Devuelve 1 si logro actualizar el usuario indicado por id
	async actualizar(producto: object, id: string) {
		const result = (await this.db.query('UPDATE producto SET ? WHERE Id = ?', [producto, id]))[0].affectedRows;
		console.log(result);
		return result;
	}

	//Devuelve 1 si logro eliminar el producto indicado por id
	async eliminar(id: string) {
		const user = (await this.db.query('DELETE FROM producto WHERE Id = ?', [id]))[0].affectedRows;
		console.log(user);
		return user;
	}
}

//Exportamos el enrutador con 
const productsModel: ProductsModel = new ProductsModel();
export default productsModel;