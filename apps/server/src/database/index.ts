import { DataSource } from 'typeorm';
import { AislingEntity } from './entities/aisling.entity';

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'db.sqlite',
  entities: [AislingEntity],
  synchronize: true,
  logging: false,
});

export { AppDataSource };
