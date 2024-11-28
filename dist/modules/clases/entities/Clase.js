"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Clase = void 0;
const typeorm_1 = require("typeorm");
const Profesor_1 = require("../../profesores/entities/Profesor");
const EstudianteClase_1 = require("../../estudiantes_clases/entities/EstudianteClase");
const Tarea_1 = require("../../tareas/entities/Tarea");
let Clase = class Clase {
};
exports.Clase = Clase;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Clase.prototype, "id_clase", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Clase.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Clase.prototype, "carrera", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], Clase.prototype, "salon", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], Clase.prototype, "horario", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Clase.prototype, "numero_estudiantes", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Profesor_1.Profesor, (profesor) => profesor.clases),
    __metadata("design:type", Profesor_1.Profesor)
], Clase.prototype, "profesor", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => EstudianteClase_1.EstudianteClase, (estudianteClase) => estudianteClase.clase),
    __metadata("design:type", Array)
], Clase.prototype, "estudiantes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Tarea_1.Tarea, (tarea) => tarea.clase),
    __metadata("design:type", Array)
], Clase.prototype, "tareas", void 0);
exports.Clase = Clase = __decorate([
    (0, typeorm_1.Entity)("Clases")
], Clase);
