const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Veiculo = new Schema({
    placa: {
        type: String,
        required: true
    },
    cpf: {
        type: String, // Use String para representar o CPF como uma string
        required: true
    },
    condutor: {
        type: String,
        required: true
    },
    medida: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});


mongoose.model('veiculo', Veiculo);
