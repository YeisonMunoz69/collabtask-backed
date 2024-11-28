import AppDataSource from "../../../config/database";
import { Profesor } from "../entities/Profesor";

export class ProfesorService {
    private profesorRepository = AppDataSource.getRepository(Profesor);

    async getAllProfesores(): Promise<Profesor[]> {
        return await this.profesorRepository.find();
    }

    async createProfesor(data: Partial<Profesor>): Promise<Profesor> {
        const nuevoProfesor = this.profesorRepository.create(data);
        return await this.profesorRepository.save(nuevoProfesor);
    }

    async getProfesorById(id: number): Promise<Profesor | null> {
        return await this.profesorRepository.findOneBy({ id_profesor: id });
    }

    async updateProfesor(id: number, data: Partial<Profesor>): Promise<Profesor | null> {
        const profesor = await this.profesorRepository.findOneBy({ id_profesor: id });
        if (profesor) {
            Object.assign(profesor, data);
            return await this.profesorRepository.save(profesor);
        }
        return null;
    }

    async deleteProfesor(id: number): Promise<boolean> {
        const result = await this.profesorRepository.delete(id);
        return result.affected !== 0;
    }
}
