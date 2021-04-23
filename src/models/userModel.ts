import {createPool} from 'mysql2/promise';
	export async function connect(){
		const connection = await createPool({
			host: 'us-cdbr-east-03.cleardb.com',
			user: 'b0e0fd43ed8818',
			password:'2b1f9d39',
			database: 'heroku_4505cc56058eb11',
			connectionLimit: 10
		});
	return connection; //devolvemos el manejador de conexion
}