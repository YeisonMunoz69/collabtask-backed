import { Request, Response } from "express";
import { ResponsabilidadService } from "../services/ResponsabilidadService";

export class ResponsabilidadController {
    private responsabilidadService: ResponsabilidadService;

    constructor() {
        this.responsabilidadService = new ResponsabilidadService();
    }

    async getAllResponsabilidades(req: Request, res: Response): Promise<void> {
        try {
            const responsabilidades = await this.responsabilidadService.getAllResponsabilidades();
            res.json(responsabilidades);
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    }

    async createResponsabilidad(req: Request, res: Response): Promise<void> {
        try {
            const responsabilidad = await this.responsabilidadService.createResponsabilidad(req.body);
            res.status(201).json(responsabilidad);
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    }

    async updateResponsabilidad(req: Request, res: Response): Promise<void> {
        try {
            const { id_responsabilidad } = req.params;
            const responsabilidad = await this.responsabilidadService.updateResponsabilidad(
                Number(id_responsabilidad),
                req.body
            );
            res.json(responsabilidad);
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    }

    async deleteResponsabilidad(req: Request, res: Response): Promise<void> {
        try {
            const { id_responsabilidad } = req.params;
            const eliminado = await this.responsabilidadService.deleteResponsabilidad(Number(id_responsabilidad));
            if (eliminado) {
                res.json({ message: "Responsabilidad eliminada correctamente" });
            } else {
                res.status(404).json({ message: "Responsabilidad no encontrada" });
            }
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    }
}
