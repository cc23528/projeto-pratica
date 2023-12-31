const bd = require ('./bd')

const Condutor = bd.sequelize.define('condutor', {
  nome_condutor: {
    type: bd.Sequelize.STRING,
    allowNull: false
  },
  cpf_condutor: {
    type: bd.Sequelize.STRING,
    allowNull: false
  },
  carteira: {
    type: bd.Sequelize.STRING,
    allowNull: false
  },
  nacionalidade_condutor: {
    type: bd.Sequelize.STRING,
    allowNull: false
  },
  nascimento_condutor: {
    type: bd.Sequelize.DATE,
    allowNull: false
  },
  date: {
    type: bd.Sequelize.DATE,
    defaultValue: bd.Sequelize.NOW
  }
});

bd.sequelize.sync()
  .then(() => {
    console.log('Tabela Funcionario sincronizada com sucesso');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar a tabela Funcionario:', error);
  });
  
module.exports = Condutor;

