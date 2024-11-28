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
exports.Profesor = void 0;
const typeorm_1 = require("typeorm");
const Clase_1 = require("../../clases/entities/Clase");
let Profesor = class Profesor {
};
exports.Profesor = Profesor;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Profesor.prototype, "id_profesor", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Profesor.prototype, "nombres", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Profesor.prototype, "apellidos", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, length: 100 }),
    __metadata("design:type", String)
], Profesor.prototype, "email_institucional", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, length: 20 }),
    __metadata("design:type", String)
], Profesor.prototype, "codigo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Clase_1.Clase, (clase) => clase.profesor),
    __metadata("design:type", Array)
], Profesor.prototype, "clases", void 0);
exports.Profesor = Profesor = __decorate([
    (0, typeorm_1.Entity)("Profesores")
], Profesor);
