const express = require('express');
const router = express.Router();
const path = require('path');
const Funcionario = require('../models/Funcionario');
const Condutor = require('../models/Condutor')
const Veiculo = require('../models/Veiculo')
const Cliente = require('../models/Cliente')
const Fornecedor = require('../models/Fornecedor')
const Produto = require('../models/Produto')
const Pedido = require('../models/Pedido')
const Bebida = require('../models/Bebida')

router.get('/', (req, res) => {
  res.render('admin/home');
});

router.get('/funcionario', async (req, res) => {
  try {
    const funcionario = await Funcionario.findAll({ order: [['date', 'DESC']], raw: true });
    res.render('admin/funcionario', { funcionario: funcionario });
    console.log("sei la")
  } catch (err) {
    req.flash('error-msg', 'Houve um erro ao listar os funcionários');
    res.redirect('/admin');
    console.log("deu erro" + err)
  }
});

router.get('/funcionario/add', (req, res) => {
  res.render('admin/addfuncionario');
});

router.post('/funcionario/novo', async (req, res) => {
  try {
    let erros = [];

    if(req.body.nome.length < 4){
      if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: "Nome invalido"})
      }else{
      erros.push({texto: "Nome da Funcionario muito pequeno"})
      }
    }
  
    if(req.body.cpf.length < 11){
      if(!req.body.cpf || typeof req.body.cpf == undefined || req.body.cpf == null){
        erros.push({texto: "Cpf invalido"})
      }else{
        erros.push({texto: "Cpf da Funcionario muito pequeno"})
      }
    }
  
    if(req.body.cargo.length < 2){
      if(!req.body.cargo || typeof req.body.cargo == undefined || req.body.cargo == null){
        erros.push({texto: "Cargo invalido"})
      }else{
        erros.push({texto: "Cargo da Funcionario muito pequeno"})
      }
    }
  
    if(!req.body.datanascimento || typeof req.body.datanascimento == undefined || req.body.datanascimento == null){
      erros.push({texto: "Data de nascimento invalido"})
    }

    if (erros.length > 0) {
      res.render('admin/addfuncionario', { erros: erros });
    } else {
      const novoFuncionario = {
        nome: req.body.nome,
        cpf: req.body.cpf,
        cargo: req.body.cargo,
        datanascimento: req.body.datanascimento,
      };

      await Funcionario.create(novoFuncionario);
      req.flash('success_msg', 'Funcionário criado com sucesso!');
      res.redirect('/admin/funcionario');
    }
  } catch (err) {
    req.flash('error_msg', 'Houve um erro ao salvar o funcionário, tente novamente!');
    res.redirect('/admin');
  }
});

router.get('/funcionario/edit/:id', async (req, res) => {
  try {
    const funcionario = await Funcionario.findByPk(req.params.id, { raw: true });
    res.render('admin/editfuncionario', { funcionario: funcionario });
  } catch (erro) {
    req.flash('error_msg', 'Este Funcionário não existe');
    res.redirect('/admin/funcionario');
  }
});

router.post('/funcionario/edit', async (req, res) => {
  try {
    let erros = [];

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
      erros.push({texto: "Nome invalido"})
    }

    if(!req.body.cpf || typeof req.body.cpf == undefined || req.body.cpf == null){
        erros.push({texto: "Cpf invalido"})
    }

    if(!req.body.cargo || typeof req.body.cargo == undefined || req.body.cargo == null){
        erros.push({texto: "Cargo invalido"})
    }

    if(!req.body.datanascimento || typeof req.body.datanascimento == undefined || req.body.datanascimento == null){
      erros.push({texto: "Data de nascimento invalido"})
    }

    if(req.body.nome.length < 4){
        erros.push({texto: "Nome da Funcionario muito pequeno"})
    }

    if(req.body.cpf.length < 11){
      erros.push({texto: "Cpf da Funcionario muito pequeno"})
    }

    if(req.body.cargo.length < 2){
      erros.push({texto: "Cargo da Funcionario muito pequeno"})
    }

    if (erros.length > 0) {
      res.render('admin/editfuncionario', { erros: erros });
    } else {
      const funcionario = await Funcionario.findByPk(req.body.id);

      funcionario.nome = req.body.nome;
      funcionario.cpf = req.body.cpf;
      funcionario.cargo = req.body.cargo;
      funcionario.datanascimento = req.body.datanascimento;

      await funcionario.save();
      req.flash('success_msg', 'Funcionário editado com sucesso!');
      res.redirect('/admin/funcionario');
    }
  } catch (err) {
    req.flash('error_msg', 'Houve um erro ao editar o funcionário');
    res.redirect('/admin/funcionario');
  }
});

