import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Images extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  info: string;

  @Column({ type: 'longblob', nullable: true })
  image: unknown;
}
