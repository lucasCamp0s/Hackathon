const mongosse = require('mongoose');

const FaltaSchema = new mongosse.Schema({
    dia: {
        type: Date,
        require: true,
    },
    disciplina: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Disciplina',
    },
    professor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
    },
    aluno:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
    },
    serie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Serie',
    }
});

module.exports = mongoose.model('Falta', FaltaSchema);
