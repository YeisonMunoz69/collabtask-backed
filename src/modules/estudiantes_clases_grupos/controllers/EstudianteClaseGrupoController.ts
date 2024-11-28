import { Request, Response, NextFunction } from "express";
import { EstudianteClaseGrupoService } from "../services/EstudianteClaseGrupoService";
import { errorHandler } from "../../../utils/errorHandler";

export class EstudianteClaseGrupoController {
  private estudianteClaseGrupoService: EstudianteClaseGrupoService;

  constructor() {
    this.estudianteClaseGrupoService = new EstudianteClaseGrupoService();
  }

  async getAllEstudiantesClaseGrupo(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const estudiantesGrupos =
        await this.estudianteClaseGrupoService.getAllEstudiantesClaseGrupo();
      res.json(estudiantesGrupos);
    } catch (error) {
      const { status, message } = errorHandler(error);
      res.status(status).json({ message });
    }
  }

  async createEstudianteClaseGrupo(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const nuevaRelacion =
        await this.estudianteClaseGrupoService.createEstudianteClaseGrupo(
          req.body
        );
      res.status(201).json({
        id_grupo: nuevaRelacion.id_grupo,
        id_estudiante: nuevaRelacion.estudianteClase.id_estudiante,
        fecha_ingreso: nuevaRelacion.fecha_ingreso,
        clase: nuevaRelacion.grupo.tarea.clase.nombre,
        tarea: nuevaRelacion.grupo.tarea.titulo,
        estudiante: nuevaRelacion.estudianteClase.estudiante.nombres,
      });
    } catch (error) {
      const { status, message } = errorHandler(error);
      res.status(status).json({ message });
    }
  }

  async deleteEstudianteClaseGrupo(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id_grupo, id_estudiante } = req.params;
      const eliminado =
        await this.estudianteClaseGrupoService.deleteEstudianteClaseGrupo(
          Number(id_grupo),
          Number(id_estudiante)
        );

      if (eliminado) {
        res.json({ message: "Estudiante eliminado del grupo correctamente." });
      } else {
        res.status(404).json({ message: "Relación no encontrada." });
      }
    } catch (error) {
      const { status, message } = errorHandler(error);
      res.status(status).json({ message });
    }
  }
}
