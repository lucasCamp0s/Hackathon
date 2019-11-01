const mongoose = require('mongoose');

 const AgendaSchema = new mongoose.Schema(
     {
        titulo: {
            type:String,
            required:true,
        },
        descricao :{
            type:String,
            required : true
        },
        image : String,
        data :{
             type:String,
             required : true,
        },
        aluno : {
            type : mongoose.Schema.Types.ObjectId,
        },
        professor :{
            type : mongoose.Schema.Types.ObjectId,            
        },

     },{
    timestamps : true,
}, {toJson : {
    virtuals : true,
}   }  );
AgendaSchema.virtual('image_url').get(function(){
    return `http://localhost:3000/files/${this.image}`
})

     module.exports = mongoose.model('Agenda',AgendaSchema);