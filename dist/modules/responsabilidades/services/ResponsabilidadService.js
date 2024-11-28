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
exports.ResponsabilidadService = void 0;
const database_1 = __importDefault(require("../../../config/database"));
const Responsabilidad_1 = require("../entities/Responsabilidad");
const Grupo_1 = require("../../grupos/entities/Grupo");
const EstudianteClaseGrupo_1 = require("../../estudiantes_clases_grupos/entities/EstudianteClaseGrupo");
class ResponsabilidadService {
    constructor() {
        this.responsabilidadRepository = database_1.default.getRepository(Responsabilidad_1.Responsabilidad);
        this.grupoRepository = database_1.default.getRepository(Grupo_1.Grupo);
    }
    getAllResponsabilidades() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.responsabilidadRepository.find({ relations: ["grupo", "estudianteClaseGrupo"] });
        });
    }
    getResponsabilidadById(id_responsabilidad) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.responsabilidadRepository.findOne({
                where: { id_responsabilidad },
                relations: ["grupo", "estudianteClaseGrupo"],
            });
        });
    }
    getResponsabilidadesByGrupo(id_grupo) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.responsabilidadRepository.find({
                where: { grupo: { id_grupo } },
                relations: ["grupo", "estudianteClaseGrupo"],
            });
        });
    }
    createResponsabilidad(data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const grupo = yield this.grupoRepository.findOne({ where: { id_grupo: (_a = data.grupo) === null || _a === void 0 ? void 0 : _a.id_grupo } });
            if (!grupo) {
                throw new Error("Grupo no encontrado");
            }
            const estudianteGrupo = yield database_1.default.getRepository(EstudianteClaseGrupo_1.EstudianteClaseGrupo).findOne({
                where: {
                    id_grupo: grupo.id_grupo,
                    id_estudiante_clase: (_b = data.estudianteClaseGrupo) === null || _b === void 0 ? void 0 : _b.id_estudiante_clase,
                },
            });
            if (!estudianteGrupo) {
                throw new Error("El estudiante no pertenece al grupo");
            }
            const nuevaResponsabilidad = this.responsabilidadRepository.create({
                titulo: data.titulo,
                descripcion: data.descripcion,
                estado: "Pendiente",
                fecha_limite: data.fecha_limite,
                grupo: grupo,
                estudianteClaseGrupo: estudianteGrupo,
            });
            const responsabilidadGuardada = yield this.responsabilidadRepository.save(nuevaResponsabilidad);
            // Actualizar progreso del grupo
            yield this.updateGrupoProgress(grupo.id_grupo);
            return responsabilidadGuardada;
        });
    }
    updateResponsabilidad(id_responsabilidad, data) {
        return __awaiter(this, void 0, void 0, function* () {
            // Buscar la responsabilidad junto con su grupo
            const responsabilidad = yield this.responsabilidadRepository.findOne({
                where: { id_responsabilidad },
                relations: ["grupo"], // Asegurar la relación con el grupo
            });
            if (!responsabilidad) {
                throw new Error("Responsabilidad no encontrada");
            }
            // Actualizar los datos de la responsabilidad
            Object.assign(responsabilidad, data);
            const savedResponsabilidad = yield this.responsabilidadRepository.save(responsabilidad);
            // Recalcular el porcentaje de progreso del grupo si la responsabilidad pertenece a un grupo
            if (responsabilidad.grupo) {
                const grupo = responsabilidad.grupo;
                // Obtener todas las responsabilidades del grupo
                const responsabilidades = yield this.responsabilidadRepository.find({
                    where: { grupo: { id_grupo: grupo.id_grupo } },
                });
                // Calcular el porcentaje de progreso
                const totalResponsabilidades = responsabilidades.length;
                const progreso = responsabilidades.reduce((acc, resp) => {
                    if (resp.estado === "Pendiente") {
                        return acc + 0;
                    }
                    else if (resp.estado === "En progreso") {
                        return acc + 0.1;
                    }
                    else if (resp.estado === "Finalizada") {
                        return acc + 0.2;
                    }
                    return acc;
                }, 0) / totalResponsabilidades;
                grupo.porcentaje_progreso = Math.round(progreso * 100);
                // Guardar el progreso actualizado en el grupo
                yield this.grupoRepository.save(grupo);
            }
            return savedResponsabilidad;
        });
    }
    deleteResponsabilidad(id_responsabilidad) {
        return __awaiter(this, void 0, void 0, function* () {
            const responsabilidad = yield this.getResponsabilidadById(id_responsabilidad);
            if (!responsabilidad) {
                throw new Error("Responsabilidad no encontrada");
            }
            const result = yield this.responsabilidadRepository.delete(id_responsabilidad);
            if (result.affected) {
                // Actualizar progreso del grupo
                yield this.updateGrupoProgress(responsabilidad.grupo.id_grupo);
                return true;
            }
            return false;
        });
    }
    updateGrupoProgress(id_grupo) {
        return __awaiter(this, void 0, void 0, function* () {
            const responsabilidades = yield this.getResponsabilidadesByGrupo(id_grupo);
            if (responsabilidades.length === 0) {
                return; // No hay responsabilidades, progreso = 0
            }
            const totalResponsabilidades = responsabilidades.length;
            const progreso = responsabilidades.reduce((acc, res) => {
                switch (res.estado) {
                    case "Finalizada":
                        return acc + 1;
                    case "En progreso":
                        return acc + 0.5;
                    default:
                        return acc;
                }
            }, 0);
            const porcentajeProgreso = (progreso / totalResponsabilidades) * 100;
            const grupo = yield this.grupoRepository.findOneBy({ id_grupo });
            if (grupo) {
                grupo.porcentaje_progreso = Math.round(porcentajeProgreso);
                yield this.grupoRepository.save(grupo);
            }
        });
    }
}
exports.ResponsabilidadService = ResponsabilidadService;
