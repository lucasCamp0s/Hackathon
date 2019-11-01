const mongoose = require('mongoose');

const DisciplinaSchema = new mongoose.Schema({
    nome: {
        type: String,
        required:true,
    },
    professor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
    },
    alunos : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
    }],
    series: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Serie',
    }]
});

module.exports = mongoose.model('Disciplina', DisciplinaSchema);