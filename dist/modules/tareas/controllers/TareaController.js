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
exports.TareaController = void 0;
const TareaService_1 = require("../services/TareaService");
class TareaController {
    constructor() {
        this.tareaService = new TareaService_1.TareaService();
    }
    getAllTareas(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tareas = yield this.tareaService.getAllTareas();
                res.json(tareas);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    getTareasByClaseId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_clase } = req.params;
                const tareas = yield this.tareaService.getTareasByClaseId(Number(id_clase));
                res.json(tareas);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    createTarea(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const nuevaTarea = yield this.tareaService.createTarea(req.body);
                res.status(201).json(nuevaTarea);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    deleteTarea(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const result = yield this.tareaService.deleteTarea(Number(id));
                if (result) {
                    res.json({ message: "Tarea eliminada correctamente" });
                }
                else {
                    res.status(404).json({ message: "Tarea no encontrada" });
                }
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    getTareaById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_tarea } = req.params;
                const tarea = yield this.tareaService.getTareaById(Number(id_tarea));
                if (tarea) {
                    res.json(tarea);
                }
                else {
                    res.status(404).json({ message: "Tarea no encontrada" });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.TareaController = TareaController;
