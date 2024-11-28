import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Clase } from "../../clases/entities/Clase";

@Entity("Profesores")
export class Profesor {
    @PrimaryGeneratedColumn()
    id_profesor: number;

    @Column({ length: 100 })
    nombres: string;

    @Column({ length: 100 })
    apellidos: string;

    @Column({ unique: true, length: 100 })
    email_institucional: string;

    @Column({ unique: true, length: 20 })
    codigo: string;

    // Relación con la tabla Clases
    @OneToMany(() => Clase, (clase) => clase.profesor)
    clases: Clase[];
}
