import AppDataSource from "../../../config/database";
import { Estudiante } from "../entities/Estudiante";

export class EstudianteService {
    private estudianteRepository = AppDataSource.getRepository(Estudiante);

    async getAllEstudiantes(): Promise<Estudiante[]> {
        return await this.estudianteRepository.find();
    }

    async createEstudiante(data: Partial<Estudiante>): Promise<Estudiante> {
        const nuevoEstudiante = this.estudianteRepository.create(data);
        return await this.estudianteRepository.save(nuevoEstudiante);
    }

    async getEstudianteById(id: number): Promise<Estudiante | null> {
        return await this.estudianteRepository.findOneBy({ id_estudiante: id });
    }

    async updateEstudiante(id: number, data: Partial<Estudiante>): Promise<Estudiante | null> {
        const estudiante = await this.estudianteRepository.findOneBy({ id_estudiante: id });
        if (estudiante) {
            Object.assign(estudiante, data);
            return await this.estudianteRepository.save(estudiante);
        }
        return null;
    }

    async deleteEstudiante(id: number): Promise<boolean> {
        const result = await this.estudianteRepository.delete(id);
        return result.affected !== 0;
    }
}
