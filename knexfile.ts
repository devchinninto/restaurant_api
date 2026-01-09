import { Knex } from 'knex'

const config: Knex.Config = {
  client: 'better-sqlite3',
  connection: {
    filename: './src/database/database.db',
  },
  pool: {
    afterCreate: (connection: any, done: Function) => {
      connection.pragma('foreign_keys = ON')
      done()
    }
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './src/database/migrations',
  },
  seeds: {
    extension: 'ts',
    directory: './src/database/seeds',
  },
}

export default config