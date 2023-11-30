const bd = require ('./bd');

const Funcionario = bd.sequelize.define('funcionario', {
  nome: {
    type:  bd.Sequelize.STRING,
    allowNull: false
  },
  cpf: {
    type:  bd.Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  cargo: {
    type:  bd.Sequelize.STRING,
    allowNull: false
  },
  datanascimento: {
    type:  bd.Sequelize.DATE,
    allowNull: false
  },
  date: {
    type:  bd.Sequelize.DATE,
    defaultValue: bd.sequelize.fn('NOW') // Use bd.sequelize.fn para chamar funções SQL, neste caso, NOW()
  }
});

// Sincronize o modelo com o banco de dados
bd.sequelize.sync()
  .then(() => {
    console.log('Tabela Funcionario sincronizada com sucesso');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar a tabela Funcionario:', error);
  });

module.exports = Funcionario;
