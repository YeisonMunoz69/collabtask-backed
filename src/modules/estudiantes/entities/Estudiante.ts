import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { EstudianteClase } from "../../estudiantes_clases/entities/EstudianteClase";
@Entity("Estudiantes")
export class Estudiante {
    @PrimaryGeneratedColumn()
    id_estudiante: number;

    @Column({ length: 100 })
    nombres: string;

    @Column({ length: 100 })
    apellidos: string;

    @Column({ unique: true, length: 100 })
    email_institucional: string;

    @Column({ unique: true, length: 20 })
    codigo: string;

    @Column({ length: 100 })
    carrera: string;

    @OneToMany(() => EstudianteClase, (estudianteClase) => estudianteClase.estudiante)
    clases: EstudianteClase[];
}

