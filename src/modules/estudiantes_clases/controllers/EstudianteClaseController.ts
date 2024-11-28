import { Request, Response, NextFunction } from "express";
import { EstudianteClaseService } from "../services/EstudianteClaseService";

export class EstudianteClaseController {
    private estudianteClaseService: EstudianteClaseService;

    constructor() {
        this.estudianteClaseService = new EstudianteClaseService();
    }

    async getAllEstudiantesClase(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const estudiantesClase = await this.estudianteClaseService.getAllEstudiantesClase();
            res.json(estudiantesClase);
        } catch (error: unknown) {
            res.status(400).json({ message: (error as Error).message });
        }
    }

    async getEstudianteClaseById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id_clase, id_estudiante } = req.params;
            const estudianteClase = await this.estudianteClaseService.getEstudianteClaseById(Number(id_clase), Number(id_estudiante));
            if (estudianteClase) {
                res.json(estudianteClase);
            } else {
                res.status(404).json({ message: "Estudiante no encontrado en la clase especificada" });
            }
        } catch (error) {
            next(error);
        }
    }

    async addEstudianteToClase(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const nuevaRelacion = await this.estudianteClaseService.addEstudianteToClase(req.body);
            res.status(201).json(nuevaRelacion);
        } catch (error: unknown) {
            res.status(400).json({ message: (error as Error).message });
        }
    }

    async removeEstudianteFromClase(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id_clase, id_estudiante } = req.params;
            const result = await this.estudianteClaseService.removeEstudianteFromClase(
                Number(id_clase),
                Number(id_estudiante)
            );

            if (result) {
                res.json({ message: "Estudiante eliminado de la clase" });
            } else {
                res.status(404).json({ message: "Estudiante o clase no encontrada" });
            }
        } catch (error: unknown) {
            res.status(400).json({ message: (error as Error).message });
        }
    }

    async updateEstudianteClase(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id_clase, id_estudiante } = req.params;
            const data = req.body;
            const updatedRelacion = await this.estudianteClaseService.updateEstudianteClase(Number(id_clase), Number(id_estudiante), data);
            if (updatedRelacion) {
                res.json(updatedRelacion);
            } else {
                res.status(404).json({ message: "Estudiante no encontrado en la clase especificada" });
            }
        } catch (error) {
            next(error);
        }
    }

}