router.post('/funcionario/deletar', async (req, res) => {
  try {
    await Funcionario.destroy({ where: { id: req.body.id } });
    req.flash('success_msg', 'Funcionário deletado com sucesso!!!');
    res.redirect('/admin/funcionario');
  } catch (err) {
    req.flash('error_msg', 'Houve um erro ao deletar o Funcionário' + err);
    res.redirect('/admin/funcionario');
  }
});

router.get('/condutor', async (req, res) => {
  try {
    const condutores = await Condutor.findAll({ order: [['date', 'DESC']], raw: true });
    res.render('admin/condutor', { condutor: condutores });
  } catch (err) {
    req.flash('error-msg', 'Houve um erro ao listar os condutores');
    res.redirect('/admin');
  }
});

router.get('/condutor/add', (req, res) => {
  res.render('admin/addcondutor');
});

router.post('/condutor/novo', async (req, res) => {
  try {
    let erros = [];

    if(req.body.nome_condutor.length < 4){
      if(!req.body.nome_condutor || typeof req.body.nome_condutor == undefined || req.body.nome_condutor == null){
        erros.push({texto: "Nome invalido"})
      }else{
      erros.push({texto: "Nome do Condutor muito pequeno"})
      }
    }
  
    if(req.body.cpf_condutor.length < 11){
      if(!req.body.cpf_condutor || typeof req.body.cpf_condutor == undefined || req.body.cpf_condutor == null){
        erros.push({texto: "Cpf invalido"})
      }else{
        erros.push({texto: "Cpf do Condutor muito pequeno"})
      }
    }
  
  
      if(!req.body.carteira || typeof req.body.carteira == undefined || req.body.carteira == null || typeof req.body.carteira == Number){
        erros.push({texto: "Carteira invalida"})
      }
  
      if(!req.body.nacionalidade_condutor || typeof req.body.nacionalidade_condutor == undefined || req.body.nacionalidade_condutor == null){
        erros.push({texto: "Nacionalidede invalida"})
      }
    
  
    if(!req.body.nascimento_condutor || typeof req.body.nascimento_condutor == undefined || req.body.nascimento_condutor == null){
      erros.push({texto: "Data de nascimento invalida"})
    }

    if (erros.length > 0) {
      res.render('admin/addcondutor', { erros: erros });
    } else {
      const novoCondutor = {
        nome_condutor: req.body.nome_condutor,
        cpf_condutor: req.body.cpf_condutor,
        carteira: req.body.carteira,
        nacionalidade_condutor: req.body.nacionalidade_condutor,
        nascimento_condutor: req.body.nascimento_condutor,
      };

      await Condutor.create(novoCondutor);
      req.flash('success_msg', 'Condutor criado com sucesso!');
      res.redirect('/admin/condutor');
    }
  } catch (err) {
    req.flash('error_msg', 'Houve um erro ao salvar o condutor, tente novamente!');
    res.redirect('/admin');
  }
});

router.post('/condutor/deletar', async (req, res) => {
  try {
    await Condutor.destroy({ where: { id: req.body.id } });
    req.flash('success_msg', 'Condutor deletado com sucesso!!!');
    res.redirect('/admin/condutor');
  } catch (err) {
    req.flash('error_msg', 'Houve um erro ao deletar o Condutor' + err);
    res.redirect('/admin/condutor');
  }
});

