import { Options, SqliteDriver } from '@mikro-orm/sqlite';
import { AislingEntity } from './db/entities/aisling.entity';

const config: Options = {
  entities: [AislingEntity],
  dbName: 'db.sqlite',
  driver: SqliteDriver,
};

export default config;
