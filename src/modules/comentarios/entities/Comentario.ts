import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Grupo } from "../../grupos/entities/Grupo";
import { EstudianteClaseGrupo } from "../../estudiantes_clases_grupos/entities/EstudianteClaseGrupo";

@Entity("Comentarios")
export class Comentario {
    @PrimaryGeneratedColumn()
    id_comentario: number;

    @Column({ type: "text" })
    contenido: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    fecha_comentario: Date;

    // Relación con la tabla Grupos
    @ManyToOne(() => Grupo, (grupo) => grupo.comentarios, { onDelete: "CASCADE" })
    grupo: Grupo;

    // Relación con la tabla Estudiantes_Clases_Grupo
    @ManyToOne(() => EstudianteClaseGrupo, (estudianteGrupo) => estudianteGrupo.comentarios, { onDelete: "CASCADE" })
    estudianteGrupo: EstudianteClaseGrupo;
}
