// firstName -> first_name;
const { knexSnakeCaseMappers } = require("objection");

module.exports = {
  development: {
    client: "",
    connection: {
      database: "",
      user: "",
      password: "",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./seeds",
    },
    ...knexSnakeCaseMappers(),
  },
};
