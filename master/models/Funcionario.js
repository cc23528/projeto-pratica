const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const Funcionario = new Schema({
    nome: {
        type: String,
        required: true
    },
    cpf: {
        type: Number, // Use Number para representar um CPF como um número grande
        required: true
    },
    cargo: {
        type: String,
        required: true
    },
    datanascimento: {
        type: Date,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

mongoose.model("funcionario", Funcionario)