"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productsController_1 = __importDefault(require("../controller/productsController")); //ruta relativa
class ProductsRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //se asocian rutas con el metodo de una clase existente:
        this.router.get('/', (req, res) => {
            res.send('Products!!!');
        });
        //CRUD
        this.router.get('/list', productsController_1.default.list);
        this.router.get('/find/:id', productsController_1.default.find);
        this.router.post('/add', productsController_1.default.addProduct);
        this.router.put('/update/:id', productsController_1.default.update);
        this.router.delete('/delete/:id', productsController_1.default.delete);
        // FIN CRUD        
        this.router.get('/control', productsController_1.default.control);
    }
}
//Exportamos el enrutador con 
const productsRoutes = new ProductsRoutes();
exports.default = productsRoutes.router;
//# sourceMappingURL=productsRoutes.js.map