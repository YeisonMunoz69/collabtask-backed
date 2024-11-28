import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Profesor } from "../../profesores/entities/Profesor";
import { EstudianteClase } from "../../estudiantes_clases/entities/EstudianteClase";
import { Tarea } from "../../tareas/entities/Tarea";

@Entity("Clases")
export class Clase {
    @PrimaryGeneratedColumn()
    id_clase: number;

    @Column({ length: 100 })
    nombre: string;

    @Column({ length: 100 })
    carrera: string;

    @Column({ length: 50, nullable: true })
    salon: string;

    @Column({ length: 50, nullable: true })
    horario: string;

    @Column({ default: 0 })
    numero_estudiantes: number;

    // Relación con la tabla Profesores
    @ManyToOne(() => Profesor, (profesor) => profesor.clases)
    profesor: Profesor;

    // Relación con la tabla Estudiantes_Clases
    @OneToMany(() => EstudianteClase, (estudianteClase) => estudianteClase.clase)
    estudiantes: EstudianteClase[];

    // Relación con la tabla Tareas
    @OneToMany(() => Tarea, (tarea) => tarea.clase)
    tareas: Tarea[];
}
