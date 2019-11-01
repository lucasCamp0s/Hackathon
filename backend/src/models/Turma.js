const mongoose = require('mongoose');

const TurmaSchema = new mongoose.Schema({
    nome: {
        type: String,
        required:true,
    },
    escola: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
    },
    alunos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
    }],
    series: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Serie',
    }]
});

module.exports = mongoose.model('Turma', TurmaSchema);