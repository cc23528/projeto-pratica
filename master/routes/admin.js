const express = require('express')
const router = express.Router()
const path = require('path');
const mongoose = require('mongoose')
require('../models/Funcionario')
const Funcionario = mongoose.model('funcionario')

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

router.get('/funcionario/add', (req,res) => {
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

module.exports = router
