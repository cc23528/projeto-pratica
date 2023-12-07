const bd = require('./bd');

const Bebida = bd.sequelize.define('bebida', {
  id_bebida: {
    type: bd.Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  nome_bebida: {
    type: bd.Sequelize.STRING,
    allowNull: false
  },
  tipo_bebida: {
    type: bd.Sequelize.STRING, 
    allowNull: false
  },
  quantidade_bebida: {
    type: bd.Sequelize.INTEGER,
    allowNull: false
  },
  preco_bebida: {
    type: bd.Sequelize.FLOAT,
    allowNull: false
  },
  imagem_bebida: {
    type: bd.Sequelize.BLOB,
    allowNull: false
  }
}
,{
  tableName: 'bebida', // Especifique o nome correto da tabela
  freezeTableName: true, // Desativa a pluralização automática
}
);

bd.sequelize.sync()
  .then(() => {
    console.log('Tabela bebida sincronizada com sucesso');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar a tabela bebida:', error);
  });


module.exports = Bebida;
