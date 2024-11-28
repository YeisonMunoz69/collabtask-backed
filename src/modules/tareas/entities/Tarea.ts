import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, AfterInsert, AfterRemove } from "typeorm";
import { Clase } from "../../clases/entities/Clase";
import { Grupo } from "../../grupos/entities/Grupo";
import AppDataSource from "../../../config/database";

@Entity("Tareas")
export class Tarea {
    @PrimaryGeneratedColumn()
    id_tarea: number;

    @Column({ length: 200 })
    titulo: string;

    @Column({ type: "text", nullable: true })
    descripcion: string;

    @Column({ type: "text", nullable: true })
    objetivos: string;

    @Column({ type: "text", nullable: true })
    contenido: string;

    @Column({ type: "date" })
    fecha_entrega: Date;

    @Column({ default: 0 })
    numero_grupos: number;

    @ManyToOne(() => Clase, (clase) => clase.tareas, { onDelete: "CASCADE" })
    clase: Clase;

    @OneToMany(() => Grupo, (grupo) => grupo.tarea)
    grupos: Grupo[];
}
