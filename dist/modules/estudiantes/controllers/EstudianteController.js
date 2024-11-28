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
exports.EstudianteController = void 0;
const EstudianteService_1 = require("../services/EstudianteService");
class EstudianteController {
    constructor() {
        this.estudianteService = new EstudianteService_1.EstudianteService();
    }
    getAllEstudiantes(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const estudiantes = yield this.estudianteService.getAllEstudiantes();
                res.json(estudiantes);
            }
            catch (error) {
                next(error);
            }
        });
    }
    createEstudiante(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const estudiante = yield this.estudianteService.createEstudiante(req.body);
                res.status(201).json(estudiante);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getEstudianteById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const estudiante = yield this.estudianteService.getEstudianteById(Number(id));
                if (!estudiante) {
                    res.status(404).json({ message: "Estudiante no encontrado" });
                }
                else {
                    res.json(estudiante);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateEstudiante(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const updatedEstudiante = yield this.estudianteService.updateEstudiante(Number(id), req.body);
                if (!updatedEstudiante) {
                    res.status(404).json({ message: "Estudiante no encontrado" });
                }
                else {
                    res.json(updatedEstudiante);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteEstudiante(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const result = yield this.estudianteService.deleteEstudiante(Number(id));
                if (result) {
                    res.json({ message: "Estudiante eliminado correctamente" });
                }
                else {
                    res.status(404).json({ message: "Estudiante no encontrado" });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.EstudianteController = EstudianteController;
