const express = require('express')
const router = express.Router()
const path = require('path');
const mongoose = require('mongoose')
require('../models/Funcionario')
require('../models/Condutor')
require('../models/Veiculo')
const Funcionario = mongoose.model('funcionario')
const Condutor = mongoose.model('condutor')
const Veiculo = mongoose.model('veiculo')

router.get('/', (req, res) => {
  res.render('admin/home')
}) 

router.get('/funcionario', (req,res) => {
  Funcionario.find().sort({date:'desc'}).lean()
  .then((funcionario) =>{
      res.render("admin/funcionario", {funcionario: funcionario})
  }).catch((err) =>{
      req.flash('error-msg', 'houve um erro ao listar os funcionario')
      res.redirect('/admin')
  })
})

router.get('/funcionario/add', (req,res) => {-
  res.render('admin/addfuncionario')
})

router.post('/funcionario/novo', (req,res) =>{

  let erros = []

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
  
  if(erros.length > 0){
      res.render("admin/addfuncionario", { erros: erros })
  }else{
      const novoFuncionario = {
          nome: req.body.nome,
          cpf: req.body.cpf,
          cargo: req.body.cargo,
          datanascimento: req.body.datanascimento
      }
  
      new Funcionario(novoFuncionario).save().then(() =>{
          req.flash("success_msg", "funcionario criada com sucesso!")
          res.redirect('/admin/funcionario')
      }).catch((err) =>{
          req.flash("error_msg", "houve um erro ao salvar o funcionario, tente novamente!")
          res.redirect('/admin')
      })
  }
})

router.get('/funcionario/edit/:id', (req,res) => {
  Funcionario.findOne({_id:req.params.id}).lean().then((funcionario)=>{
      res.render('admin/editfuncionario', {funcionario: funcionario})
  }).catch((erro) => {
    req.flash('error_msg', 'Este Funcionario nao existe')
    res.redirect('/admin/funcionario')
  })
})

router.post('/funcionario/edit', (req,res) => {

  let erros = []

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

  if(erros.length > 0){
      res.render("admin/addfuncionario", { erros: erros })
  }else{
      Funcionario.findOne({_id: req.body.id}).then((funcionario) => {

          funcionario.nome = req.body.nome
          funcionario.cpf = req.body.cpf
          funcionario.cargo = req.body.cargo
          funcionario.datanascimento = req.body.datanascimento
          

          funcionario.save().then(() => {
              req.flash('success_msg', 'funcionario editada com sucesso!')
              res.redirect('/admin/funcionario')
          }).catch((err) => {
              req.flash('error_msg','houve um erro interno ao salvar a edicao de funcionario')
              res.redirect('/admin/funcionario')
          })
      
        }).catch((err) => {
          req.flash('error_msg', 'houve um erro ao editar o funcionario')
          res.redirect('/admin/funcionario')
        })
  }
})

router.post("/funcionario/deletar",(req,res)=>{
  Funcionario.deleteOne({_id: req.body.id}).then(()=>{
    req.flash("success_msg","Funcionario deletada com sucesso!!!")
    res.redirect("/admin/funcionario")
  }).catch((err)=>{
    req.flash("error_msg","Houve um erro ao deletar a Funcionario"+ err)
    res.redirect("/admin/funcionario")
  })
})

router.get('/condutor', (req,res) => {
  Condutor.find().sort({date:'desc'}).lean()
  .then((condutor) =>{
      res.render("admin/condutor", {condutor: condutor})
  }).catch((err) =>{
      req.flash('error-msg', 'houve um erro ao listar os condutores')
      res.redirect('/admin')
  })
})

router.get('/condutor/add', (req,res) => {-
  res.render('admin/addcondutor')
})

router.post('/condutor/novo', (req,res) =>{

  let erros = []

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
  
  if(erros.length > 0){
      res.render("admin/addcondutor", { erros: erros })
  }else{
      const novoCondutor = {
          nome_condutor: req.body.nome_condutor,
          cpf_condutor: req.body.cpf_condutor,
          carteira: req.body.carteira,
          nacionalidade_condutor: req.body.nacionalidade_condutor,
          nascimento_condutor: req.body.nascimento_condutor
      }
  
      new Condutor(novoCondutor).save().then(() =>{
          req.flash("success_msg", "condutor criado com sucesso!")
          res.redirect('/admin/condutor') 
      }).catch((err) =>{
          req.flash("error_msg", "houve um erro ao salvar o condutor, tente novamente!")
          res.redirect('/admin')
      })
  }
})

