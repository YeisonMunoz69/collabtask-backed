import AppDataSource from "../../../config/database";
import { Tarea } from "../entities/Tarea";
import { Clase } from "../../clases/entities/Clase";
import { Grupo } from "../../grupos/entities/Grupo";
import { EstudianteClase } from "../../estudiantes_clases/entities/EstudianteClase";

export class TareaService {
    private tareaRepository = AppDataSource.getRepository(Tarea);
    private claseRepository = AppDataSource.getRepository(Clase);
    private grupoRepository = AppDataSource.getRepository(Grupo);
    private estudianteClaseRepository = AppDataSource.getRepository(EstudianteClase);

    async getAllTareas(): Promise<Tarea[]> {
        return await this.tareaRepository.find({ relations: ["clase"] });
    }

    async getTareaById(id_tarea: number): Promise<Tarea | null> {
        return await this.tareaRepository.findOne({ where: { id_tarea }, relations: ["clase"] });
    }

    async getTareasByClaseId(id_clase: number): Promise<Tarea[]> {
        // Verificar si la clase existe
        const clase = await this.claseRepository.findOne({ where: { id_clase } });
        if (!clase) {
            throw new Error("Clase no encontrada.");
        }
    
        // Obtener todas las tareas relacionadas con la clase
        const tareas = await this.tareaRepository.find({
            where: { clase: { id_clase } },
            relations: ["clase"], // Opcional, incluye detalles de la clase si son necesarios
        });
    
        return tareas;
    }    

    async createTarea(data: Partial<Tarea>): Promise<Tarea> {
        // Verificar que la clase exista
        const clase = await this.claseRepository.findOne({ where: { id_clase: data.clase?.id_clase } });
        if (!clase) {
            throw new Error("Clase no encontrada");
        }

        // Crear la tarea
        const nuevaTarea = this.tareaRepository.create({
            ...data,
            clase,
        });

        const tareaGuardada = await this.tareaRepository.save(nuevaTarea);

        // Crear grupos automáticamente
        const estudiantesEnClase = await this.estudianteClaseRepository.find({ where: { id_clase: clase.id_clase } });
        if (!estudiantesEnClase.length) {
            throw new Error("No hay estudiantes en la clase para asignar grupos");
        }

        const numeroEstudiantes = estudiantesEnClase.length;
        const numeroGrupos = data.numero_grupos || 1;

        const capacidadPorGrupo = Math.ceil(numeroEstudiantes / numeroGrupos);

        for (let i = 0; i < numeroGrupos; i++) {
            const nuevoGrupo = this.grupoRepository.create({
                tarea: tareaGuardada,
                id_lider: null, // El líder se asignará posteriormente
                integrantes: 0, // Inicialmente vacíos
                porcentaje_progreso: 0,
                ultima_actualizacion: new Date(),
                capacidad: capacidadPorGrupo,
            });

            await this.grupoRepository.save(nuevoGrupo);
        }

        return tareaGuardada;
    }

    async deleteTarea(id_tarea: number): Promise<boolean> {
        // Eliminar grupos relacionados con la tarea
        const grupos = await this.grupoRepository.find({ where: { tarea: { id_tarea } } });
        if (grupos.length) {
            await this.grupoRepository.remove(grupos);
        }

        // Eliminar la tarea
        const result = await this.tareaRepository.delete(id_tarea);
        return result.affected !== 0;
    }
}
