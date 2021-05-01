"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controller/userController")); //ruta relativa
class UserRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //se asocian rutas con el metodo de una clase existente:
        this.router.get('/', (req, res) => {
            //res.send('Main!!!');
            res.render("partials/home"); /// cuando entre a /user renderiza a user/home                  
        });
        /*this.router.get('/signin',(req:Request,res:Response)=> {
            res.send('Sign In!!!');
            //res.render("partials/principal");
        }); //El msj ahora esta en userController*/ //Paso 9
        this.router.get('/signin', userController_1.default.signin);
        this.router.post('/signin', userController_1.default.login); //Paso 15
        //registro
        this.router.get('/signup', userController_1.default.signup);
        this.router.post('/signup', userController_1.default.addUser);
        //Home del usuario
        /*this.router.get('/home',(req:Request,res:Response)=> {
            res.send('Bienvenido!!!')});*/
        this.router.get('/home', userController_1.default.home);
        //CRUD
        this.router.get('/list', userController_1.default.list);
        this.router.get('/find/:id', userController_1.default.find);
        this.router.post('/add', userController_1.default.addUser);
        this.router.put('/update/:id', userController_1.default.update); // envio datos
        /*
       this.router.get('/update/:id',userController.update); // tarea dibujo vista
       this.router.post('/update/:id',userController.update); // tarea update x saveChanges ejecuta update bd
       */
        this.router.delete('/delete/:id', userController_1.default.delete);
        this.router.get('/delete/:id', userController_1.default.delete); // Paso 19 ruta para delete de control.hbs
        // FIN CRUD
        this.router.get('/control', userController_1.default.control);
        this.router.post('/procesar', userController_1.default.procesar);
        this.router.get('/salir', userController_1.default.endSession); // Paso 8
        this.router.get('/error', userController_1.default.showError); // Paso 14  
    }
}
//Exportamos el enrutador con 
const userRoutes = new UserRoutes();
exports.default = userRoutes.router;
//# sourceMappingURL=userRoutes.js.map