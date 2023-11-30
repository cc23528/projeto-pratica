const bd = require ('./bd');

const Produto = bd.sequelize.define('produto', {
  id_produto: {
    type:  bd.Sequelize.INTEGER,
    allowNull: false
  },
  descricao: {
    type:  bd.Sequelize.STRING,
    allowNull: false
  },
  preco: {
    type:  bd.Sequelize.FLOAT,
    allowNull: false
  },
  quantidade: {
    type:  bd.Sequelize.INTEGER,
    allowNull: false
  },
  date: {
    type:  bd.Sequelize.DATE,
    defaultValue: bd.sequelize.fn('NOW') // Use bd.sequelize.fn para chamar funções SQL, neste caso, NOW()
  },
},
{
  tableName: 'produto', // Especifique o nome correto da tabela
  freezeTableName: true, // Desativa a pluralização automática
}
);

// Sincronize o modelo com o banco de dados
bd.sequelize.sync()
  .then(() => {
    console.log('Tabela Produto sincronizada com sucesso');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar a tabela Produto:', error);
  });

module.exports = Produto;
