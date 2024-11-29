import AppDataSource from "../../../config/database";
import { Clase } from "../entities/Clase";
import { Profesor } from "../../profesores/entities/Profesor";
import { EstudianteClase } from "../../estudiantes_clases/entities/EstudianteClase";

export class ClaseService {
    private claseRepository = AppDataSource.getRepository(Clase);
    private profesorRepository = AppDataSource.getRepository(Profesor);

    async getAllClases(): Promise<Clase[]> {
        return await this.claseRepository.find({ relations: ["profesor"] });
    }

    async createClase(data: Partial<Clase>): Promise<Clase> {
        // Validar que se envíe un ID de profesor
        if (!data.profesor?.id_profesor) {
            throw new Error("ID de profesor es requerido");
        }
    
        // Verificar que el profesor exista
        const profesor = await this.profesorRepository.findOne({
            where: { id_profesor: data.profesor.id_profesor },
        });
    
        if (!profesor) {
            throw new Error("Profesor no encontrado");
        }
    
        // Crear la clase asignando el profesor por referencia
        const nuevaClase = this.claseRepository.create({
            nombre: data.nombre,
            carrera: data.carrera,
            salon: data.salon,
            horario: data.horario,
            numero_estudiantes: 0, // Inicialmente no hay estudiantes
            profesor, // Asignamos el objeto profesor directamente
        });
    
        return await this.claseRepository.save(nuevaClase);
    }
    

    async getClaseById(id: number): Promise<Clase | null> {
        return await this.claseRepository.findOne({
            where: { id_clase: id },
            relations: ["profesor"],
        });
    }
    
    async getClasesByProfesorId(id_profesor: number): Promise<Clase[]> {
        return await this.claseRepository.find({
            where: { profesor: { id_profesor } },
            relations: ["profesor"],
        });
    }

    async getClasesByCodigoProfesor(codigo_profesor: string): Promise<Clase[]> {
        const profesor = await this.profesorRepository.findOne({
            where: { codigo: codigo_profesor },
            relations: ["clases"],
        });

        if (!profesor) {
            throw new Error("Profesor no encontrado");
        }

        return profesor.clases;
    }

    
    async updateClase(id: number, data: Partial<Clase>): Promise<Clase | null> {
        const clase = await this.claseRepository.findOneBy({ id_clase: id });
        if (!clase) {
            throw new Error("Clase no encontrada");
        }

        // Si se está actualizando el profesor, validar que exista
        if (data.profesor?.id_profesor) {
            const profesor = await this.profesorRepository.findOne({
                where: { id_profesor: data.profesor.id_profesor },
            });

            if (!profesor) {
                throw new Error("Profesor no encontrado");
            }

            clase.profesor = profesor;
        }

        // Actualizar los datos restantes
        Object.assign(clase, data);
        return await this.claseRepository.save(clase);
    }

    async deleteClase(id: number): Promise<boolean> {
        const result = await this.claseRepository.delete(id);
        return result.affected !== 0;
    }
}