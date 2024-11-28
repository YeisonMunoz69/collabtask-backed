import { Entity, PrimaryColumn, ManyToOne, Column, OneToMany } from "typeorm";
import { Clase } from "../../clases/entities/Clase";
import { Estudiante } from "../../estudiantes/entities/Estudiante";
import { EstudianteClaseGrupo } from "../../estudiantes_clases_grupos/entities/EstudianteClaseGrupo";

@Entity("Estudiantes_Clases")
export class EstudianteClase {
    @PrimaryColumn()
    id_clase: number;

    @PrimaryColumn()
    id_estudiante: number;

    @Column({ type: "date", default: () => "CURRENT_DATE" })
    fecha_ingreso: Date;

    // Relación con la tabla Clases
    @ManyToOne(() => Clase, (clase) => clase.estudiantes, { onDelete: "CASCADE", eager: true })
    clase: Clase;

    // Relación con la tabla Estudiantes
    @ManyToOne(() => Estudiante, (estudiante) => estudiante.clases, { onDelete: "CASCADE", eager: true })
    estudiante: Estudiante;

    // Nueva relación con Estudiantes_Clases_Grupos
    @OneToMany(() => EstudianteClaseGrupo, (estClaseGrupo) => estClaseGrupo.estudianteClase)
    estudianteClaseGrupos: EstudianteClaseGrupo[];
}
