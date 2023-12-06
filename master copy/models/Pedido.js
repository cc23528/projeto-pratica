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

// Defina as associações com os outros modelos (Produto, Veiculo, Funcionario, Cliente) conforme necessário

const Produto = require('./Produto'); // Certifique-se de ajustar o caminho conforme a estrutura do seu projeto
const Veiculo = require('./Veiculo'); // Certifique-se de ajustar o caminho conforme a estrutura do seu projeto
const Funcionario = require('./Funcionario'); // Certifique-se de ajustar o caminho conforme a estrutura do seu projeto
const Cliente = require('./Cliente'); // Certifique-se de ajustar o caminho conforme a estrutura do seu projeto

Pedido.belongsTo(Produto, { foreignKey: 'id_produto', as: 'produto' });
Pedido.belongsTo(Veiculo, { foreignKey: 'placa_veiculo', as: 'veiculo' });
Pedido.belongsTo(Funcionario, { foreignKey: 'cpf_funcionario', as: 'funcionario' });
Pedido.belongsTo(Cliente, { foreignKey: 'cpf_cliente', as: 'cliente' });

module.exports = Pedido;