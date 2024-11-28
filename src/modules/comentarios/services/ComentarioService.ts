import AppDataSource from "../../../config/database";
import { Comentario } from "../entities/Comentario";
import { Grupo } from "../../grupos/entities/Grupo";
import { EstudianteClaseGrupo } from "../../estudiantes_clases_grupos/entities/EstudianteClaseGrupo";

export class ComentarioService {
    private comentarioRepository = AppDataSource.getRepository(Comentario);
    private grupoRepository = AppDataSource.getRepository(Grupo);
    private estudianteClaseGrupoRepository = AppDataSource.getRepository(EstudianteClaseGrupo);

    async getComentariosByGrupo(id_grupo: number): Promise<Comentario[]> {
        const grupo = await this.grupoRepository.findOne({ where: { id_grupo } });
        if (!grupo) {
            throw new Error("Grupo no encontrado");
        }
        return await this.comentarioRepository.find({
            where: { grupo: { id_grupo } },
            relations: ["grupo", "estudianteGrupo"],
            order: { fecha_comentario: "DESC" },
        });
    }

    async createComentario(data: Partial<Comentario>): Promise<Comentario> {
        // Verificar que el grupo existe
        const grupo = await this.grupoRepository.findOne({
            where: { id_grupo: data.grupo?.id_grupo },
        });
        if (!grupo) {
            throw new Error("Grupo no encontrado");
        }
    
        // Verificar que el estudiante pertenece al grupo
        const estudianteGrupo = await this.estudianteClaseGrupoRepository.findOne({
            where: {
                id_grupo: data.grupo?.id_grupo,
                id_estudiante_clase: data.estudianteGrupo?.id_estudiante_clase,
            },
        });
        if (!estudianteGrupo) {
            throw new Error("El estudiante no pertenece al grupo");
        }
    
        // Crear y guardar el comentario asegurando referencias correctas
        const nuevoComentario = this.comentarioRepository.create({
            contenido: data.contenido,
            grupo: grupo, // Relación directa al grupo
            estudianteGrupo: estudianteGrupo, // Relación directa al estudiante en el grupo
        });
        return await this.comentarioRepository.save(nuevoComentario);
    }
    

    async deleteComentario(id_comentario: number): Promise<boolean> {
        const result = await this.comentarioRepository.delete({ id_comentario });
        return result.affected !== 0;
    }
}
