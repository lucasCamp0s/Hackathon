const mongoose = require('mongoose');

const SaudeSchema = new mongoose.Schema({
    altura: {
        type: SchemaTypes.Double
    },
    peso: {
        type: SchemaTypes.Double
    },
    medidaCintura: {
        type: SchemaTypes.Double
    },
    medidaQuadril: {
        type: SchemaTypes.Double
    },
    imc: {
        type: SchemaTypes.Double
    },
    professor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
    },
    aluno: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
    },
});

module.exports = mongoose.model('Saude', SaudeSchema);