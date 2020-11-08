import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Text extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  htmlText: string;
}
