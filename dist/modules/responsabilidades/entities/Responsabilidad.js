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
exports.Responsabilidad = void 0;
const typeorm_1 = require("typeorm");
const Grupo_1 = require("../../grupos/entities/Grupo");
const EstudianteClaseGrupo_1 = require("../../estudiantes_clases_grupos/entities/EstudianteClaseGrupo");
let Responsabilidad = class Responsabilidad {
};
exports.Responsabilidad = Responsabilidad;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Responsabilidad.prototype, "id_responsabilidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200 }),
    __metadata("design:type", String)
], Responsabilidad.prototype, "titulo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Responsabilidad.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: ["Pendiente", "En progreso", "Finalizada"],
        default: "Pendiente",
    }),
    __metadata("design:type", String)
], Responsabilidad.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date" }),
    __metadata("design:type", Date)
], Responsabilidad.prototype, "fecha_limite", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Grupo_1.Grupo, (grupo) => grupo.responsabilidades, { onDelete: "CASCADE" }),
    __metadata("design:type", Grupo_1.Grupo)
], Responsabilidad.prototype, "grupo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => EstudianteClaseGrupo_1.EstudianteClaseGrupo, { onDelete: "SET NULL" }),
    __metadata("design:type", EstudianteClaseGrupo_1.EstudianteClaseGrupo)
], Responsabilidad.prototype, "estudianteClaseGrupo", void 0);
exports.Responsabilidad = Responsabilidad = __decorate([
    (0, typeorm_1.Entity)("Responsabilidades")
], Responsabilidad);
