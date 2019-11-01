const mongoose = require('mongoose');

const VacinaSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true,
    },
    dataVacinacao: {
        type: Date,
        require: true,
    },
    responsavel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
    },
    aluno: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
    },
});

module.exports = mongoose.model('Vacina', VacinaSchema);