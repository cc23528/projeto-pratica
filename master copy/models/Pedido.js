const bd = require ('./bd');

const Pedido = bd.sequelize.define('pedido', {
  id_pedido: {
    type:  bd.Sequelize.NUMBER,
    allowNull: false
  },
  situacao: {
    type:  bd.Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  id_produto: {
    type:  bd.Sequelize.NUMBER,
    allowNull: false
  },
  cpf: {
    type:  bd.Sequelize.NUMBER,
    allowNull: false
  },
  cpf_cliente: {
    type:  bd.Sequelize.NUMBER,
    allowNull: false
  },
  dia_retirada_entrega: {
    type:  bd.Sequelize.DATE,
    allowNull: false
  },
  dia: {
    type:  bd.Sequelize.DATE,
    allowNull: false
  },
  date: {
    type:  bd.Sequelize.DATE,
    defaultValue: bd.sequelize.fn('NOW') // Use bd.sequelize.fn para chamar funções SQL, neste caso, NOW()
  }
});

module.exports = Pedido;
