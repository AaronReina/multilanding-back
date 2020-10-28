import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Colors extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  color: string
}