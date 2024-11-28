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
exports.EstudianteClaseService = void 0;
const database_1 = __importDefault(require("../../../config/database"));
const EstudianteClase_1 = require("../entities/EstudianteClase");
const Clase_1 = require("../../clases/entities/Clase");
const Estudiante_1 = require("../../estudiantes/entities/Estudiante");
class EstudianteClaseService {
    constructor() {
        this.estudianteClaseRepository = database_1.default.getRepository(EstudianteClase_1.EstudianteClase);
        this.claseRepository = database_1.default.getRepository(Clase_1.Clase);
        this.estudianteRepository = database_1.default.getRepository(Estudiante_1.Estudiante);
    }
    getAllEstudiantesClase() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.estudianteClaseRepository.find({ relations: ["clase", "estudiante"] });
        });
    }
    getEstudianteClaseById(id_clase, id_estudiante) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.estudianteClaseRepository.findOne({
                where: { id_clase, id_estudiante },
                relations: ["clase", "estudiante"]
            });
        });
    }
    addEstudianteToClase(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // Verificar que la clase exista
            const clase = yield this.claseRepository.findOne({
                where: { id_clase: data.id_clase },
            });
            if (!clase) {
                throw new Error("Clase no encontrada");
            }
            // Verificar que el estudiante exista
            const estudiante = yield this.estudianteRepository.findOne({
                where: { id_estudiante: data.id_estudiante },
            });
            if (!estudiante) {
                throw new Error("Estudiante no encontrado");
            }
            // Verificar que el estudiante no esté ya en la clase
            const estudianteEnClase = yield this.estudianteClaseRepository.findOne({
                where: { id_clase: clase.id_clase, id_estudiante: estudiante.id_estudiante },
            });
            if (estudianteEnClase) {
                throw new Error("El estudiante ya está inscrito en la clase");
            }
            // Agregar estudiante a la clase
            const nuevaRelacion = this.estudianteClaseRepository.create({
                id_clase: clase.id_clase,
                id_estudiante: estudiante.id_estudiante,
                fecha_ingreso: new Date(),
                clase: clase,
                estudiante: estudiante,
            });
            yield this.estudianteClaseRepository.save(nuevaRelacion);
            // Actualizar el número de estudiantes en la clase
            clase.numero_estudiantes += 1;
            yield this.claseRepository.save(clase);
            return nuevaRelacion;
        });
    }
    removeEstudianteFromClase(id_clase, id_estudiante) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.estudianteClaseRepository.delete({
                id_clase,
                id_estudiante,
            });
            if (result.affected) {
                // Actualizar el número de estudiantes en la clase
                const clase = yield this.claseRepository.findOne({
                    where: { id_clase },
                });
                if (clase) {
                    clase.numero_estudiantes -= 1;
                    yield this.claseRepository.save(clase);
                }
                return true;
            }
            return false;
        });
    }
    //De momento no se usa bien porque no funcionó el correctamente
    updateEstudianteClase(id_clase, id_estudiante, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const estudianteClase = yield this.estudianteClaseRepository.findOne({ where: { id_clase, id_estudiante } });
            if (!estudianteClase) {
                return null;
            }
            Object.assign(estudianteClase, data);
            return yield this.estudianteClaseRepository.save(estudianteClase);
        });
    }
}
exports.EstudianteClaseService = EstudianteClaseService;