router.get('/veiculo', async (req, res) => {
  try {
    const veiculos = await Veiculo.findAll({ order: [['date', 'DESC']], raw: true });

    // Crie um mapeamento de CPF para nome de condutor
    const cpfToNomeMap = {};
    const condutores = await Condutor.findAll({ raw: true });
    condutores.forEach((condutor) => {
      cpfToNomeMap[condutor.cpf_condutor] = condutor.nome_condutor;
    });

    // Substitua os CPFs dos veículos pelos nomes dos condutores
    veiculos.forEach((veiculo) => {
      veiculo.nome_condutor = cpfToNomeMap[veiculo.cpf];
    });

    res.render('admin/veiculo', { veiculo: veiculos });
  } catch (err) {
    req.flash('error-msg', 'Houve um erro ao listar os veículos');
    res.redirect('/admin');
  }
});

router.get('/veiculo/add', async (req, res) => {
  try {
    const [condutor, cpfs] = await Promise.all([
      Condutor.findAll({ order: [['nascimento_condutor', 'ASC']], raw: true }),
      Condutor.findAll({ attributes: ['cpf_condutor'], order: [['nascimento_condutor', 'ASC']], raw: true }),
    ]);

    const cpfsWithNames = cpfs.map((cpf) => {
      const condutorData = condutor.find((c) => c.cpf_condutor === cpf.cpf_condutor);
      return `${cpf.cpf_condutor} (${condutorData ? condutorData.nome_condutor : 'Nome não encontrado'})`;
    });

    res.render('admin/addveiculo', { cpfsWithNames, condutor });
  } catch (err) {
    req.flash('error-msg', 'Houve um erro ao listar os condutores e CPFs');
    res.redirect('/admin');
  }
});

router.post('/veiculo/novo', async (req, res) => {
  try {
    let erros = [];

      if(req.body.placa.length < 6 || req.body.placa.length > 8){
        if(!req.body.placa || typeof req.body.placa == undefined || req.body.placa == null){
          erros.push({texto: "Placa invalido"})
        }else{
        erros.push({texto: "Tamanho de placa invalida"})
        }
      }
  
      if(!req.body.condutor || typeof req.body.condutor == undefined || req.body.condutor == null){
        erros.push({texto: "Condutor invalido"})
      }
  
      if(!req.body.cpf || typeof req.body.cpf == undefined || req.body.cpf == null){
        erros.push({texto: "CPF invalido"})
      }
  
      if(!req.body.medida || typeof req.body.medida == undefined || req.body.medida == null){
        erros.push({texto: "Medida invalida"})
      }

    if (erros.length > 0) {
      res.render('admin/addveiculo', { erros: erros });
    } else {
      const novoVeiculo = {
        placa: req.body.placa,
        condutor: req.body.condutor,
        cpf: req.body.cpf,
        medida: req.body.medida,
      };

      await Veiculo.create(novoVeiculo);
      req.flash('success_msg', 'Veiculo criado com sucesso!');
      res.redirect('/admin/veiculo');
    }
  } catch (err) {
    req.flash('error_msg', 'Houve um erro ao salvar o veiculo, tente novamente!' + err);
    res.redirect('/admin');
  }
});

router.get('/veiculo/edit/:id', async (req, res) => {
  try {
    // Busque o veículo pelo ID
    const veiculo = await Veiculo.findOne({ where: { id: req.params.id }, raw: true });

    // Busque todos os condutores
    const condutor = await Condutor.findAll({ raw: true });

    res.render('admin/editveiculo', { veiculo: veiculo, condutor: condutor });
  } catch (erro) {
    req.flash('error_msg', 'Este Veiculo não existe');
    res.redirect('/admin/veiculo');
  }
});

