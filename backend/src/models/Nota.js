const mongoose = require('mongoose');

const TurmaSchema = new mongoose.Schema({
    nota: {
        type: SchemaTypes.Double,
        require: true,
    },
    disciplina: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Disciplina',
        require: true,
    },
    professor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true,
    },
    aluno: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
    }
});

module.exports = mongoose.model('Turma', TurmaSchema);