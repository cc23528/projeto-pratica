const bd = require ('./bd');

const Pedido = bd.sequelize.define('Pedido', {
  id_pedido: {
    type: bd.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  dia: {
    type: bd.Sequelize.DATE,
    allowNull: false,
  },
  situacao: {
    type: bd.Sequelize.STRING,
    allowNull: false,
  },
  id_produto: {
    type: bd.Sequelize.INTEGER,
    allowNull: false,
  },
  placa_veiculo: {
    type: bd.Sequelize.STRING,
    allowNull: false,
  },
  cpf_funcionario: {
    type: bd.Sequelize.STRING,
    allowNull: false,
  },
  cpf_cliente: {
    type: bd.Sequelize.STRING,
    allowNull: false,
  },
  dia_retirada_entrega: {
    type: bd.Sequelize.DATE,
    allowNull: false,
  },
});



module.exports = Pedido;