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
exports.Grupo = void 0;
const typeorm_1 = require("typeorm");
const Tarea_1 = require("../../tareas/entities/Tarea");
const EstudianteClaseGrupo_1 = require("../../estudiantes_clases_grupos/entities/EstudianteClaseGrupo");
const Responsabilidad_1 = require("../../responsabilidades/entities/Responsabilidad");
const Comentario_1 = require("../../comentarios/entities/Comentario");
let Grupo = class Grupo {
};
exports.Grupo = Grupo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Grupo.prototype, "id_grupo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", nullable: true }),
    __metadata("design:type", Object)
], Grupo.prototype, "id_lider", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", default: 0 }),
    __metadata("design:type", Number)
], Grupo.prototype, "integrantes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "float", default: 0 }),
    __metadata("design:type", Number)
], Grupo.prototype, "porcentaje_progreso", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int" }),
    __metadata("design:type", Number)
], Grupo.prototype, "capacidad", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Grupo.prototype, "fecha_creacion", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Grupo.prototype, "ultima_actualizacion", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Tarea_1.Tarea, (tarea) => tarea.grupos),
    __metadata("design:type", Tarea_1.Tarea)
], Grupo.prototype, "tarea", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => EstudianteClaseGrupo_1.EstudianteClaseGrupo, (estClaseGrupo) => estClaseGrupo.grupo),
    __metadata("design:type", Array)
], Grupo.prototype, "estudiantesClaseGrupo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Responsabilidad_1.Responsabilidad, (responsabilidad) => responsabilidad.grupo),
    __metadata("design:type", Array)
], Grupo.prototype, "responsabilidades", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Comentario_1.Comentario, (comentario) => comentario.grupo),
    __metadata("design:type", Array)
], Grupo.prototype, "comentarios", void 0);
exports.Grupo = Grupo = __decorate([
    (0, typeorm_1.Entity)("Grupos")
], Grupo);
