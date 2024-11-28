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
exports.EstudianteClaseGrupo = void 0;
const typeorm_1 = require("typeorm");
const Grupo_1 = require("../../grupos/entities/Grupo");
const EstudianteClase_1 = require("../../estudiantes_clases/entities/EstudianteClase");
const Comentario_1 = require("../../comentarios/entities/Comentario");
let EstudianteClaseGrupo = class EstudianteClaseGrupo {
};
exports.EstudianteClaseGrupo = EstudianteClaseGrupo;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], EstudianteClaseGrupo.prototype, "id_grupo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Grupo_1.Grupo, (grupo) => grupo.estudiantesClaseGrupo, { onDelete: "CASCADE" }),
    __metadata("design:type", Grupo_1.Grupo)
], EstudianteClaseGrupo.prototype, "grupo", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], EstudianteClaseGrupo.prototype, "id_estudiante_clase", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => EstudianteClase_1.EstudianteClase, (estClase) => estClase.estudianteClaseGrupos, { onDelete: "CASCADE" }),
    __metadata("design:type", EstudianteClase_1.EstudianteClase)
], EstudianteClaseGrupo.prototype, "estudianteClase", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date", default: () => "CURRENT_DATE" }),
    __metadata("design:type", Date)
], EstudianteClaseGrupo.prototype, "fecha_ingreso", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", nullable: true }) // Cambiar "Object" a "int"
    ,
    __metadata("design:type", Object)
], EstudianteClaseGrupo.prototype, "id_lider", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Comentario_1.Comentario, (comentario) => comentario.estudianteGrupo),
    __metadata("design:type", Array)
], EstudianteClaseGrupo.prototype, "comentarios", void 0);
exports.EstudianteClaseGrupo = EstudianteClaseGrupo = __decorate([
    (0, typeorm_1.Entity)("Estudiantes_Clases_Grupo")
], EstudianteClaseGrupo);
