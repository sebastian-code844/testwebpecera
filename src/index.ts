import express, {Application} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import indexRoutes from './routes/indexRoutes';
import exphbs from "express-handlebars";
import path from "path";
import userRoutes from './routes/userRoutes';

class Server{
	public app:Application;
	constructor(){
		this.app = express();
		
		this.config();
		this.routes();
	}
	config():void{
		//Configuraciones
		this.app.set('port',process.env.PORT || 3000);		
        this.app.set('views',path.join(__dirname,'views')); //indicamos que views esta en dist y no en el modulo principal
		this.app.engine('.hbs',exphbs({ //nombre del motor, configuracion
			defaultLayout:'main',
			layoutsDir: path.join(this.app.get('views'),'layouts'),
			partialsDir: path.join(this.app.get('views'),'partials'),
			extname: 'hbs', //definimos la extension de los archivos
			helpers: require('./lib/handlebars') //definimos donde estan los helpers
		}));
		this.app.set('view engine','.hbs'); //ejecutamos el modulo definido

        //Middlewares
        this.app.use(morgan('dev'));
        this.app.use(cors()); //iniciamos cors
        this.app.use(express.json()); //habilitamos el intercambio de objetos json entre aplicaciones
        this.app.use(express.urlencoded({extended:true}));//Paso 21 - habilitamos para recibir datos a traves de formularios html.
		//this.app.use(express.static('public'));

		// Archivos Publicos
		this.app.use(express.static(path.join(__dirname, 'public'))); //metodo usado para indicar donde esta la carpeta public		

		// Variables globales
	}
	// Rutas de la app
	routes():void{
        this.app.use(indexRoutes);
		this.app.use("/user",userRoutes); //user sera un objeto existene en la app.	
		
    }
	start():void{
		this.app.listen(this.app.get('port'),() => {
				console.log("Sever escuchando"+this.app.get('port'));
			}
		);
	}
}

const server = new Server();
server.start(); //Ejecutamos el metodo start en inica el server