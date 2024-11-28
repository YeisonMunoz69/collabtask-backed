import { Request, Response, NextFunction } from "express";
import { ClaseService } from "../services/ClaseService";

export class ClaseController {
    private claseService: ClaseService;

    constructor() {
        this.claseService = new ClaseService();
    }

    async getAllClases(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const clases = await this.claseService.getAllClases();
            res.json(clases);
        } catch (error) {
            next(error);
        }
    }

    async createClase(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const nuevaClase = await this.claseService.createClase(req.body);
            res.status(201).json(nuevaClase);
        } catch (error) {
            next(error);
        }
    }

    async getClaseById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const clase = await this.claseService.getClaseById(Number(id));
            if (clase) {
                res.json(clase);
            } else {
                res.status(404).json({ message: "Clase no encontrada" });
            }
        } catch (error) {
            next(error);
        }
    }

    async getClasesByProfesorId(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id_profesor } = req.params;
            const clases = await this.claseService.getClasesByProfesorId(Number(id_profesor));
            res.json(clases);
        } catch (error) {
            next(error);
        }
    }

    async getClasesByCodigoProfesor(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { codigo_profesor } = req.params;
            const clases = await this.claseService.getClasesByCodigoProfesor(codigo_profesor);
            res.json(clases);
        } catch (error) {
            next(error);
        }
    }


    async updateClase(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const data = req.body;
            const updatedClase = await this.claseService.updateClase(Number(id), data);
            if (updatedClase) {
                res.json(updatedClase);
            } else {
                res.status(404).json({ message: "Clase no encontrada" });
            }
        } catch (error) {
            next(error);
        }
    }

    async deleteClase(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const eliminado = await this.claseService.deleteClase(Number(id));
            if (eliminado) {
                res.json({ message: "Clase eliminada correctamente" });
            } else {
                res.status(404).json({ message: "Clase no encontrada" });
            }
        } catch (error) {
            next(error);
        }
    }
}