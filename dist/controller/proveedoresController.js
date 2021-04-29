"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const listado = [
    { "id": "1", "proveedor": "Vidrieria Tato's", "telefono": "1168874588" },
    { "id": "2", "proveedor": "Accesorios para tu Pecera", "telefono": "1168874594" },
    { "id": "3", "proveedor": "Herramientas", "telefono": "1168874523" }
];
const proveedoresModel_1 = __importDefault(require("../models/proveedoresModel"));
class proveedoresController {
    //CRUD
    addProveedor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = req.body;
            delete usuario.repassword;
            console.log(req.body);
            //res.send('Usuario agregado!!!');
            const busqueda = yield proveedoresModel_1.default.buscarNombre(usuario.nombre);
            if (!busqueda) {
                const result = yield proveedoresModel_1.default.crear(usuario);
                return res.json({ message: 'Proveedor saved!!' });
            }
            return res.json({ message: 'Proveedor exists!!' });
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const usuarios = yield proveedoresModel_1.default.listar();
            console.log(usuarios);
            return res.json(usuarios);
            //res.send('Listado de usuarios!!!');
        });
    }
    find(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.params.id);
            const { id } = req.params;
            const usuario = yield proveedoresModel_1.default.buscarId(id);
            if (usuario)
                return res.json(usuario);
            res.status(404).json({ text: "Proveedor doesn't exists" });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const { id } = req.params;
            const result = yield proveedoresModel_1.default.actualizar(req.body, id);
            //res.send('Usuario '+ req.params.id +' actualizado!!!');
            return res.json({ text: 'updating Proveedor ' + id });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            //res.send('Usuario '+ req.params.id +' Eliminado!!!');
            const { id } = req.params; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.
            const result = yield proveedoresModel_1.default.eliminar(id);
            return res.json({ text: 'deleting Proveedor' + id });
        });
    }
    //FIN CRUD
    control(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //res.send('Controles');
            const proveedores = yield proveedoresModel_1.default.listar();
            const proveedor = proveedores;
            res.render('partials/proveedores', { proveedor: proveedores });
        });
    }
}
const ProveedoresController = new proveedoresController();
exports.default = ProveedoresController;
//# sourceMappingURL=proveedoresController.js.map