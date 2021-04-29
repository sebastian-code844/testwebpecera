"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clientController_1 = __importDefault(require("../controller/clientController")); //ruta relativa
class UserRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //se asocian rutas con el metodo de una clase existente:
        this.router.get('/', (req, res) => {
            res.send('Clients!!!');
            //res.render("partials/principal");               
        });
        //CRUD
        this.router.get('/list', clientController_1.default.list);
        this.router.get('/find/:id', clientController_1.default.find);
        this.router.post('/add', clientController_1.default.addClient);
        this.router.put('/update/:id', clientController_1.default.update);
        this.router.delete('/delete/:id', clientController_1.default.delete);
        // FIN CRUD
        this.router.get('/control', clientController_1.default.control);
    }
}
//Exportamos el enrutador con 
const clientRoutes = new UserRoutes();
exports.default = clientRoutes.router;
//# sourceMappingURL=clientRoutes.js.map