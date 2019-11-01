const Saude = require('../models/Saude');
const Post = require('../models/Post');
const Usuario = require('../models/Usuario');

module.exports = {
     /**
      * 
      * Criando um novo comentario
      */
    async Store(req,res){
        const {altura} = req.body;
        const {peso} = req.body;
        const {medidaCintura} = req.body;
        const {medidaQuadril} = req.body;
        const {imc} = req.body;
        const {professor_id} = req.headers;
        const {aluno_id} = req.body;

        const newSaude = await new Saude({
            altura,
            peso,
            medidaCintura,
            medidaQuadril,
            imc,
            professor: professor_id,
            aluno: aluno_id,
        }).save();

        //colocando o comentario na coleção do úsuario logado
        await Usuario.findByIdAndUpdate({_id:aluno_id},{$push:{saudes : newSaude.id}});
        
        return res.json(newSaude);
    },

    async deleteSaude(req,res){
        const {_id} = req.headers;
        const saude = await Saude.findByIdAndRemove(_id);

        // Delete comentariorios da coleção usuario
        await Usuario.findByIdAndRemove(
          { _id: saude.aluno },
          { $pull: { saudes: saude.id } }
        );
    
        return  res.json(saude);
      },

      async listSaude(req,res){
        const saude = await Saude.find({});
        return res.json(saude);
      }
    }
