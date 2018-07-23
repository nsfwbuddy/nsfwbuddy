const env = require('./config/env');

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: env.DB_NAME,
      user:     env.DB_USER,
      password: env.DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  test: {
    client: 'postgresql',
    connection: {
      database: env.DB_NAME,
      user:     env.DB_USER,
      password: env.DB_PASSWORD
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: env.DB_NAME,
      user:     env.DB_USER,
      password: env.DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: env.DB_NAME,
      user:     env.DB_USER,
      password: env.DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
