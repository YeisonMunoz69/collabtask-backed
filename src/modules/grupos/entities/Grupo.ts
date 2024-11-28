import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Tarea } from "../../tareas/entities/Tarea";
import { EstudianteClaseGrupo } from "../../estudiantes_clases_grupos/entities/EstudianteClaseGrupo";
import { Responsabilidad } from "../../responsabilidades/entities/Responsabilidad";
import { Comentario } from "../../comentarios/entities/Comentario";

@Entity("Grupos")
export class Grupo {
  @PrimaryGeneratedColumn()
  id_grupo: number;

  @Column({ type: "int", nullable: true })
  id_lider: number | null; // Inicialmente nulo hasta que se asigne un líder.

  @Column({ type: "int", default: 0 })
  integrantes: number; // Actualizado automáticamente al añadir/quitar estudiantes.

  @Column({ type: "float", default: 0 })
  porcentaje_progreso: number; // Calculado automáticamente.

  @Column({ type: "int" })
  capacidad: number; // Calculado en base al `numero_grupos` de la tarea.

  @CreateDateColumn()
  fecha_creacion: Date;

  @UpdateDateColumn()
  ultima_actualizacion: Date;

  // Relación con la tabla Tareas
  @ManyToOne(() => Tarea, (tarea) => tarea.grupos)
  tarea: Tarea;

  // Relación dinámica con estudiantes
  @OneToMany(() => EstudianteClaseGrupo, (estClaseGrupo) => estClaseGrupo.grupo)
  estudiantesClaseGrupo: EstudianteClaseGrupo[];

  // Relación con la tabla Responsabilidades
  @OneToMany(() => Responsabilidad, (responsabilidad) => responsabilidad.grupo)
  responsabilidades: Responsabilidad[];

  // Relación con la tabla Comentarios
  @OneToMany(() => Comentario, (comentario) => comentario.grupo)
  comentarios: Comentario[];
}
