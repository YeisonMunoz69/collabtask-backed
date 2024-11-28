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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComentarioController = void 0;
const ComentarioService_1 = require("../services/ComentarioService");
const errorHandler_1 = require("../../../utils/errorHandler");
class ComentarioController {
    constructor() {
        this.comentarioService = new ComentarioService_1.ComentarioService();
    }
    getComentariosByGrupo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_grupo } = req.params;
                const comentarios = yield this.comentarioService.getComentariosByGrupo(Number(id_grupo));
                res.json(comentarios);
            }
            catch (error) {
                const { status, message } = (0, errorHandler_1.errorHandler)(error);
                res.status(status).json({ message });
            }
        });
    }
    createComentario(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const nuevoComentario = yield this.comentarioService.createComentario(req.body);
                res.status(201).json(nuevoComentario);
            }
            catch (error) {
                const { status, message } = (0, errorHandler_1.errorHandler)(error);
                res.status(status).json({ message });
            }
        });
    }
    deleteComentario(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_comentario } = req.params;
                const eliminado = yield this.comentarioService.deleteComentario(Number(id_comentario));
                if (eliminado) {
                    res.json({ message: "Comentario eliminado correctamente" });
                }
                else {
                    res.status(404).json({ message: "Comentario no encontrado" });
                }
            }
            catch (error) {
                const { status, message } = (0, errorHandler_1.errorHandler)(error);
                res.status(status).json({ message });
            }
        });
    }
}
exports.ComentarioController = ComentarioController;
