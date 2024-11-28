import { Request, Response, NextFunction } from "express";
import { ComentarioService } from "../services/ComentarioService";
import { errorHandler } from "../../../utils/errorHandler";

export class ComentarioController {
    private comentarioService: ComentarioService;

    constructor() {
        this.comentarioService = new ComentarioService();
    }

    async getComentariosByGrupo(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id_grupo } = req.params;
            const comentarios = await this.comentarioService.getComentariosByGrupo(Number(id_grupo));
            res.json(comentarios);
        } catch (error) {
            const { status, message } = errorHandler(error);
            res.status(status).json({ message });
        }
    }

    async createComentario(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const nuevoComentario = await this.comentarioService.createComentario(req.body);
            res.status(201).json(nuevoComentario);
        } catch (error) {
            const { status, message } = errorHandler(error);
            res.status(status).json({ message });
        }
    }

    async deleteComentario(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id_comentario } = req.params;
            const eliminado = await this.comentarioService.deleteComentario(Number(id_comentario));
            if (eliminado) {
                res.json({ message: "Comentario eliminado correctamente" });
            } else {
                res.status(404).json({ message: "Comentario no encontrado" });
            }
        } catch (error) {
            const { status, message } = errorHandler(error);
            res.status(status).json({ message });
        }
    }
}
