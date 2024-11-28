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
exports.EstudianteClaseController = void 0;
const EstudianteClaseService_1 = require("../services/EstudianteClaseService");
class EstudianteClaseController {
    constructor() {
        this.estudianteClaseService = new EstudianteClaseService_1.EstudianteClaseService();
    }
    getAllEstudiantesClase(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const estudiantesClase = yield this.estudianteClaseService.getAllEstudiantesClase();
                res.json(estudiantesClase);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    getEstudianteClaseById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_clase, id_estudiante } = req.params;
                const estudianteClase = yield this.estudianteClaseService.getEstudianteClaseById(Number(id_clase), Number(id_estudiante));
                if (estudianteClase) {
                    res.json(estudianteClase);
                }
                else {
                    res.status(404).json({ message: "Estudiante no encontrado en la clase especificada" });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    addEstudianteToClase(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const nuevaRelacion = yield this.estudianteClaseService.addEstudianteToClase(req.body);
                res.status(201).json(nuevaRelacion);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    removeEstudianteFromClase(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_clase, id_estudiante } = req.params;
                const result = yield this.estudianteClaseService.removeEstudianteFromClase(Number(id_clase), Number(id_estudiante));
                if (result) {
                    res.json({ message: "Estudiante eliminado de la clase" });
                }
                else {
                    res.status(404).json({ message: "Estudiante o clase no encontrada" });
                }
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    updateEstudianteClase(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_clase, id_estudiante } = req.params;
                const data = req.body;
                const updatedRelacion = yield this.estudianteClaseService.updateEstudianteClase(Number(id_clase), Number(id_estudiante), data);
                if (updatedRelacion) {
                    res.json(updatedRelacion);
                }
                else {
                    res.status(404).json({ message: "Estudiante no encontrado en la clase especificada" });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.EstudianteClaseController = EstudianteClaseController;
