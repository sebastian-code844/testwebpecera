"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const proveedoresController_1 = __importDefault(require("../controller/proveedoresController"));
class proveedoresRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => {
            //res.send('Proveedores!!! Fibertel y la re concha de tu vieja');
            res.render("partials/proveedores");
            //res.render("partials/principal");
        });
        //CRUD
        //CRUD
        this.router.get('/list', proveedoresController_1.default.list);
        this.router.get('/find/:id', proveedoresController_1.default.find);
        this.router.post('/add', proveedoresController_1.default.addProveedor);
        this.router.put('/update/:id', proveedoresController_1.default.update);
        this.router.delete('/delete/:id', proveedoresController_1.default.delete);
        //Fin de crud
        this.router.get('/controles', proveedoresController_1.default.control);
    }
}
//Exportamos el enrutador con 
const ProveedoresRoutes = new proveedoresRoutes();
exports.default = ProveedoresRoutes.router;
//# sourceMappingURL=proveedorRoutes.js.map