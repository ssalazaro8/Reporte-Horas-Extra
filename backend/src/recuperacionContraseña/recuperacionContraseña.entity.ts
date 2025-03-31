import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Usuarios } from '../usuarios/usuarios.entity'; // Importa la entidad Usuario

@Entity({ name: 'RecuperacionContrasena' })
export class RecuperacionContrasena {
  @PrimaryGeneratedColumn()
  ID_Recuperacion: number;

  @Column({ type: 'int' })
  ID_Usuario: number;

  @Column({ type: 'varchar', length: 255 })
  Token: string;

  @Column({ type: 'datetime' })
  FechaExpiracion: Date;

  // Relación con Usuario
  @ManyToOne(() => Usuarios)
  @JoinColumn({ name: 'ID_Usuario' })
  usuario: Usuarios;
}
