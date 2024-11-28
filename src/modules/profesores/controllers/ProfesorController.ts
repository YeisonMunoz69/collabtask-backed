import { Request, Response, NextFunction } from "express";
import { ProfesorService } from "../services/ProfesorService";

export class ProfesorController {
    private profesorService: ProfesorService;

    constructor() {
        this.profesorService = new ProfesorService();
    }

    async getAllProfesores(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const profesores = await this.profesorService.getAllProfesores();
            res.json(profesores);
        } catch (error) {
            next(error);
        }
    }

    async createProfesor(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const profesor = await this.profesorService.createProfesor(req.body);
            res.status(201).json(profesor);
        } catch (error) {
            next(error);
        }
    }

    async getProfesorById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const profesor = await this.profesorService.getProfesorById(Number(id));
            if (!profesor) {
                res.status(404).json({ message: "Profesor no encontrado" });
            } else {
                res.json(profesor);
            }
        } catch (error) {
            next(error);
        }
    }

    async updateProfesor(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const updatedProfesor = await this.profesorService.updateProfesor(Number(id), req.body);
            if (!updatedProfesor) {
                res.status(404).json({ message: "Profesor no encontrado" });
            } else {
                res.json(updatedProfesor);
            }
        } catch (error) {
            next(error);
        }
    }

    async deleteProfesor(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const result = await this.profesorService.deleteProfesor(Number(id));
            if (result) {
                res.json({ message: "Profesor eliminado correctamente" });
            } else {
                res.status(404).json({ message: "Profesor no encontrado" });
            }
        } catch (error) {
            next(error);
        }
    }
}
