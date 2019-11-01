//responsável pela criação dos usuarios no banco de dados
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * O Schema de Usuario tem referencias com posts e comentarios 
 */
const UsuarioSchema = new mongoose.Schema({
    matricula :{ 
        type : Number,
        require : true,
    },
    tipo:{
        type : String,
        required: true,
    },
    ativo: {
        type:Boolean,
        required:true
    },
    nomeCompleto: {
        type: String,
        required: true,
    }, 
    dataNascimento : {
        type : String,
        required : true,
    },
    telefone : {
        type : String,
        required: true,
    } ,    
    email : {
        type: String,
        required : true,
        lowercase : true,
        trim:true,
        unique: true
    },
    password : { 
        type: String,
        required:true,
    },
    passwordResetToken:String,
    image : String,
    coverImagePublicId : String,
    descricao : String,
    posts : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Post',
        },
    ],
    comentarios : [
        {
          type : mongoose.Schema.Types.ObjectId,
         ref : 'Comentario',
        },
    ],
    disciplinas : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Disciplina',
    }],
    faltas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Falta',
    }],
    vacinas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vacina',
    }],
    saudes : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Saude'
    }
},
//colocar as notas
//colocar as faltas
{
    timestamps:true,
});


/**
 * Colocando hash na senha do usuario quando for cadastrar
 */

 UsuarioSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password,10);
    this.password = hash;
    next();
});
    
module.exports = mongoose.model('Usuario',UsuarioSchema);