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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClaseController = void 0;
const ClaseService_1 = require("../services/ClaseService");
class ClaseController {
    constructor() {
        this.claseService = new ClaseService_1.ClaseService();
    }
    getAllClases(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clases = yield this.claseService.getAllClases();
                res.json(clases);
            }
            catch (error) {
                next(error);
            }
        });
    }
    createClase(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const nuevaClase = yield this.claseService.createClase(req.body);
                res.status(201).json(nuevaClase);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getClaseById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const clase = yield this.claseService.getClaseById(Number(id));
                if (clase) {
                    res.json(clase);
                }
                else {
                    res.status(404).json({ message: "Clase no encontrada" });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    getClasesByProfesorId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_profesor } = req.params;
                const clases = yield this.claseService.getClasesByProfesorId(Number(id_profesor));
                res.json(clases);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getClasesByCodigoProfesor(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { codigo_profesor } = req.params;
                const clases = yield this.claseService.getClasesByCodigoProfesor(codigo_profesor);
                res.json(clases);
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateClase(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const data = req.body;
                const updatedClase = yield this.claseService.updateClase(Number(id), data);
                if (updatedClase) {
                    res.json(updatedClase);
                }
                else {
                    res.status(404).json({ message: "Clase no encontrada" });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteClase(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const eliminado = yield this.claseService.deleteClase(Number(id));
                if (eliminado) {
                    res.json({ message: "Clase eliminada correctamente" });
                }
                else {
                    res.status(404).json({ message: "Clase no encontrada" });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.ClaseController = ClaseController;
