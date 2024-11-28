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
exports.ProfesorService = void 0;
const database_1 = __importDefault(require("../../../config/database"));
const Profesor_1 = require("../entities/Profesor");
class ProfesorService {
    constructor() {
        this.profesorRepository = database_1.default.getRepository(Profesor_1.Profesor);
    }
    getAllProfesores() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.profesorRepository.find();
        });
    }
    createProfesor(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const nuevoProfesor = this.profesorRepository.create(data);
            return yield this.profesorRepository.save(nuevoProfesor);
        });
    }
    getProfesorById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.profesorRepository.findOneBy({ id_profesor: id });
        });
    }
    updateProfesor(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const profesor = yield this.profesorRepository.findOneBy({ id_profesor: id });
            if (profesor) {
                Object.assign(profesor, data);
                return yield this.profesorRepository.save(profesor);
            }
            return null;
        });
    }
    deleteProfesor(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.profesorRepository.delete(id);
            return result.affected !== 0;
        });
    }
}
exports.ProfesorService = ProfesorService;