router.post('/veiculo/edit', async (req, res) => {
  try {
    let erros = [];

      if(req.body.placa.length < 6 || req.body.placa.length > 8){
        if(!req.body.placa || typeof req.body.placa == undefined || req.body.placa == null){
          erros.push({texto: "Placa invalido"})
        }else{
        erros.push({texto: "Tamanho de placa invalida"})
        }
      }
  
      if(!req.body.condutor || typeof req.body.condutor == undefined || req.body.condutor == null){
        erros.push({texto: "Condutor invalido"})
      }
  
      if(!req.body.cpf || typeof req.body.cpf == undefined || req.body.cpf == null){
        erros.push({texto: "CPF invalido"})
      }
  
      if(!req.body.medida || typeof req.body.medida == undefined || req.body.medida == null){
        erros.push({texto: "Medida invalida"})
      }

    if (erros.length > 0) {
      res.render('admin/addveiculo', { erros: erros });
    } else {
      const veiculo = await Veiculo.findByPk(req.body.id);

      veiculo.placa = req.body.placa;
      veiculo.condutor = req.body.condutor;
      veiculo.cpf = req.body.cpf;
      veiculo.medida = req.body.medida;

      await veiculo.save();
      req.flash('success_msg', 'Veiculo editado com sucesso!');
      res.redirect('/admin/veiculo');
    }
  } catch (err) {
    req.flash('error_msg', 'Houve um erro ao editar o veiculo' + err);
    res.redirect('/admin/veiculo');
  }
});

router.post('/veiculo/deletar', async (req, res) => {
  try {
    await Veiculo.destroy({ where: { id: req.body.id } });
    req.flash('success_msg', 'Veiculo deletado com sucesso!!!');
    res.redirect('/admin/veiculo');
  } catch (err) {
    req.flash('error_msg', 'Houve um erro ao deletar o veiculo' + err);
    res.redirect('/admin/veiculo');
  }
});








router.get('/cliente', async (req, res) => {
  try {
    const cliente = await Cliente.findAll({ order: [['date', 'DESC']], raw: true });
    res.render('admin/cliente', { cliente: cliente });
    console.log("deu certo")
  } catch (err) {
    req.flash('error-msg', 'Houve um erro ao listar os clientes');
    res.redirect('/admin');
    console.log("deu erro" + err)
  }
});

router.get('/cliente/add', (req, res) => {
  res.render('admin/addcliente');
});

router.post('/cliente/novo', async (req, res) => {
  try {
    let erros = [];

    if(req.body.nome_cliente.length < 4){
      if(!req.body.nome_cliente || typeof req.body.nome_cliente == undefined || req.body.nome_cliente == null){
        erros.push({texto: "Nome invalido"})
      }else{
      erros.push({texto: "Nome do Cliente muito pequeno"})
      }
    }
  
    if(req.body.cpf_cliente.length < 11){
      if(!req.body.cpf_cliente || typeof req.body.cpf_cliente == undefined || req.body.cpf_cliente == null){
        erros.push({texto: "Cpf invalido"})
      }else{
        erros.push({texto: "Cpf do Cliente muito pequeno"})
      }
    }
  
    if(req.body.telefone_cliente.length < 8){
      if(!req.body.telefone_cliente || typeof req.body.telefone_cliente == undefined || req.body.telefone_cliente == null){
        erros.push({texto: "Telefone invalido"})
      }else{
        erros.push({texto: "Telefone do cliente muito pequeno"})
      }
    }
  
    if(!req.body.endereco_cliente || typeof req.body.endereco_cliente == undefined || req.body.endereco_cliente == null){
      erros.push({texto: "Endereço de nascimento invalido"})
    }

    if(!req.body.nome_estabelecimento || typeof req.body.nome_estabelecimento == undefined || req.body.nome_estabelecimento == null){
      erros.push({texto: "Estabelecimento de nascimento invalido"})
    }

    if (erros.length > 0) {
      res.render('admin/addcliente', { erros: erros });
    } else {
      const novoCliente = {
        nome_cliente: req.body.nome_cliente,
        cpf_cliente: req.body.cpf_cliente,
        telefone_cliente: req.body.telefone_cliente,
        endereco_cliente: req.body.endereco_cliente,
        nome_estabelecimento: req.body.nome_estabelecimento,
      };
      

      await Cliente.create(novoCliente);
      req.flash('success_msg', 'Funcionário criado com sucesso!');
      res.redirect('/admin/cliente');
      console.log("deu certo")
    }
  } catch (err) {
    req.flash('error_msg', 'Houve um erro ao salvar o funcionário, tente novamente!');
    res.redirect('/admin');
    console.log("deu erro " + err)
  }
});

router.get('/cliente/edit/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id, { raw: true });
    res.render('admin/editcliente', { cliente: cliente });
  } catch (erro) {
    req.flash('error_msg', 'Este Funcionário não existe');
    res.redirect('/admin/cliente');
  }
});

