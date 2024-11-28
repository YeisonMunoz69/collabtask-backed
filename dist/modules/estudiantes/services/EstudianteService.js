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
exports.EstudianteService = void 0;
const database_1 = __importDefault(require("../../../config/database"));
const Estudiante_1 = require("../entities/Estudiante");
class EstudianteService {
    constructor() {
        this.estudianteRepository = database_1.default.getRepository(Estudiante_1.Estudiante);
    }
    getAllEstudiantes() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.estudianteRepository.find();
        });
    }
    createEstudiante(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const nuevoEstudiante = this.estudianteRepository.create(data);
            return yield this.estudianteRepository.save(nuevoEstudiante);
        });
    }
    getEstudianteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.estudianteRepository.findOneBy({ id_estudiante: id });
        });
    }
    updateEstudiante(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const estudiante = yield this.estudianteRepository.findOneBy({ id_estudiante: id });
            if (estudiante) {
                Object.assign(estudiante, data);
                return yield this.estudianteRepository.save(estudiante);
            }
            return null;
        });
    }
    deleteEstudiante(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.estudianteRepository.delete(id);
            return result.affected !== 0;
        });
    }
}
exports.EstudianteService = EstudianteService;
