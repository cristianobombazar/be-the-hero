// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './resources/database/db.sqlite'
    },
    migrations: {
      directory: './resources/database/migration'
    },
    useNullAsDefault: true
  },

  test: {
    client: 'sqlite3',
    connection: {
      filename: './resources/database/test.sqlite'
    },
    migrations: {
      directory: './resources/database/migration'
    },
    useNullAsDefault: true
  },
  

};