router.post('/cliente/edit', async (req, res) => {
  try {
    let erros = [];

    if(req.body.nome_cliente.length < 4){
      if(!req.body.nome_cliente || typeof req.body.nome_cliente == undefined || req.body.nome_cliente == null){
        erros.push({texto: "Nome invalido"})
      }else{
      erros.push({texto: "Nome do Cliente muito pequeno"})
      }
    }
  
    if(req.body.cpf_cliente.length < 11){
      if(!req.body.cpf_cliente || typeof req.body.cpf_cliente == undefined || req.body.cpf_cliente == null){
        erros.push({texto: "Cpf invalido"})
      }else{
        erros.push({texto: "Cpf do Cliente muito pequeno"})
      }
    }
  
    if(req.body.telefone_cliente.length < 8){
      if(!req.body.telefone_cliente || typeof req.body.telefone_cliente == undefined || req.body.telefone_cliente == null){
        erros.push({texto: "Telefone invalido"})
      }else{
        erros.push({texto: "Telefone do cliente muito pequeno"})
      }
    }
  
    if(!req.body.endereco_cliente || typeof req.body.endereco_cliente == undefined || req.body.endereco_cliente == null){
      erros.push({texto: "Endereço de nascimento invalido"})
    }

    if(!req.body.nome_estabelecimento || typeof req.body.nome_estabelecimento == undefined || req.body.nome_estabelecimento == null){
      erros.push({texto: "Estabelecimento de nascimento invalido"})
    }

    if (erros.length > 0) {
      res.render('admin/cliente', { erros: erros });
    } else {
      const cliente = await Cliente.findByPk(req.body.id);

      cliente.nome_cliente = req.body.nome_cliente;
      cliente.cpf_cliente = req.body.cpf_cliente;
      cliente.telefone_cliente = req.body.telefone_cliente;
      cliente.endereco_cliente = req.body.endereco_cliente;
      cliente.nome_estabelecimento = req.body.nome_estabelecimento;


      await cliente.save();
      req.flash('success_msg', 'Funcionário editado com sucesso!');
      res.redirect('/admin/cliente');
    }
  } catch (err) {
    req.flash('error_msg', 'Houve um erro ao editar o funcionário');
    res.redirect('/admin/cliente');
  }
});

router.post('/cliente/deletar', async (req, res) => {
  try {
    await Cliente.destroy({ where: { id: req.body.id } });
    req.flash('success_msg', 'Funcionário deletado com sucesso!!!');
    res.redirect('/admin/cliente');
  } catch (err) {
    req.flash('error_msg', 'Houve um erro ao deletar o Funcionário' + err);
    res.redirect('/admin/cliente');
  }
});








router.get('/fornecedor', async (req, res) => {
  try {
    const fornecedor = await Fornecedor.findAll({ order: [['date', 'DESC']], raw: true });
    res.render('admin/fornecedor', { fornecedor: fornecedor });
    console.log("deu certo")
  } catch (err) {
    req.flash('error-msg', 'Houve um erro ao listar os fornecedores');
    res.redirect('/admin');
    console.log("deu erro "+ err)
  }
});

router.get('/fornecedor/add', (req, res) => {
  res.render('admin/addfornecedor');
});

