import AppDataSource from "../../../config/database";
import { Responsabilidad } from "../entities/Responsabilidad";
import { Grupo } from "../../grupos/entities/Grupo";
import { EstudianteClaseGrupo } from "../../estudiantes_clases_grupos/entities/EstudianteClaseGrupo";

export class ResponsabilidadService {
    private responsabilidadRepository = AppDataSource.getRepository(Responsabilidad);
    private grupoRepository = AppDataSource.getRepository(Grupo);

    async getAllResponsabilidades(): Promise<Responsabilidad[]> {
        return await this.responsabilidadRepository.find({ relations: ["grupo", "estudianteClaseGrupo"] });
    }

    async getResponsabilidadById(id_responsabilidad: number): Promise<Responsabilidad | null> {
        return await this.responsabilidadRepository.findOne({
            where: { id_responsabilidad },
            relations: ["grupo", "estudianteClaseGrupo"],
        });
    }

    async getResponsabilidadesByGrupo(id_grupo: number): Promise<Responsabilidad[]> {
        return await this.responsabilidadRepository.find({
            where: { grupo: { id_grupo } },
            relations: ["grupo", "estudianteClaseGrupo"],
        });
    }

    async createResponsabilidad(data: Partial<Responsabilidad>): Promise<Responsabilidad> {
        const grupo = await this.grupoRepository.findOne({ where: { id_grupo: data.grupo?.id_grupo } });

        if (!grupo) {
            throw new Error("Grupo no encontrado");
        }

        const estudianteGrupo = await AppDataSource.getRepository(EstudianteClaseGrupo).findOne({
            where: {
                id_grupo: grupo.id_grupo,
                id_estudiante_clase: data.estudianteClaseGrupo?.id_estudiante_clase,
            },
        });

        if (!estudianteGrupo) {
            throw new Error("El estudiante no pertenece al grupo");
        }

        const nuevaResponsabilidad = this.responsabilidadRepository.create({
            titulo: data.titulo,
            descripcion: data.descripcion,
            estado: "Pendiente",
            fecha_limite: data.fecha_limite,
            grupo: grupo,
            estudianteClaseGrupo: estudianteGrupo,
        });

        const responsabilidadGuardada = await this.responsabilidadRepository.save(nuevaResponsabilidad);

        // Actualizar progreso del grupo
        await this.updateGrupoProgress(grupo.id_grupo);

        return responsabilidadGuardada;
    }

    async updateResponsabilidad(
        id_responsabilidad: number,
        data: Partial<Responsabilidad>
    ): Promise<Responsabilidad | null> {
        // Buscar la responsabilidad junto con su grupo
        const responsabilidad = await this.responsabilidadRepository.findOne({
            where: { id_responsabilidad },
            relations: ["grupo"], // Asegurar la relación con el grupo
        });
    
        if (!responsabilidad) {
            throw new Error("Responsabilidad no encontrada");
        }

        // Actualizar los datos de la responsabilidad
        Object.assign(responsabilidad, data);
        const savedResponsabilidad = await this.responsabilidadRepository.save(responsabilidad);
    
        // Recalcular el porcentaje de progreso del grupo si la responsabilidad pertenece a un grupo
        if (responsabilidad.grupo) {
            const grupo = responsabilidad.grupo;
    
            // Obtener todas las responsabilidades del grupo
            const responsabilidades = await this.responsabilidadRepository.find({
                where: { grupo: { id_grupo: grupo.id_grupo } },
            });
    
            // Calcular el porcentaje de progreso
            const totalResponsabilidades = responsabilidades.length;
            const progreso =
                responsabilidades.reduce((acc, resp) => {
                    if (resp.estado === "Pendiente") {
                        return acc + 0;
                    } else if (resp.estado === "En progreso") {
                        return acc + 0.1;
                    } else if (resp.estado === "Finalizada") {
                        return acc + 0.2;
                    }
                    return acc;
                }, 0) / totalResponsabilidades;
    
            grupo.porcentaje_progreso = Math.round(progreso * 100);
    
            // Guardar el progreso actualizado en el grupo
            await this.grupoRepository.save(grupo);
        }
    
        return savedResponsabilidad;
    }
    
    

    async deleteResponsabilidad(id_responsabilidad: number): Promise<boolean> {
        const responsabilidad = await this.getResponsabilidadById(id_responsabilidad);

        if (!responsabilidad) {
            throw new Error("Responsabilidad no encontrada");
        }

        const result = await this.responsabilidadRepository.delete(id_responsabilidad);

        if (result.affected) {
            // Actualizar progreso del grupo
            await this.updateGrupoProgress(responsabilidad.grupo.id_grupo);
            return true;
        }

        return false;
    }

    private async updateGrupoProgress(id_grupo: number): Promise<void> {
        const responsabilidades = await this.getResponsabilidadesByGrupo(id_grupo);

        if (responsabilidades.length === 0) {
            return; // No hay responsabilidades, progreso = 0
        }

        const totalResponsabilidades = responsabilidades.length;
        const progreso = responsabilidades.reduce((acc, res) => {
            switch (res.estado) {
                case "Finalizada":
                    return acc + 1;
                case "En progreso":
                    return acc + 0.5;
                default:
                    return acc;
            }
        }, 0);

        const porcentajeProgreso = (progreso / totalResponsabilidades) * 100;

        const grupo = await this.grupoRepository.findOneBy({ id_grupo });
        if (grupo) {
            grupo.porcentaje_progreso = Math.round(porcentajeProgreso);
            await this.grupoRepository.save(grupo);
        }
    }
}
