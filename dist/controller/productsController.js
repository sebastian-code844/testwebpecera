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
const productsModel_1 = __importDefault(require("../models/productsModel"));
class ProductsController {
    //CRUD
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const productos = yield productsModel_1.default.listar();
            console.log(productos);
            return res.json(productos);
            //res.send('Listado de productos!!!');
        });
    }
    find(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.params.id);
            const { id } = req.params;
            const producto = yield productsModel_1.default.buscarId(id);
            if (producto)
                return res.json(producto);
            res.status(404).json({ text: "Products doesn't exists" });
        });
    }
    addProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const producto = req.body;
            console.log(req.body);
            //res.send('Usuario agregado!!!');
            const busqueda = yield productsModel_1.default.buscarCodigo(producto.codigo);
            if (!busqueda) {
                const result = yield productsModel_1.default.crear(producto);
                return res.json({ message: 'Product saved!!' });
            }
            return res.json({ message: 'Product exists!!' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const { id } = req.params;
            const result = yield productsModel_1.default.actualizar(req.body, id);
            //res.send('Usuario '+ req.params.id +' actualizado!!!');
            return res.json({ text: 'updating a product ' + id });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            //res.send('Usuario '+ req.params.id +' Eliminado!!!');
            const { id } = req.params; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.
            const result = yield productsModel_1.default.eliminar(id);
            return res.json({ text: 'deleting a user ' + id });
        });
    }
    //FIN CRUD
    control(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //res.send('Controles');
            const productos = yield productsModel_1.default.listar();
            const products = productos;
            res.render('partials/products', { products: productos });
        });
    }
}
const productsController = new ProductsController();
exports.default = productsController;
//# sourceMappingURL=productsController.js.map