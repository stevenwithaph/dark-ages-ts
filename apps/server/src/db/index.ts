import { MikroORM } from '@mikro-orm/sqlite'; // or any other driver package
import config from '../mikro-orm.config';

// initialize the ORM, loading the config file dynamically
let orm = await MikroORM.init(config);

const em = orm.em.fork();

export { em };
