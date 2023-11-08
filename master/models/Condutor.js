const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const Condutor = new Schema({
    nome_condutor: {
        type: String,
        required: true
    },
    cpf_condutor: {
        type: Number, // Use Number para representar um CPF como um número grande
        required: true
    },
    carteira: {
        type: String,
        required: true
    },
    nacionalidade_condutor: {
        type: String,
        required: true
    },
    nascimento_condutor: {
        type: Date, 
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

mongoose.model("condutor", Condutor)