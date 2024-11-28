import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Grupo } from "../../grupos/entities/Grupo";
import { EstudianteClaseGrupo } from "../../estudiantes_clases_grupos/entities/EstudianteClaseGrupo";

@Entity("Responsabilidades")
export class Responsabilidad {
    @PrimaryGeneratedColumn()
    id_responsabilidad: number;

    @Column({ length: 200 })
    titulo: string;

    @Column({ type: "text", nullable: true })
    descripcion: string;

    @Column({
        type: "enum",
        enum: ["Pendiente", "En progreso", "Finalizada"],
        default: "Pendiente",
    })
    estado: "Pendiente" | "En progreso" | "Finalizada";

    @Column({ type: "date" })
    fecha_limite: Date;

    // Relación con la tabla Grupos
    @ManyToOne(() => Grupo, (grupo) => grupo.responsabilidades, { onDelete: "CASCADE" })
    grupo: Grupo;

    // Relación con EstudianteClaseGrupoa
    @ManyToOne(() => EstudianteClaseGrupo, { onDelete: "SET NULL" })
    estudianteClaseGrupo: EstudianteClaseGrupo;
}
