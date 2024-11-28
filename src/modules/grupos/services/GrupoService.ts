import AppDataSource from "../../../config/database";
import { Grupo } from "../entities/Grupo";
import { Tarea } from "../../tareas/entities/Tarea";
import { EstudianteClaseGrupo } from "../../estudiantes_clases_grupos/entities/EstudianteClaseGrupo";

export class GrupoService {
    private grupoRepository = AppDataSource.getRepository(Grupo);
    private tareaRepository = AppDataSource.getRepository(Tarea);
    private estudianteClaseGrupoRepository = AppDataSource.getRepository(EstudianteClaseGrupo);

    async getAllGrupos(): Promise<Grupo[]> {
        return await this.grupoRepository.find({ relations: ["tarea"] });
    }

    async getGrupoByIdAndTarea(id_grupo: number, id_tarea: number): Promise<Grupo | null> {
        const grupo = await this.grupoRepository.findOne({
            where: { id_grupo, tarea: { id_tarea } },
            relations: [
                "tarea",
                "estudiantesClaseGrupo",
                "estudiantesClaseGrupo.estudianteClase",
                "estudiantesClaseGrupo.estudianteClase.estudiante",
            ],
        });
    
        return grupo;
    }
    
    async createGrupo(data: Partial<Grupo>): Promise<Grupo> {
        const tarea = await this.tareaRepository.findOne({ where: { id_tarea: data.tarea?.id_tarea } });
        if (!tarea) {
            throw new Error("Tarea no encontrada");
        }

        const nuevoGrupo = this.grupoRepository.create({
            tarea,
            integrantes: 0,
            porcentaje_progreso: 0,
            ultima_actualizacion: new Date(),
            capacidad: data.capacidad,
            id_lider: null,
        });

        return await this.grupoRepository.save(nuevoGrupo);
    }

    async addEstudianteToGrupo(id_grupo: number, id_estudiante_clase: number): Promise<Grupo> {
        const grupo = await this.grupoRepository.findOne({ where: { id_grupo } });
        if (!grupo) {
            throw new Error("Grupo no encontrado");
        }

        if (grupo.integrantes >= grupo.capacidad) {
            throw new Error("El grupo ya está lleno");
        }

        const nuevaRelacion = this.estudianteClaseGrupoRepository.create({
            id_grupo,
            id_estudiante_clase,
            fecha_ingreso: new Date(),
        });
        await this.estudianteClaseGrupoRepository.save(nuevaRelacion);

        grupo.integrantes += 1;
        grupo.ultima_actualizacion = new Date();
        return await this.grupoRepository.save(grupo);
    }

    async assignLider(id_grupo: number, id_estudiante_clase: number): Promise<Grupo> {
        // Verificar que el grupo existe
        const grupo = await this.grupoRepository.findOne({ where: { id_grupo } });
        if (!grupo) {
            throw new Error("Grupo no encontrado.");
        }
    
        // Verificar que el estudiante pertenece al grupo
        const estudianteEnGrupo = await this.estudianteClaseGrupoRepository.findOne({
            where: { id_grupo, id_estudiante_clase },
        });
        if (!estudianteEnGrupo) {
            throw new Error("El estudiante no pertenece a este grupo.");
        }
    
        // Asignar el líder
        grupo.id_lider = id_estudiante_clase;
        grupo.ultima_actualizacion = new Date(); // Actualizar la fecha de última modificación
        await this.grupoRepository.save(grupo);
    
        return grupo;
    }
    

    async updateGrupo(id_grupo: number, data: Partial<Grupo>): Promise<Grupo | null> {
        const grupo = await this.grupoRepository.findOne({ where: { id_grupo } });
        if (!grupo) {
            return null;
        }

        // Actualizar los datos del grupo
        Object.assign(grupo, data);
        return await this.grupoRepository.save(grupo);
    }

    async deleteGrupo(id_grupo: number): Promise<boolean> {
        const grupo = await this.grupoRepository.findOne({ where: { id_grupo } });
        if (!grupo) {
            throw new Error("Grupo no encontrado");
        }

        await this.estudianteClaseGrupoRepository.delete({ id_grupo });
        const result = await this.grupoRepository.delete(id_grupo);
        return result.affected !== 0;
    }
}
