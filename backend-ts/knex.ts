import Knex  from 'Knex';
const knexConfig  = require("./knexfile");

const config = process.env.NODE_ENV === 'test' ? knexConfig.test : knexConfig.development;

const knex = Knex(config);

export default knex;