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
exports.ResponsabilidadController = void 0;
const ResponsabilidadService_1 = require("../services/ResponsabilidadService");
class ResponsabilidadController {
    constructor() {
        this.responsabilidadService = new ResponsabilidadService_1.ResponsabilidadService();
    }
    getAllResponsabilidades(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const responsabilidades = yield this.responsabilidadService.getAllResponsabilidades();
                res.json(responsabilidades);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    createResponsabilidad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const responsabilidad = yield this.responsabilidadService.createResponsabilidad(req.body);
                res.status(201).json(responsabilidad);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    updateResponsabilidad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_responsabilidad } = req.params;
                const responsabilidad = yield this.responsabilidadService.updateResponsabilidad(Number(id_responsabilidad), req.body);
                res.json(responsabilidad);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    deleteResponsabilidad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_responsabilidad } = req.params;
                const eliminado = yield this.responsabilidadService.deleteResponsabilidad(Number(id_responsabilidad));
                if (eliminado) {
                    res.json({ message: "Responsabilidad eliminada correctamente" });
                }
                else {
                    res.status(404).json({ message: "Responsabilidad no encontrada" });
                }
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
}
exports.ResponsabilidadController = ResponsabilidadController;
