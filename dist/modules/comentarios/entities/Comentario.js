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
exports.Comentario = void 0;
const typeorm_1 = require("typeorm");
const Grupo_1 = require("../../grupos/entities/Grupo");
const EstudianteClaseGrupo_1 = require("../../estudiantes_clases_grupos/entities/EstudianteClaseGrupo");
let Comentario = class Comentario {
};
exports.Comentario = Comentario;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Comentario.prototype, "id_comentario", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], Comentario.prototype, "contenido", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Comentario.prototype, "fecha_comentario", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Grupo_1.Grupo, (grupo) => grupo.comentarios, { onDelete: "CASCADE" }),
    __metadata("design:type", Grupo_1.Grupo)
], Comentario.prototype, "grupo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => EstudianteClaseGrupo_1.EstudianteClaseGrupo, (estudianteGrupo) => estudianteGrupo.comentarios, { onDelete: "CASCADE" }),
    __metadata("design:type", EstudianteClaseGrupo_1.EstudianteClaseGrupo)
], Comentario.prototype, "estudianteGrupo", void 0);
exports.Comentario = Comentario = __decorate([
    (0, typeorm_1.Entity)("Comentarios")
], Comentario);
