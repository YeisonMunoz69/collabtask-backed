import AppDataSource from "../../../config/database";
import { EstudianteClase } from "../entities/EstudianteClase";
import { Clase } from "../../clases/entities/Clase";
import { Estudiante } from "../../estudiantes/entities/Estudiante";

export class EstudianteClaseService {
    private estudianteClaseRepository = AppDataSource.getRepository(EstudianteClase);
    private claseRepository = AppDataSource.getRepository(Clase);
    private estudianteRepository = AppDataSource.getRepository(Estudiante);

    async getAllEstudiantesClase(): Promise<EstudianteClase[]> {
        return await this.estudianteClaseRepository.find({ relations: ["clase", "estudiante"] });
    }

    async getEstudianteClaseById(id_clase: number, id_estudiante: number): Promise<EstudianteClase | null> {
        return await this.estudianteClaseRepository.findOne({
            where: { id_clase, id_estudiante },
            relations: ["clase", "estudiante"]
        });
    }

    async addEstudianteToClase(data: Partial<EstudianteClase>): Promise<EstudianteClase> {
        // Verificar que la clase exista
        const clase = await this.claseRepository.findOne({
            where: { id_clase: data.id_clase },
        });
    
        if (!clase) {
            throw new Error("Clase no encontrada");
        }
    
        // Verificar que el estudiante exista
        const estudiante = await this.estudianteRepository.findOne({
            where: { id_estudiante: data.id_estudiante },
        });
    
        if (!estudiante) {
            throw new Error("Estudiante no encontrado");
        }
    
        // Verificar que el estudiante no esté ya en la clase
        const estudianteEnClase = await this.estudianteClaseRepository.findOne({
            where: { id_clase: clase.id_clase, id_estudiante: estudiante.id_estudiante },
        });
    
        if (estudianteEnClase) {
            throw new Error("El estudiante ya está inscrito en la clase");
        }
    
        // Agregar estudiante a la clase
        const nuevaRelacion = this.estudianteClaseRepository.create({
            id_clase: clase.id_clase,
            id_estudiante: estudiante.id_estudiante,
            fecha_ingreso: new Date(),
            clase: clase,
            estudiante: estudiante,
        });
    
        await this.estudianteClaseRepository.save(nuevaRelacion);
    
        // Actualizar el número de estudiantes en la clase
        clase.numero_estudiantes += 1;
        await this.claseRepository.save(clase);
    
        return nuevaRelacion;
    }
      
    
    async removeEstudianteFromClase(id_clase: number, id_estudiante: number): Promise<boolean> {
        const result = await this.estudianteClaseRepository.delete({
            id_clase,
            id_estudiante,
        });
    
        if (result.affected) {
            // Actualizar el número de estudiantes en la clase
            const clase = await this.claseRepository.findOne({
                where: { id_clase },
            });
    
            if (clase) {
                clase.numero_estudiantes -= 1;
                await this.claseRepository.save(clase);
            }
    
            return true;
        }
    
        return false;
    }    

    //De momento no se usa bien porque no funcionó el correctamente
    async updateEstudianteClase(id_clase: number, id_estudiante: number, data: Partial<EstudianteClase>): Promise<EstudianteClase | null> {
        const estudianteClase = await this.estudianteClaseRepository.findOne({ where: { id_clase, id_estudiante } });
        if (!estudianteClase) {
            return null;
        }
        Object.assign(estudianteClase, data);
        return await this.estudianteClaseRepository.save(estudianteClase);
    }
}

