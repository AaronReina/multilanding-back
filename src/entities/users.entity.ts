import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  access: number

  @Column()
  name: string

  @Column()
  password: string

  @Column()
  email: string
}
