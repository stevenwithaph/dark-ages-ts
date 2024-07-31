import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class AislingEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  username!: string;

  @Property()
  password!: string;

  @Property()
  bodyType: number = 1;

  @Property()
  hairStyle: number = 1;

  @Property()
  hairColour: number = 1;

  @Property()
  mapId: number = 0;

  @Property()
  x: number = 0;

  @Property()
  y: number = 0;

  @Property()
  direction: number = 0;
}
