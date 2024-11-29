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
exports.GrupoController = void 0;
const GrupoService_1 = require("../services/GrupoService");
const errorHandler_1 = require("../../../utils/errorHandler");
class GrupoController {
    constructor() {
        this.grupoService = new GrupoService_1.GrupoService();
    }
    getAllGrupos(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const grupos = yield this.grupoService.getAllGrupos();
                res.json(grupos);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    getEstudiantesByGrupoId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_grupo } = req.params;
                const estudiantes = yield this.grupoService.getEstudiantesByGrupoId(Number(id_grupo));
                res.json(estudiantes.map(est => ({
                    id_estudiante: est.estudianteClase.estudiante.id_estudiante,
                    nombres: est.estudianteClase.estudiante.nombres,
                    apellidos: est.estudianteClase.estudiante.apellidos,
                    email_institucional: est.estudianteClase.estudiante.email_institucional,
                }))); // Personaliza los datos que quieras retornar
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    getGruposByClaseAndTarea(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_clase, id_tarea } = req.params;
                const grupos = yield this.grupoService.getGruposByClaseAndTarea(Number(id_clase), Number(id_tarea));
                res.json(grupos.map(grupo => ({
                    id_grupo: grupo.id_grupo,
                    id_lider: grupo.id_lider,
                    integrantes: grupo.integrantes,
                    porcentaje_progreso: grupo.porcentaje_progreso,
                    capacidad: grupo.capacidad,
                    fecha_creacion: grupo.fecha_creacion,
                    ultima_actualizacion: grupo.ultima_actualizacion,
                    tarea: {
                        id_tarea: grupo.tarea.id_tarea,
                        titulo: grupo.tarea.titulo,
                        clase: {
                            id_clase: grupo.tarea.clase.id_clase,
                            nombre: grupo.tarea.clase.nombre,
                        },
                    },
                }))); // Personaliza los datos que quieras retornar
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    assignLider(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_grupo } = req.params;
                const { id_estudiante_clase } = req.body;
                const grupoActualizado = yield this.grupoService.assignLider(Number(id_grupo), Number(id_estudiante_clase));
                res.json({
                    message: "Líder asignado exitosamente.",
                    grupo: grupoActualizado,
                });
            }
            catch (error) {
                const { status, message } = (0, errorHandler_1.errorHandler)(error);
                res.status(status).json({ message });
            }
        });
    }
    getGrupoByIdAndTarea(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_grupo, id_tarea } = req.params;
                const grupo = yield this.grupoService.getGrupoByIdAndTarea(Number(id_grupo), Number(id_tarea));
                if (!grupo) {
                    res.status(404).json({ message: "Grupo no encontrado o no pertenece a la tarea especificada" });
                }
                else {
                    res.json(grupo);
                }
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    createGrupo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const nuevoGrupo = yield this.grupoService.createGrupo(req.body);
                res.status(201).json(nuevoGrupo);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    addEstudianteToGrupo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_grupo, id_estudiante_clase } = req.body;
                const grupoActualizado = yield this.grupoService.addEstudianteToGrupo(Number(id_grupo), Number(id_estudiante_clase));
                res.status(200).json(grupoActualizado);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    updateGrupo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const data = req.body;
                const grupoActualizado = yield this.grupoService.updateGrupo(Number(id), data);
                if (!grupoActualizado) {
                    res.status(404).json({ message: "Grupo no encontrado" });
                }
                else {
                    res.json(grupoActualizado);
                }
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    deleteGrupo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const result = yield this.grupoService.deleteGrupo(Number(id));
                if (result) {
                    res.json({ message: "Grupo eliminado correctamente" });
                }
                else {
                    res.status(404).json({ message: "Grupo no encontrado" });
                }
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
}
exports.GrupoController = GrupoController;
