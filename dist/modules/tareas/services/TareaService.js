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
exports.TareaService = void 0;
const database_1 = __importDefault(require("../../../config/database"));
const Tarea_1 = require("../entities/Tarea");
const Clase_1 = require("../../clases/entities/Clase");
const Grupo_1 = require("../../grupos/entities/Grupo");
const EstudianteClase_1 = require("../../estudiantes_clases/entities/EstudianteClase");
class TareaService {
    constructor() {
        this.tareaRepository = database_1.default.getRepository(Tarea_1.Tarea);
        this.claseRepository = database_1.default.getRepository(Clase_1.Clase);
        this.grupoRepository = database_1.default.getRepository(Grupo_1.Grupo);
        this.estudianteClaseRepository = database_1.default.getRepository(EstudianteClase_1.EstudianteClase);
    }
    getAllTareas() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.tareaRepository.find({ relations: ["clase"] });
        });
    }
    getTareaById(id_tarea) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.tareaRepository.findOne({ where: { id_tarea }, relations: ["clase"] });
        });
    }
    getTareasByClaseId(id_clase) {
        return __awaiter(this, void 0, void 0, function* () {
            // Verificar si la clase existe
            const clase = yield this.claseRepository.findOne({ where: { id_clase } });
            if (!clase) {
                throw new Error("Clase no encontrada.");
            }
            // Obtener todas las tareas relacionadas con la clase
            const tareas = yield this.tareaRepository.find({
                where: { clase: { id_clase } },
                relations: ["clase"], // Opcional, incluye detalles de la clase si son necesarios
            });
            return tareas;
        });
    }
    createTarea(data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            // Verificar que la clase exista
            const clase = yield this.claseRepository.findOne({ where: { id_clase: (_a = data.clase) === null || _a === void 0 ? void 0 : _a.id_clase } });
            if (!clase) {
                throw new Error("Clase no encontrada");
            }
            // Crear la tarea
            const nuevaTarea = this.tareaRepository.create(Object.assign(Object.assign({}, data), { clase }));
            const tareaGuardada = yield this.tareaRepository.save(nuevaTarea);
            // Crear grupos automáticamente
            const estudiantesEnClase = yield this.estudianteClaseRepository.find({ where: { id_clase: clase.id_clase } });
            if (!estudiantesEnClase.length) {
                throw new Error("No hay estudiantes en la clase para asignar grupos");
            }
            const numeroEstudiantes = estudiantesEnClase.length;
            const numeroGrupos = data.numero_grupos || 1;
            const capacidadPorGrupo = Math.ceil(numeroEstudiantes / numeroGrupos);
            for (let i = 0; i < numeroGrupos; i++) {
                const nuevoGrupo = this.grupoRepository.create({
                    tarea: tareaGuardada,
                    id_lider: null, // El líder se asignará posteriormente
                    integrantes: 0, // Inicialmente vacíos
                    porcentaje_progreso: 0,
                    ultima_actualizacion: new Date(),
                    capacidad: capacidadPorGrupo,
                });
                yield this.grupoRepository.save(nuevoGrupo);
            }
            return tareaGuardada;
        });
    }
    deleteTarea(id_tarea) {
        return __awaiter(this, void 0, void 0, function* () {
            // Eliminar grupos relacionados con la tarea
            const grupos = yield this.grupoRepository.find({ where: { tarea: { id_tarea } } });
            if (grupos.length) {
                yield this.grupoRepository.remove(grupos);
            }
            // Eliminar la tarea
            const result = yield this.tareaRepository.delete(id_tarea);
            return result.affected !== 0;
        });
    }
}
exports.TareaService = TareaService;
