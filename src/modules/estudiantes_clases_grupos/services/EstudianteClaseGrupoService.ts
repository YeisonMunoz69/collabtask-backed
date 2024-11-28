import AppDataSource from "../../../config/database";
import { EstudianteClaseGrupo } from "../entities/EstudianteClaseGrupo";
import { Grupo } from "../../grupos/entities/Grupo";
import { EstudianteClase } from "../../estudiantes_clases/entities/EstudianteClase";

export class EstudianteClaseGrupoService {
    private estudianteClaseGrupoRepository = AppDataSource.getRepository(EstudianteClaseGrupo);

    async getAllEstudiantesClaseGrupo(): Promise<EstudianteClaseGrupo[]> {
        return await this.estudianteClaseGrupoRepository.find({ relations: ["grupo", "estudianteClase"] });
    }

    async createEstudianteClaseGrupo(data: {
        id_grupo: number;
        id_clase: number;
        id_estudiante: number;
    }): Promise<EstudianteClaseGrupo> {
        const { id_grupo, id_clase, id_estudiante } = data;
    
        // Verificar que el grupo existe
        const grupo = await AppDataSource.getRepository(Grupo).findOne({
            where: { id_grupo },
            relations: ["tarea", "tarea.clase"],
        });
    
        if (!grupo) {
            throw new Error("Grupo no encontrado.");
        }
    
        // Verificar que el grupo no haya excedido su capacidad
        const integrantesActuales = await this.estudianteClaseGrupoRepository.count({
            where: { id_grupo },
        });
    
        if (integrantesActuales >= grupo.capacidad) {
            throw new Error("La capacidad del grupo ha sido alcanzada.");
        }
    
        // Verificar que el estudiante pertenece a la clase
        const estudianteClase = await AppDataSource.getRepository(EstudianteClase).findOne({
            where: { id_clase, id_estudiante },
        });
    
        if (!estudianteClase) {
            throw new Error("El estudiante no pertenece a la clase especificada.");
        }
    
        // Verificar que el estudiante no está ya en otro grupo de la misma tarea
        const yaEnGrupo = await this.estudianteClaseGrupoRepository.findOne({
            where: {
                id_estudiante_clase: estudianteClase.id_estudiante,
                grupo: { tarea: grupo.tarea },
            },
            relations: ["grupo", "grupo.tarea"],
        });
    
        if (yaEnGrupo) {
            throw new Error("El estudiante ya pertenece a un grupo de esta tarea.");
        }
    
        // Crear la nueva relación con id_lider = 0
        const nuevaRelacion = this.estudianteClaseGrupoRepository.create({
        id_grupo: grupo.id_grupo,
        grupo: grupo,
        id_estudiante_clase: estudianteClase.id_estudiante, // Asignar el ID directamente
        estudianteClase: estudianteClase, // Relación completa
        fecha_ingreso: new Date(),
        id_lider: 0, // Líder predeterminado
    });
    
        const nuevaRelacionGuardada = await this.estudianteClaseGrupoRepository.save(nuevaRelacion);
    
        // Actualizar la cantidad de integrantes del grupo
        grupo.integrantes += 1;
        await AppDataSource.getRepository(Grupo).save(grupo);
    
        return nuevaRelacionGuardada;
    }
        
    async deleteEstudianteClaseGrupo(id_grupo: number, id_estudiante: number): Promise<boolean> {
        const estudianteClaseGrupo = await this.estudianteClaseGrupoRepository.findOne({
            where: {
                id_grupo,
                id_estudiante_clase: id_estudiante,
            },
            relations: ["grupo"],
        });
    
        if (!estudianteClaseGrupo) {
            throw new Error("El estudiante no pertenece a este grupo o el grupo no existe.");
        }
    
        // Eliminar la relación
        const result = await this.estudianteClaseGrupoRepository.delete({
            id_grupo,
            id_estudiante_clase: id_estudiante,
        });
    
        if (result.affected) {
            // Actualizar el número de integrantes del grupo
            estudianteClaseGrupo.grupo.integrantes -= 1;
            await AppDataSource.getRepository(Grupo).save(estudianteClaseGrupo.grupo);
            return true;
        }
    
        return false;
    }
    
}

