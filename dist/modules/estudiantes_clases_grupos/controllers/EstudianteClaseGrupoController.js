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
exports.EstudianteClaseGrupoController = void 0;
const EstudianteClaseGrupoService_1 = require("../services/EstudianteClaseGrupoService");
const errorHandler_1 = require("../../../utils/errorHandler");
class EstudianteClaseGrupoController {
    constructor() {
        this.estudianteClaseGrupoService = new EstudianteClaseGrupoService_1.EstudianteClaseGrupoService();
    }
    getAllEstudiantesClaseGrupo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const estudiantesGrupos = yield this.estudianteClaseGrupoService.getAllEstudiantesClaseGrupo();
                res.json(estudiantesGrupos);
            }
            catch (error) {
                const { status, message } = (0, errorHandler_1.errorHandler)(error);
                res.status(status).json({ message });
            }
        });
    }
    createEstudianteClaseGrupo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const nuevaRelacion = yield this.estudianteClaseGrupoService.createEstudianteClaseGrupo(req.body);
                res.status(201).json({
                    id_grupo: nuevaRelacion.id_grupo,
                    id_estudiante: nuevaRelacion.estudianteClase.id_estudiante,
                    fecha_ingreso: nuevaRelacion.fecha_ingreso,
                    clase: nuevaRelacion.grupo.tarea.clase.nombre,
                    tarea: nuevaRelacion.grupo.tarea.titulo,
                    estudiante: nuevaRelacion.estudianteClase.estudiante.nombres,
                });
            }
            catch (error) {
                const { status, message } = (0, errorHandler_1.errorHandler)(error);
                res.status(status).json({ message });
            }
        });
    }
    deleteEstudianteClaseGrupo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_grupo, id_estudiante } = req.params;
                const eliminado = yield this.estudianteClaseGrupoService.deleteEstudianteClaseGrupo(Number(id_grupo), Number(id_estudiante));
                if (eliminado) {
                    res.json({ message: "Estudiante eliminado del grupo correctamente." });
                }
                else {
                    res.status(404).json({ message: "Relación no encontrada." });
                }
            }
            catch (error) {
                const { status, message } = (0, errorHandler_1.errorHandler)(error);
                res.status(status).json({ message });
            }
        });
    }
}
exports.EstudianteClaseGrupoController = EstudianteClaseGrupoController;
