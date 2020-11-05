import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Config {
  @PrimaryGeneratedColumn('uuid') id: number;

  @Column({
    type: 'json',
    nullable: false,
  })
  config: JSON;
}
