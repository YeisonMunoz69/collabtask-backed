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
exports.EstudianteClaseGrupoService = void 0;
const database_1 = __importDefault(require("../../../config/database"));
const EstudianteClaseGrupo_1 = require("../entities/EstudianteClaseGrupo");
const Grupo_1 = require("../../grupos/entities/Grupo");
const EstudianteClase_1 = require("../../estudiantes_clases/entities/EstudianteClase");
class EstudianteClaseGrupoService {
    constructor() {
        this.estudianteClaseGrupoRepository = database_1.default.getRepository(EstudianteClaseGrupo_1.EstudianteClaseGrupo);
    }
    getAllEstudiantesClaseGrupo() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.estudianteClaseGrupoRepository.find({ relations: ["grupo", "estudianteClase"] });
        });
    }
    createEstudianteClaseGrupo(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_grupo, id_clase, id_estudiante } = data;
            // Verificar que el grupo existe
            const grupo = yield database_1.default.getRepository(Grupo_1.Grupo).findOne({
                where: { id_grupo },
                relations: ["tarea", "tarea.clase"],
            });
            if (!grupo) {
                throw new Error("Grupo no encontrado.");
            }
            // Verificar que el grupo no haya excedido su capacidad
            const integrantesActuales = yield this.estudianteClaseGrupoRepository.count({
                where: { id_grupo },
            });
            if (integrantesActuales >= grupo.capacidad) {
                throw new Error("La capacidad del grupo ha sido alcanzada.");
            }
            // Verificar que el estudiante pertenece a la clase
            const estudianteClase = yield database_1.default.getRepository(EstudianteClase_1.EstudianteClase).findOne({
                where: { id_clase, id_estudiante },
            });
            if (!estudianteClase) {
                throw new Error("El estudiante no pertenece a la clase especificada.");
            }
            // Verificar que el estudiante no está ya en otro grupo de la misma tarea
            const yaEnGrupo = yield this.estudianteClaseGrupoRepository.findOne({
                where: {
                    id_estudiante_clase: estudianteClase.id_estudiante,
                    grupo: { tarea: grupo.tarea },
                },
                relations: ["grupo", "grupo.tarea"],
            });
            if (yaEnGrupo) {
                throw new Error("El estudiante ya pertenece a un grupo de esta tarea.");
            }
            // Crear la nueva relación con id_lider = 0
            const nuevaRelacion = this.estudianteClaseGrupoRepository.create({
                id_grupo: grupo.id_grupo,
                grupo: grupo,
                id_estudiante_clase: estudianteClase.id_estudiante, // Asignar el ID directamente
                estudianteClase: estudianteClase, // Relación completa
                fecha_ingreso: new Date(),
                id_lider: 0, // Líder predeterminado
            });
            const nuevaRelacionGuardada = yield this.estudianteClaseGrupoRepository.save(nuevaRelacion);
            // Actualizar la cantidad de integrantes del grupo
            grupo.integrantes += 1;
            yield database_1.default.getRepository(Grupo_1.Grupo).save(grupo);
            return nuevaRelacionGuardada;
        });
    }
    deleteEstudianteClaseGrupo(id_grupo, id_estudiante) {
        return __awaiter(this, void 0, void 0, function* () {
            const estudianteClaseGrupo = yield this.estudianteClaseGrupoRepository.findOne({
                where: {
                    id_grupo,
                    id_estudiante_clase: id_estudiante,
                },
                relations: ["grupo"],
            });
            if (!estudianteClaseGrupo) {
                throw new Error("El estudiante no pertenece a este grupo o el grupo no existe.");
            }
            // Eliminar la relación
            const result = yield this.estudianteClaseGrupoRepository.delete({
                id_grupo,
                id_estudiante_clase: id_estudiante,
            });
            if (result.affected) {
                // Actualizar el número de integrantes del grupo
                estudianteClaseGrupo.grupo.integrantes -= 1;
                yield database_1.default.getRepository(Grupo_1.Grupo).save(estudianteClaseGrupo.grupo);
                return true;
            }
            return false;
        });
    }
}
exports.EstudianteClaseGrupoService = EstudianteClaseGrupoService;
