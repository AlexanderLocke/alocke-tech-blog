const sequelize = require('../config/connection');
const userSeedData = require('./userSeedData'); 
const postSeedData = require('./postSeedData');  

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await userSeedData();

  await postSeedData();

  process.exit(0);
};

seedDatabase();