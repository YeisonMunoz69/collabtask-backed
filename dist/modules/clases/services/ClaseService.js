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
exports.ClaseService = void 0;
const database_1 = __importDefault(require("../../../config/database"));
const Clase_1 = require("../entities/Clase");
const Profesor_1 = require("../../profesores/entities/Profesor");
class ClaseService {
    constructor() {
        this.claseRepository = database_1.default.getRepository(Clase_1.Clase);
        this.profesorRepository = database_1.default.getRepository(Profesor_1.Profesor);
    }
    getAllClases() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.claseRepository.find({ relations: ["profesor"] });
        });
    }
    createClase(data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            // Validar que se envíe un ID de profesor
            if (!((_a = data.profesor) === null || _a === void 0 ? void 0 : _a.id_profesor)) {
                throw new Error("ID de profesor es requerido");
            }
            // Verificar que el profesor exista
            const profesor = yield this.profesorRepository.findOne({
                where: { id_profesor: data.profesor.id_profesor },
            });
            if (!profesor) {
                throw new Error("Profesor no encontrado");
            }
            // Crear la clase asignando el profesor por referencia
            const nuevaClase = this.claseRepository.create({
                nombre: data.nombre,
                carrera: data.carrera,
                salon: data.salon,
                horario: data.horario,
                numero_estudiantes: 0, // Inicialmente no hay estudiantes
                profesor, // Asignamos el objeto profesor directamente
            });
            return yield this.claseRepository.save(nuevaClase);
        });
    }
    getClaseById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.claseRepository.findOne({
                where: { id_clase: id },
                relations: ["profesor"],
            });
        });
    }
    getClasesByProfesorId(id_profesor) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.claseRepository.find({
                where: { profesor: { id_profesor } },
                relations: ["profesor"],
            });
        });
    }
    getClasesByCodigoProfesor(codigo_profesor) {
        return __awaiter(this, void 0, void 0, function* () {
            const profesor = yield this.profesorRepository.findOne({
                where: { codigo: codigo_profesor },
                relations: ["clases"],
            });
            if (!profesor) {
                throw new Error("Profesor no encontrado");
            }
            return profesor.clases;
        });
    }
    updateClase(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const clase = yield this.claseRepository.findOneBy({ id_clase: id });
            if (!clase) {
                throw new Error("Clase no encontrada");
            }
            // Si se está actualizando el profesor, validar que exista
            if ((_a = data.profesor) === null || _a === void 0 ? void 0 : _a.id_profesor) {
                const profesor = yield this.profesorRepository.findOne({
                    where: { id_profesor: data.profesor.id_profesor },
                });
                if (!profesor) {
                    throw new Error("Profesor no encontrado");
                }
                clase.profesor = profesor;
            }
            // Actualizar los datos restantes
            Object.assign(clase, data);
            return yield this.claseRepository.save(clase);
        });
    }
    deleteClase(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.claseRepository.delete(id);
            return result.affected !== 0;
        });
    }
}
exports.ClaseService = ClaseService;
