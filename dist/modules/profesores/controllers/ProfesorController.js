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
exports.ProfesorController = void 0;
const ProfesorService_1 = require("../services/ProfesorService");
class ProfesorController {
    constructor() {
        this.profesorService = new ProfesorService_1.ProfesorService();
    }
    getAllProfesores(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const profesores = yield this.profesorService.getAllProfesores();
                res.json(profesores);
            }
            catch (error) {
                next(error);
            }
        });
    }
    createProfesor(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const profesor = yield this.profesorService.createProfesor(req.body);
                res.status(201).json(profesor);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getProfesorById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const profesor = yield this.profesorService.getProfesorById(Number(id));
                if (!profesor) {
                    res.status(404).json({ message: "Profesor no encontrado" });
                }
                else {
                    res.json(profesor);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateProfesor(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const updatedProfesor = yield this.profesorService.updateProfesor(Number(id), req.body);
                if (!updatedProfesor) {
                    res.status(404).json({ message: "Profesor no encontrado" });
                }
                else {
                    res.json(updatedProfesor);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteProfesor(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const result = yield this.profesorService.deleteProfesor(Number(id));
                if (result) {
                    res.json({ message: "Profesor eliminado correctamente" });
                }
                else {
                    res.status(404).json({ message: "Profesor no encontrado" });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.ProfesorController = ProfesorController;