router.post('/fornecedor/novo', async (req, res) => {
  try {
    let erros = [];

    if(req.body.id_fornecedor.length < 1){
      if(!req.body.id_fornecedor || typeof req.body.id_fornecedor == undefined || req.body.id_fornecedor == null){
        erros.push({texto: "ID invalido"})
      }else{
      erros.push({texto: "ID invalido"})
      }
    }
  
    if(req.body.nome_fornecedor.length < 3){
      if(!req.body.nome_fornecedor || typeof req.body.nome_fornecedor == undefined || req.body.nome_fornecedor == null){
        erros.push({texto: "Nome invalido"})
      }else{
        erros.push({texto: "Nome do fornecedor muito pequeno"})
      }
    }
  
  
      if(!req.body.endereco || typeof req.body.endereco == undefined || req.body.endereco == null){
        erros.push({texto: "Endereço invalida"})
      }
  
      if(!req.body.telefone || typeof req.body.telefone == undefined || req.body.telefone == null){
        erros.push({texto: "Telefone invalido"})
      }
    
  
    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
      erros.push({texto: "Email Invalido"})
    }

    if (erros.length > 0) {
      res.render('admin/addfornecedor', { erros: erros });
      console.log("deu bosta")
    } else {
      const novoFornecedor = {
        id_fornecedor: req.body.id_fornecedor,
        nome_fornecedor: req.body.nome_fornecedor,
        endereco: req.body.endereco,
        telefone: req.body.telefone,
        email: req.body.email,
      };

      console.log("ta indo")
      await Fornecedor.create(novoFornecedor);
      console.log("ta indo 22")
      req.flash('success_msg', 'Fornecedor criado com sucesso!');
      res.redirect('/admin/fornecedor');
      console.log("funcionou")
    }
    } catch (err) {
      req.flash('error_msg', 'Houve um erro ao salvar o Fornecedor, tente novamente!');
      res.redirect('/admin');
      console.log("deu erro " + err)
    }
  });


  router.get('/fornecedor/edit/:id', async (req, res) => {
    try {
      const fornecedor = await Fornecedor.findByPk(req.params.id, { raw: true });
      res.render('admin/editfornecedor', { fornecedor: fornecedor });
    } catch (erro) {
      req.flash('error_msg', 'Este Funcionário não existe');
      res.redirect('/admin/fornecedor');
    }
  });
  
  router.post('/fornecedor/edit', async (req, res) => {
    try {
      let erros = [];
  
      if(req.body.id_fornecedor.length < 1){
        if(!req.body.id_fornecedor || typeof req.body.id_fornecedor == undefined || req.body.id_fornecedor == null){
          erros.push({texto: "ID invalido"})
        }else{
        erros.push({texto: "ID invalido"})
        }
      }
    
      if(req.body.nome_fornecedor.length < 3){
        if(!req.body.nome_fornecedor || typeof req.body.nome_fornecedor == undefined || req.body.nome_fornecedor == null){
          erros.push({texto: "Nome invalido"})
        }else{
          erros.push({texto: "Nome do fornecedor muito pequeno"})
        }
      }
    
    
        if(!req.body.endereco || typeof req.body.endereco == undefined || req.body.endereco == null){
          erros.push({texto: "Endereço invalida"})
        }
    
        if(!req.body.telefone || typeof req.body.telefone == undefined || req.body.telefone == null){
          erros.push({texto: "Telefone invalido"})
        }
      
    
      if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
        erros.push({texto: "Email Invalido"})
      }
  
      if (erros.length > 0) {
        res.render('admin/editfornecedor', { erros: erros });
      } else {
        const fornecedor = await Fornecedor.findByPk(req.body.id);
  
        fornecedor.id_fornecedor = req.body.id_fornecedor;
        fornecedor.nome_fornecedor = req.body.nome_fornecedor;
        fornecedor.endereco = req.body.endereco;
        fornecedor.telefone = req.body.telefone;
        fornecedor.email = req.body.email;
  
        await fornecedor.save();
        req.flash('success_msg', 'fornecedor editado com sucesso!');
        res.redirect('/admin/fornecedor');
      }
    } catch (err) {
      req.flash('error_msg', 'Houve um erro ao editar o fornecedor');
      res.redirect('/admin/fornecedor');
    }
  });


  router.post('/fornecedor/deletar', async (req, res) => {
    try {
      await Fornecedor.destroy({ where: { id: req.body.id } });
      req.flash('success_msg', 'fornecedor deletado com sucesso!!!');
      res.redirect('/admin/fornecedor');
    } catch (err) {
      req.flash('error_msg', 'Houve um erro ao deletar o fornecedor' + err);
      res.redirect('/admin/fornecedor');
    }
  });



  router.get('/produto', async (req, res) => {
    try {
        const produtos = await Produto.findAll({ order: [['date', 'DESC']], raw: true });
        console.log(produtos); // Adicione esta linha para verificar os dados

        res.render('admin/produto', { produto: produtos });
        console.log("deu certo");
    } catch (err) {
        req.flash('error-msg', 'Houve um erro ao listar os produtos');
        res.redirect('/admin');
        console.log("deu erro " + err);
    }
});

  
  router.get('/produto/add', async (req, res) => {
    try {
        // Buscar todas as bebidas da tabela Bebida
        const bebidas = await Bebida.findAll({
          attributes: ['id_bebida'],
          raw: true, // Para obter resultados simples de objetos em vez de instâncias do Sequelize
      });
      
        console.log(bebidas);  // Adicione este log para verificar os dados

        // Renderizar a página, passando as bebidas como variável
        res.render('admin/addproduto', { bebidas });

    } catch (error) {
        // Tratar erros, por exemplo, redirecionando para uma página de erro
        res.render('admin/produto', { error });
        console.log("erro " + error);
    }
});

  
  
  
  router.post('/produto/novo', async (req, res) => {
    try {
      let erros = [];
  
      if (!req.body.id_produto || isNaN(parseInt(req.body.id_produto))) {
        erros.push({ texto: "ID do produto inválido" });
      }
      
      if (!req.body.descricao || req.body.descricao.length < 3) {
          erros.push({ texto: "Descrição inválida" });
      }
      
      if (!req.body.quantidade || isNaN(parseInt(req.body.quantidade))) {
          erros.push({ texto: "Quantidade inválida" });
      }
    
  
        if (erros.length > 0) {
          res.render('/admin/addproduto', { erros: erros });
          console.log("deu erro")
      } else {
          const novoProduto = {
              id_produto: req.body.id_produto,
              descricao: req.body.descricao,
              quantidade: req.body.quantidade,
          };
          await Produto.create(novoProduto);
          req.flash('success_msg', 'PRODUTO criado com sucesso!');
          res.redirect('/admin/produto'); // Alterado para redirecionar para a rota de listagem de produtos
          console.log("funcionou")
      }
      } catch (err) {
        req.flash('error_msg', 'Houve um erro ao salvar o Produto, tente novamente!');
        res.redirect('/admin');
        console.log("deu erro1 " + err)
      }
    });
  

    router.get('/produto/edit/:id', async (req, res) => {
      try {
        const produto = await Produto.findByPk(req.params.id, { raw: true });
        res.render('admin/editproduto', { produto: produto });
      } catch (erro) {
        req.flash('error_msg', 'Este produto não existe');
        res.redirect('/admin/produto');
      }
    });
    
    router.post('/produto/edit', async (req, res) => {
      try {
        let erros = [];
    
        if(req.body.id_produto.length < 1){
          if(!req.body.id_produto || typeof req.body.id_produto == undefined || req.body.id_produto == null){
            erros.push({texto: "ID invalido"})
          }else{
          erros.push({texto: "ID invalido"})
          }
        }
      
        if(req.body.descricao.length < 3){
          if(!req.body.descricao || typeof req.body.descricao == undefined || req.body.descricao == null){
            erros.push({texto: "Descrição invalido"})
          }else{
            erros.push({texto: "Descrição muito pequeno"})
          }
        }
      
          if(!req.body.quantidade || typeof req.body.quantidade == undefined || req.body.quantidade == null){
            erros.push({texto: "Quantidade invalida"})
          }
    
        if (erros.length > 0) {
          res.render('admin/editproduto', { erros: erros });
        } else {
          const produto = await Produto.findByPk(req.body.id);
    
          produto.id_produto = req.body.id_produto;
          produto.descricao = req.body.descricao;
          produto.quantidade = req.body.quantidade;
    
          await produto.save();
          req.flash('success_msg', 'produto editado com sucesso!');
          res.redirect('/admin/produto');
        }
      } catch (err) {
        req.flash('error_msg', 'Houve um erro ao editar o produto');
        res.redirect('/admin/produto');
      }
    });

    router.post('/produto/deletar', async (req, res) => {
      try {
        await Produto.destroy({ where: { id: req.body.id } });
        req.flash('success_msg', 'produto deletado com sucesso!!!');
        res.redirect('/admin/produto');
      } catch (err) {
        req.flash('error_msg', 'Houve um erro ao deletar o produto' + err);
        res.redirect('/admin/produto');
      }
    });
  

    router.get('/pedido', async (req, res) => {
      try {
        const [produtos, veiculos, funcionarios, clientes, pedidos] = await Promise.all([
          Produto.findAll({ raw: true }),
          Veiculo.findAll({ raw: true }),
          Funcionario.findAll({ raw: true }),
          Cliente.findAll({ raw: true }),
          Pedido.findAll({ raw: true }),
        ]);
    
        res.render('admin/pedido', { produtos, veiculos, funcionarios, clientes, pedidos });
      } catch (err) {
        console.error(err);
        req.flash('error-msg', 'Houve um erro ao listar os pedidos');
        res.redirect('/admin');
      }
    });
    
    
    // Importe os modelos necessários (Produto, Veiculo, Funcionario, Cliente) aqui

    router.get('/pedido/add', async (req, res) => {
      try {
        // Busque dados adicionais necessários para preencher os selects
        const [produtos, veiculos, funcionarios, clientes] = await Promise.all([
          Produto.findAll(),
          Veiculo.findAll(),
          Funcionario.findAll(),
          Cliente.findAll(),
        ]);
    
        // Renderize a página de adição de pedido com os dados necessários
        res.render('admin/addpedido', {
          produtos: produtos,
          veiculos: veiculos,
          funcionarios: funcionarios,
          clientes: clientes,
        });
      } catch (err) {
        console.error(err);
        req.flash('error-msg', 'Houve um erro ao carregar os dados para adicionar pedido');
        res.redirect('/admin/pedido');
      }
    });
    


  
    // Rota para criar um novo pedido
