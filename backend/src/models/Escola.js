const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const EscolaSchema = new mongoose.Schema({
    matricula: {
        type: Number,
        require: true,
    },
    nome: {
        type: String,
        require: true,
    },
    senha: {
        type: String,
        require: true,
        select: false,
    },
    endereco: {
        type: String,
        require: true,
    },
    bairro: {
        type: String,
        require: true,
    },
    municipio: {
        type: String,
        require: true,
    },
    estado: {
        type: String,
        require: true,
    },
    cep: {
        type: String,
        require: true,
    },
    senhaResetToken:{
        type: String,
        select: false,
    },
    senhaResetExpires: {
        type: Date,
        select: false,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
});

EscolaSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.senha, 10);
    this.senha = hash;
    
    next();
});

//Exportar o modelo para o mongoose saber que este modelo será usado
const Escola = mongoose.model('Escola', EscolaSchema);

module.exports = Escola;