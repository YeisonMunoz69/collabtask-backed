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
exports.ComentarioService = void 0;
const database_1 = __importDefault(require("../../../config/database"));
const Comentario_1 = require("../entities/Comentario");
const Grupo_1 = require("../../grupos/entities/Grupo");
const EstudianteClaseGrupo_1 = require("../../estudiantes_clases_grupos/entities/EstudianteClaseGrupo");
class ComentarioService {
    constructor() {
        this.comentarioRepository = database_1.default.getRepository(Comentario_1.Comentario);
        this.grupoRepository = database_1.default.getRepository(Grupo_1.Grupo);
        this.estudianteClaseGrupoRepository = database_1.default.getRepository(EstudianteClaseGrupo_1.EstudianteClaseGrupo);
    }
    getComentariosByGrupo(id_grupo) {
        return __awaiter(this, void 0, void 0, function* () {
            const grupo = yield this.grupoRepository.findOne({ where: { id_grupo } });
            if (!grupo) {
                throw new Error("Grupo no encontrado");
            }
            return yield this.comentarioRepository.find({
                where: { grupo: { id_grupo } },
                relations: ["grupo", "estudianteGrupo"],
                order: { fecha_comentario: "DESC" },
            });
        });
    }
    createComentario(data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            // Verificar que el grupo existe
            const grupo = yield this.grupoRepository.findOne({
                where: { id_grupo: (_a = data.grupo) === null || _a === void 0 ? void 0 : _a.id_grupo },
            });
            if (!grupo) {
                throw new Error("Grupo no encontrado");
            }
            // Verificar que el estudiante pertenece al grupo
            const estudianteGrupo = yield this.estudianteClaseGrupoRepository.findOne({
                where: {
                    id_grupo: (_b = data.grupo) === null || _b === void 0 ? void 0 : _b.id_grupo,
                    id_estudiante_clase: (_c = data.estudianteGrupo) === null || _c === void 0 ? void 0 : _c.id_estudiante_clase,
                },
            });
            if (!estudianteGrupo) {
                throw new Error("El estudiante no pertenece al grupo");
            }
            // Crear y guardar el comentario asegurando referencias correctas
            const nuevoComentario = this.comentarioRepository.create({
                contenido: data.contenido,
                grupo: grupo, // Relación directa al grupo
                estudianteGrupo: estudianteGrupo, // Relación directa al estudiante en el grupo
            });
            return yield this.comentarioRepository.save(nuevoComentario);
        });
    }
    deleteComentario(id_comentario) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.comentarioRepository.delete({ id_comentario });
            return result.affected !== 0;
        });
    }
}
exports.ComentarioService = ComentarioService;
