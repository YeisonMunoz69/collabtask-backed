import { Request, Response, NextFunction } from "express";
import { TareaService } from "../services/TareaService";

export class TareaController {
    private tareaService: TareaService;

    constructor() {
        this.tareaService = new TareaService();
    }

    async getAllTareas(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const tareas = await this.tareaService.getAllTareas();
            res.json(tareas);
        } catch (error: unknown) {
            res.status(400).json({ message: (error as Error).message });
        }
    }

    async createTarea(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const nuevaTarea = await this.tareaService.createTarea(req.body);
            res.status(201).json(nuevaTarea);
        } catch (error: unknown) {
            res.status(400).json({ message: (error as Error).message });
        }
    }

    async deleteTarea(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const result = await this.tareaService.deleteTarea(Number(id));
            if (result) {
                res.json({ message: "Tarea eliminada correctamente" });
            } else {
                res.status(404).json({ message: "Tarea no encontrada" });
            }
        } catch (error: unknown) {
            res.status(400).json({ message: (error as Error).message });
        }
    }

    async getTareaById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id_tarea } = req.params;
            const tarea = await this.tareaService.getTareaById(Number(id_tarea));
            if (tarea) {
                res.json(tarea);
            } else {
                res.status(404).json({ message: "Tarea no encontrada" });
            }
        } catch (error) {
            next(error);
        }
    }
}
