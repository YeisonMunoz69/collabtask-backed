import { Entity, ManyToOne, OneToMany , PrimaryColumn, Column } from "typeorm";
import { Grupo } from "../../grupos/entities/Grupo";
import { EstudianteClase } from "../../estudiantes_clases/entities/EstudianteClase";
import { Comentario } from "../../comentarios/entities/Comentario";
@Entity("Estudiantes_Clases_Grupo")
export class EstudianteClaseGrupo {
  @PrimaryColumn()
  id_grupo: number;

  @ManyToOne(() => Grupo, (grupo) => grupo.estudiantesClaseGrupo, { onDelete: "CASCADE" })
  grupo: Grupo;

  @PrimaryColumn()
  id_estudiante_clase: number;

  @ManyToOne(
    () => EstudianteClase,
    (estClase) => estClase.estudianteClaseGrupos,
    { onDelete: "CASCADE" }
  )
  estudianteClase: EstudianteClase;

  @Column({ type: "date", default: () => "CURRENT_DATE" })
  fecha_ingreso: Date;

  @Column({ type: "int", nullable: true }) // Cambiar "Object" a "int"
  id_lider: number | null;

  @OneToMany(() => Comentario, (comentario) => comentario.estudianteGrupo)
  comentarios: Comentario[];
}
