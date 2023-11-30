const bd = require('./bd');

const Cliente = bd.sequelize.define('cliente', {
  nome_cliente: {
    type: bd.Sequelize.STRING,
    allowNull: false
  },
  cpf_cliente: {
    type: bd.Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  telefone_cliente: {
    type: bd.Sequelize.INTEGER, // Corrigido o tipo de dados para INTEGER
    allowNull: false
  },
  endereco_cliente: {
    type: bd.Sequelize.STRING,
    allowNull: false
  },
  nome_estabelecimento: {
    type: bd.Sequelize.STRING,
    allowNull: false
  },
  date: {
    type: bd.Sequelize.DATE,
    defaultValue: bd.sequelize.fn('NOW')
  }
});

bd.sequelize.sync()
  .then(() => {
    console.log('Tabela cliente sincronizada com sucesso');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar a tabela cliente:', error);
  });

module.exports = Cliente;
