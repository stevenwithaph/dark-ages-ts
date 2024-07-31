import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AislingEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @Column()
  bodyType: number = 1;

  @Column()
  hairStyle: number = 1;

  @Column()
  hairColour: number = 1;

  @Column()
  mapId: number = 0;

  @Column()
  x: number = 0;

  @Column()
  y: number = 0;

  @Column()
  direction: number = 0;
}
