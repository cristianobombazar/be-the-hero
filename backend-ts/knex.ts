import Knex  from 'Knex';
const knexConfig  = require("./knexfile");

const knex = Knex(knexConfig.development);

export default knex;