router.post('/pedido/novo', async (req, res) => {
  try {
    let erros = [];

    // Verificações para o campo "dia"
    if (!req.body.dia) {
      erros.push({ texto: "Data do pedido é obrigatória" });
    }

    // Verificações para o campo "situacao"
    if (req.body.situacao.length < 2) {
      erros.push({ texto: "A situação do pedido é muito curta" });
    }

    // Verificações para o campo "produto"
    if (!req.body.produto) {
      erros.push({ texto: "Selecione um produto válido" });
    }

    // Verificações para o campo "veiculo"
    if (!req.body.veiculo) {
      erros.push({ texto: "Selecione um veículo válido" });
    }

    // Verificações para o campo "funcionario"
    if (!req.body.funcionario) {
      erros.push({ texto: "Selecione um funcionário válido" });
    }

    // Verificações para o campo "cliente"
    if (!req.body.cliente) {
      erros.push({ texto: "Selecione um cliente válido" });
    }

    // Verificações para o campo "dia_retirada_entrega"
    if (!req.body.dia_retirada_entrega) {
      erros.push({ texto: "Data de retirada/entrega é obrigatória" });
    }

    // Se houver erros, renderiza a página com as mensagens de erro
    if (erros.length > 0) {
      // Você pode precisar fornecer outras informações necessárias para preencher os selects na página
      const produtos = await Produto.findAll(); // Substitua por sua lógica de busca de produtos
      const veiculos = await Veiculo.findAll(); // Substitua por sua lógica de busca de veículos
      const funcionarios = await Funcionario.findAll(); // Substitua por sua lógica de busca de funcionários
      const clientes = await Cliente.findAll(); // Substitua por sua lógica de busca de clientes

      res.render('admin/addpedido', { erros: erros, produtos, veiculos, funcionarios, clientes });
    } else {
      // Cria um novo pedido se não houver erros
      const novoPedido = {
        dia: req.body.dia,
        situacao: req.body.situacao,
        id_produto: req.body.produto,
        placa_veiculo: req.body.veiculo,
        cpf_funcionario: req.body.funcionario,
        cpf_cliente: req.body.cliente,
        dia_retirada_entrega: req.body.dia_retirada_entrega,
      };

      await Pedido.create(novoPedido);
      req.flash('success_msg', 'Pedido criado com sucesso!');
      res.redirect('/admin/pedido');
    }
    } catch (err) {
      console.error(err);
      req.flash('error_msg', 'Houve um erro ao criar o pedido, tente novamente!');
      res.redirect('/admin');
    }
  });


module.exports = router;
