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
exports.GrupoService = void 0;
const database_1 = __importDefault(require("../../../config/database"));
const Grupo_1 = require("../entities/Grupo");
const Tarea_1 = require("../../tareas/entities/Tarea");
const EstudianteClaseGrupo_1 = require("../../estudiantes_clases_grupos/entities/EstudianteClaseGrupo");
class GrupoService {
    constructor() {
        this.grupoRepository = database_1.default.getRepository(Grupo_1.Grupo);
        this.tareaRepository = database_1.default.getRepository(Tarea_1.Tarea);
        this.estudianteClaseGrupoRepository = database_1.default.getRepository(EstudianteClaseGrupo_1.EstudianteClaseGrupo);
    }
    getAllGrupos() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.grupoRepository.find({ relations: ["tarea"] });
        });
    }
    getGrupoByIdAndTarea(id_grupo, id_tarea) {
        return __awaiter(this, void 0, void 0, function* () {
            const grupo = yield this.grupoRepository.findOne({
                where: { id_grupo, tarea: { id_tarea } },
                relations: [
                    "tarea",
                    "estudiantesClaseGrupo",
                    "estudiantesClaseGrupo.estudianteClase",
                    "estudiantesClaseGrupo.estudianteClase.estudiante",
                ],
            });
            return grupo;
        });
    }
    getEstudiantesByGrupoId(id_grupo) {
        return __awaiter(this, void 0, void 0, function* () {
            // Buscar todas las relaciones de estudiantes en el grupo
            const estudiantesEnGrupo = yield this.estudianteClaseGrupoRepository.find({
                where: { id_grupo },
                relations: [
                    "estudianteClase",
                    "estudianteClase.estudiante", // Relación directa para acceder al estudiante
                ],
            });
            if (!estudiantesEnGrupo.length) {
                throw new Error("No hay estudiantes en este grupo o el grupo no existe");
            }
            return estudiantesEnGrupo;
        });
    }
    getGruposByClaseAndTarea(id_clase, id_tarea) {
        return __awaiter(this, void 0, void 0, function* () {
            // Buscar grupos relacionados con la tarea y clase
            const grupos = yield this.grupoRepository.find({
                where: {
                    tarea: { id_tarea, clase: { id_clase } },
                },
                relations: ["tarea", "tarea.clase"],
            });
            if (!grupos.length) {
                throw new Error("No se encontraron grupos para la clase y tarea especificadas");
            }
            return grupos;
        });
    }
    createGrupo(data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const tarea = yield this.tareaRepository.findOne({ where: { id_tarea: (_a = data.tarea) === null || _a === void 0 ? void 0 : _a.id_tarea } });
            if (!tarea) {
                throw new Error("Tarea no encontrada");
            }
            const nuevoGrupo = this.grupoRepository.create({
                tarea,
                integrantes: 0,
                porcentaje_progreso: 0,
                ultima_actualizacion: new Date(),
                capacidad: data.capacidad,
                id_lider: null,
            });
            return yield this.grupoRepository.save(nuevoGrupo);
        });
    }
    addEstudianteToGrupo(id_grupo, id_estudiante_clase) {
        return __awaiter(this, void 0, void 0, function* () {
            const grupo = yield this.grupoRepository.findOne({ where: { id_grupo } });
            if (!grupo) {
                throw new Error("Grupo no encontrado");
            }
            if (grupo.integrantes >= grupo.capacidad) {
                throw new Error("El grupo ya está lleno");
            }
            const nuevaRelacion = this.estudianteClaseGrupoRepository.create({
                id_grupo,
                id_estudiante_clase,
                fecha_ingreso: new Date(),
            });
            yield this.estudianteClaseGrupoRepository.save(nuevaRelacion);
            grupo.integrantes += 1;
            grupo.ultima_actualizacion = new Date();
            return yield this.grupoRepository.save(grupo);
        });
    }
    assignLider(id_grupo, id_estudiante_clase) {
        return __awaiter(this, void 0, void 0, function* () {
            // Verificar que el grupo existe
            const grupo = yield this.grupoRepository.findOne({ where: { id_grupo } });
            if (!grupo) {
                throw new Error("Grupo no encontrado.");
            }
            // Verificar que el estudiante pertenece al grupo
            const estudianteEnGrupo = yield this.estudianteClaseGrupoRepository.findOne({
                where: { id_grupo, id_estudiante_clase },
            });
            if (!estudianteEnGrupo) {
                throw new Error("El estudiante no pertenece a este grupo.");
            }
            // Asignar el líder
            grupo.id_lider = id_estudiante_clase;
            grupo.ultima_actualizacion = new Date(); // Actualizar la fecha de última modificación
            yield this.grupoRepository.save(grupo);
            return grupo;
        });
    }
    updateGrupo(id_grupo, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const grupo = yield this.grupoRepository.findOne({ where: { id_grupo } });
            if (!grupo) {
                return null;
            }
            // Actualizar los datos del grupo
            Object.assign(grupo, data);
            return yield this.grupoRepository.save(grupo);
        });
    }
    deleteGrupo(id_grupo) {
        return __awaiter(this, void 0, void 0, function* () {
            const grupo = yield this.grupoRepository.findOne({ where: { id_grupo } });
            if (!grupo) {
                throw new Error("Grupo no encontrado");
            }
            yield this.estudianteClaseGrupoRepository.delete({ id_grupo });
            const result = yield this.grupoRepository.delete(id_grupo);
            return result.affected !== 0;
        });
    }
}
exports.GrupoService = GrupoService;
