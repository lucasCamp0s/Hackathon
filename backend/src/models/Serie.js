const mongoose = require('mongoose');
/**
 * Serie possue referencia com classe usuario que será representada pela escola
 * 
 */
const SerieSchema = new mongoose.Schema({
    nome:{
        type:String,
        required : true,
    },
    ano:{
        type: Number,
        required:true,
    },
    semestre : {
        type : String,
        required : true
    },
    escola : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Usuario',
    },
    disciplinas : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Disciplina',
    }],
});

module.exports = mongoose.model('Serie',SerieSchema);