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
            res.send('Main!!!');
            //res.render("partials/principal");               
        });
        /*this.router.get('/signin',(req:Request,res:Response)=> {
            res.send('Sign In!!!');
            //res.render("partials/principal");
        }); //El msj ahora esta en userController*/ //Paso 9
        this.router.get('/signin', userController_1.default.signin);
        this.router.post('/signin', userController_1.default.login); //Paso 15
        //registro - Paso 18
        this.router.get('/signup', userController_1.default.signup);
        this.router.post('/signup', userController_1.default.addUser);
        //Home del usuario
        /*this.router.get('/home',(req:Request,res:Response)=> {
            res.send('Bienvenido!!!')});*/
        this.router.get('/home', userController_1.default.home);
    }
}
//Exportamos el enrutador con 
const userRoutes = new UserRoutes();
exports.default = userRoutes.router;
//# sourceMappingURL=userRoutes.js.map