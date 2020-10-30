import { Users } from '../entities/users.entity';


export const typeOrmConfig = () =>
   ({database: {
        "type": "mysql",
        "host": "localhost",
        "port": 3306,
        "username": process.env.DATABASE_USER,
        "password": process.env.DATABASE_PASSWORD,
        "database": process.env.DATABASE_NAME,
        "entities": [__dirname + '/../**/*.entity.{js,ts}'],
        // "entities":[Users],
        "synchronize": true
      }})

