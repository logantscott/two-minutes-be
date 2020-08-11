require('dotenv').config();
require('./lib/utils/connect')();

const seed = require('./data-helpers/seed');
seed();
