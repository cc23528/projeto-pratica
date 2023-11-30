const Sequelize = require('sequelize');

const sequelize = new Sequelize('bd23528', 'bd23528', '12345', {
  host: 'db4free.net',
  dialect: 'mysql'
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}