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
exports.Tarea = void 0;
const typeorm_1 = require("typeorm");
const Clase_1 = require("../../clases/entities/Clase");
const Grupo_1 = require("../../grupos/entities/Grupo");
let Tarea = class Tarea {
};
exports.Tarea = Tarea;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Tarea.prototype, "id_tarea", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200 }),
    __metadata("design:type", String)
], Tarea.prototype, "titulo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Tarea.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Tarea.prototype, "objetivos", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Tarea.prototype, "contenido", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date" }),
    __metadata("design:type", Date)
], Tarea.prototype, "fecha_entrega", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Tarea.prototype, "numero_grupos", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Clase_1.Clase, (clase) => clase.tareas, { onDelete: "CASCADE" }),
    __metadata("design:type", Clase_1.Clase)
], Tarea.prototype, "clase", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Grupo_1.Grupo, (grupo) => grupo.tarea),
    __metadata("design:type", Array)
], Tarea.prototype, "grupos", void 0);
exports.Tarea = Tarea = __decorate([
    (0, typeorm_1.Entity)("Tareas")
], Tarea);
