const { User } = require('../models');

const userData = [
  {
    username: 'bob',
    password: 'pw666',
  }
];

const seedUser = () => User.bulkCreate(userData, {
  individualHooks: true,
  returning: true,
});

module.exports = seedUser;