router.post("/condutor/deletar",(req,res)=>{
  Condutor.deleteOne({_id: req.body.id}).then(()=>{
    req.flash("success_msg","Condutor deletado com sucesso!!!")
    res.redirect("/admin/condutor")
  }).catch((err)=>{
    req.flash("error_msg","Houve um erro ao deletar o Condutor"+ err)
    res.redirect("/admin/condutor")
  })
})

router.get('/veiculo', async (req, res) => {
  try {
    const veiculos = await Veiculo.find().sort({ date: 'desc' }).lean();

    // Crie um mapeamento de CPF para nome de condutor
    const cpfToNomeMap = {};
    const condutores = await Condutor.find().lean();
    condutores.forEach((condutor) => {
      cpfToNomeMap[condutor.cpf_condutor] = condutor.nome_condutor;
    });

    // Substitua os CPFs dos veículos pelos nomes dos condutores
    veiculos.forEach((veiculo) => {
      veiculo.nome_condutor = cpfToNomeMap[veiculo.cpf];
    });

    res.render("admin/veiculo", { veiculo: veiculos });
  } catch (err) {
    req.flash('error-msg', 'Houve um erro ao listar os veículos');
    res.redirect('/admin');
  }
});


router.get('/veiculo/add', async (req, res) => {
  try {
    const [condutor, cpfs] = await Promise.all([
      Condutor.find().sort({ nascimento_condutor: 1 }).lean(),
      Condutor.find().sort({ nascimento_condutor: 1 }).distinct('cpf_condutor').lean()
    ]);

    const cpfsWithNames = cpfs.map((cpf) => {
      const condutorData = condutor.find((c) => c.cpf_condutor === cpf);
      return `${cpf} (${condutorData ? condutorData.nome_condutor : 'Nome não encontrado'})`;
    });

    res.render("admin/addveiculo", { cpfsWithNames, condutor});
  } catch (err) {
    req.flash('error-msg', 'Houve um erro ao listar os condutores e CPFs');
    res.redirect('/admin');
  }
});


router.post('/veiculo/novo', (req,res) =>{

  let erros = []

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
  
  if(erros.length > 0){
      res.render("admin/addveiculo", { erros: erros })
  }else{
      const novoVeiculo = {
        placa: req.body.placa,
        condutor: req.body.condutor,
        cpf: req.body.cpf,
        medida: req.body.medida
      }
  
      new Veiculo(novoVeiculo).save().then(() =>{
          req.flash("success_msg", "Veiculo criado com sucesso!")
          res.redirect('/admin/veiculo') 
      }).catch((err) =>{
          req.flash("error_msg", "houve um erro ao salvar o veiculo, tente novamente!" + err)
          res.redirect('/admin')
      })
  }
})

router.get('/veiculo/edit/:id', async (req, res) => {
  try {
    // Busque o veículo pelo ID
    const veiculo = await Veiculo.findOne({ _id: req.params.id }).lean();

    // Busque todos os condutores
    const condutor = await Condutor.find().lean();

    res.render('admin/editveiculo', { veiculo: veiculo, condutor: condutor });
  } catch (erro) {
    req.flash('error_msg', 'Este Veiculo não existe');
    res.redirect('/admin/veiculo');
  }
});



router.post('/veiculo/edit', (req,res) => {

  let erros = []

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

  if(erros.length > 0){
      res.render("admin/addveiculo", { erros: erros })
  }else{
      Veiculo.findOne({_id: req.body.id}).then((veiculo) => {

        veiculo.placa = req.body.placa
        veiculo.condutor = req.body.condutor
        veiculo.cpf = req.body.cpf
        veiculo.medida = req.body.medida
          

        veiculo.save().then(() => {
              req.flash('success_msg', 'veiculo editado com sucesso!')
              res.redirect('/admin/veiculo')
          }).catch((err) => {
              req.flash('error_msg','houve um erro interno ao salvar a edicao de veiculo')
              res.redirect('/admin/veiculo')
          })
      
        }).catch((err) => {
          req.flash('error_msg', 'houve um erro ao editar o veiculo' + err)
          res.redirect('/admin/veiculo')
        })
  }
})

router.post("/veiculo/deletar",(req,res)=>{
  Veiculo.deleteOne({_id: req.body.id}).then(()=>{
    req.flash("success_msg","Veiculo deletado com sucesso!!!")
    res.redirect("/admin/veiculo")
  }).catch((err)=>{
    req.flash("error_msg","Houve um erro ao deletar o veiculo"+ err)
    res.redirect("/admin/veiculo")
  })
})

module.exports = router
