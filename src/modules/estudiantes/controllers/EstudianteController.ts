import { Request, Response, NextFunction } from "express";
import { EstudianteService } from "../services/EstudianteService";

export class EstudianteController {
    private estudianteService: EstudianteService;

    constructor() {
        this.estudianteService = new EstudianteService();
    }

    async getAllEstudiantes(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const estudiantes = await this.estudianteService.getAllEstudiantes();
            res.json(estudiantes);
        } catch (error) {
            next(error);
        }
    }

    async createEstudiante(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const estudiante = await this.estudianteService.createEstudiante(req.body);
            res.status(201).json(estudiante);
        } catch (error) {
            next(error);
        }
    }

    async getEstudianteById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const estudiante = await this.estudianteService.getEstudianteById(Number(id));
            if (!estudiante) {
                res.status(404).json({ message: "Estudiante no encontrado" });
            } else {
                res.json(estudiante);
            }
        } catch (error) {
            next(error);
        }
    }

    async updateEstudiante(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const updatedEstudiante = await this.estudianteService.updateEstudiante(Number(id), req.body);
            if (!updatedEstudiante) {
                res.status(404).json({ message: "Estudiante no encontrado" });
            } else {
                res.json(updatedEstudiante);
            }
        } catch (error) {
            next(error);
        }
    }

    async deleteEstudiante(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const result = await this.estudianteService.deleteEstudiante(Number(id));
            if (result) {
                res.json({ message: "Estudiante eliminado correctamente" });
            } else {
                res.status(404).json({ message: "Estudiante no encontrado" });
            }
        } catch (error) {
            next(error);
        }
    }
}
