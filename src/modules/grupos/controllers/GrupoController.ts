import { Request, Response, NextFunction } from "express";
import { GrupoService } from "../services/GrupoService";
import { errorHandler } from "../../../utils/errorHandler";

export class GrupoController {
    private grupoService: GrupoService;

    constructor() {
        this.grupoService = new GrupoService();
    }

    async getAllGrupos(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const grupos = await this.grupoService.getAllGrupos();
            res.json(grupos);
        } catch (error: unknown) {
            res.status(400).json({ message: (error as Error).message });
        }
    }

    async getEstudiantesByGrupoId(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id_grupo } = req.params;
            const estudiantes = await this.grupoService.getEstudiantesByGrupoId(Number(id_grupo));
            res.json(estudiantes.map(est => ({
                id_estudiante: est.estudianteClase.estudiante.id_estudiante,
                nombres: est.estudianteClase.estudiante.nombres,
                apellidos: est.estudianteClase.estudiante.apellidos,
                email_institucional: est.estudianteClase.estudiante.email_institucional,
            }))); // Personaliza los datos que quieras retornar
        } catch (error: unknown) {
            res.status(400).json({ message: (error as Error).message });
        }
    }
    
    async getGruposByClaseAndTarea(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id_clase, id_tarea } = req.params;
            const grupos = await this.grupoService.getGruposByClaseAndTarea(Number(id_clase), Number(id_tarea));
            res.json(grupos.map(grupo => ({
                id_grupo: grupo.id_grupo,
                id_lider: grupo.id_lider,
                integrantes: grupo.integrantes,
                porcentaje_progreso: grupo.porcentaje_progreso,
                capacidad: grupo.capacidad,
                fecha_creacion: grupo.fecha_creacion,
                ultima_actualizacion: grupo.ultima_actualizacion,
                tarea: {
                    id_tarea: grupo.tarea.id_tarea,
                    titulo: grupo.tarea.titulo,
                    clase: {
                        id_clase: grupo.tarea.clase.id_clase,
                        nombre: grupo.tarea.clase.nombre,
                    },
                },
            }))); // Personaliza los datos que quieras retornar
        } catch (error: unknown) {
            res.status(400).json({ message: (error as Error).message });
        }
    }

    async assignLider(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id_grupo } = req.params;
            const { id_estudiante_clase } = req.body;
    
            const grupoActualizado = await this.grupoService.assignLider(Number(id_grupo), Number(id_estudiante_clase));
            res.json({
                message: "Líder asignado exitosamente.",
                grupo: grupoActualizado,
            });
        } catch (error: unknown) {
            const { status, message } = errorHandler(error);
            res.status(status).json({ message });
        }
    }
    

    async getGrupoByIdAndTarea(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id_grupo, id_tarea } = req.params;
            const grupo = await this.grupoService.getGrupoByIdAndTarea(Number(id_grupo), Number(id_tarea));
            if (!grupo) {
                res.status(404).json({ message: "Grupo no encontrado o no pertenece a la tarea especificada" });
            } else {
                res.json(grupo);
            }
        } catch (error: unknown) {
            res.status(400).json({ message: (error as Error).message });
        }
    }
    

    async createGrupo(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const nuevoGrupo = await this.grupoService.createGrupo(req.body);
            res.status(201).json(nuevoGrupo);
        } catch (error: unknown) {
            res.status(400).json({ message: (error as Error).message });
        }
    }

    async addEstudianteToGrupo(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id_grupo, id_estudiante_clase } = req.body;
            const grupoActualizado = await this.grupoService.addEstudianteToGrupo(Number(id_grupo), Number(id_estudiante_clase));
            res.status(200).json(grupoActualizado);
        } catch (error: unknown) {
            res.status(400).json({ message: (error as Error).message });
        }
    }

    async updateGrupo(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const data = req.body;
            const grupoActualizado = await this.grupoService.updateGrupo(Number(id), data);
            if (!grupoActualizado) {
                res.status(404).json({ message: "Grupo no encontrado" });
            } else {
                res.json(grupoActualizado);
            }
        } catch (error: unknown) {
            res.status(400).json({ message: (error as Error).message });
        }
    }

    async deleteGrupo(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const result = await this.grupoService.deleteGrupo(Number(id));
            if (result) {
                res.json({ message: "Grupo eliminado correctamente" });
            } else {
                res.status(404).json({ message: "Grupo no encontrado" });
            }
        } catch (error: unknown) {
            res.status(400).json({ message: (error as Error).message });
        }
    }
}
