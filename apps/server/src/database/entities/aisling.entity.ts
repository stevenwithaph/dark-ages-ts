import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AislingEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @Column({ default: 1 })
  bodyType: number = 1;

  @Column({ default: 1 })
  hairStyle: number = 1;

  @Column({ default: 1 })
  hairColour: number = 1;

  @Column({ default: 0 })
  skinColour: number = 0;

  @Column({ default: '' })
  map: string = '';

  @Column({ default: 0 })
  x: number = 0;

  @Column({ default: 0 })
  y: number = 0;

  @Column({ default: 0 })
  direction: number = 0;

  @Column({ default: 100 })
  hp: number = 100;

  @Column({ default: 100 })
  mp: number = 100;

  @Column({ default: 0 })
  str: number = 0;

  @Column({ default: 0 })
  dex: number = 0;

  @Column({ default: 0 })
  wiz: number = 0;

  @Column({ default: 0 })
  con: number = 0;

  @Column({ default: 1 })
  int: number = 0;

  @Column({ default: 0 })
  exp: number = 0;

  @Column({ default: 0 })
  points: number = 0;
}
