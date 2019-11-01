//responsável pela criação dos post no banco de dados
const mongoose = require('mongoose');

/**
 * Post possue referência com Usuario e Comentario
 */
const PostSchema = new mongoose.Schema({
   image : String,
   mensagem : String,
   image : String,
   autor : {
       type : mongoose.Schema.Types.ObjectId,
       ref : 'Usuario',
        },
    comentarios: [
    {
     type: mongoose.Schema.ObjectId,
     ref : 'Comentario',
    },
],

},{
    timestamps : true,
},{
    toJson:{
        virtuals : true,
    }
});
PostSchema.virtual('image_url').get(function(){
    return `http://localhost:3000/files/${this.image}`
})

module.exports = mongoose.model('Post',PostSchema);