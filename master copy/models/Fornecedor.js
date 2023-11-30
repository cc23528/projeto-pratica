const bd = require ('./bd');

const Fornecedor = bd.sequelize.define('fornecedor', {
    id_fornecedor: {
      type: bd.Sequelize.INTEGER,
      allowNull: false,
    },
    nome_fornecedor: {
      type: bd.Sequelize.STRING,
      allowNull: false,
    },
    endereco: {
      type: bd.Sequelize.STRING,
      allowNull: false,
    },
    telefone: {
      type: bd.Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: bd.Sequelize.STRING,
      allowNull: false,
    },
    date: {
      type: bd.Sequelize.DATE,
      defaultValue: bd.sequelize.fn('NOW'),
    },
  },
  {
    tableName: 'fornecedor', // Especifique o nome correto da tabela
    freezeTableName: true, // Desativa a pluralização automática
  }
);

// Sincronize o modelo com o banco de dados
bd.sequelize.sync()
  .then(() => {
    console.log('Tabela Fornecedor sincronizada com sucesso');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar a tabela Fornecedor:', error);
  });



module.exports = Fornecedor;
