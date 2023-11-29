const bd = require ('./bd')

const Veiculo = bd.sequelize.define('veiculo', {
  placa: {
    type: bd.Sequelize.STRING,
    allowNull: false
  },
  cpf: {
    type: bd.Sequelize.STRING,
    allowNull: false
  },
  condutor: {
    type: bd.Sequelize.STRING,
    allowNull: false
  },
  medida: {
    type: bd.Sequelize.STRING,
    allowNull: false
  },
  date: {
    type: bd.Sequelize.DATE,
    defaultValue: bd.Sequelize.NOW
  }
});

module.exports = Veiculo;
