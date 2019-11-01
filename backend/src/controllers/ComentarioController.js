const Comentario = require('../models/Comentario');
const Post = require('../models/Post');
const Usuario = require('../models/Usuario');

module.exports = {
     /**
      * 
      * Criando um novo comentario
      */
    async Store(req,res){
        const {comentario} = req.body;
        const {post_id} = req.headers;
        const {autor_id} = req.headers;

        const newComentario = await new Comentario({
            comentario,
            autor:autor_id,
            post : post_id,
        }).save();

        //colocando o comentario na coleção da post referênciado
        await Post.findByIdAndUpdate({_id:post_id},{$push:{comentarios : newComentario.id}});
        //colocando o comentario na coleção do úsuario logado
        await Usuario.findByIdAndUpdate({_id:autor_id},{$push:{comentarios : newComentario.id}});
        
        return res.json(newComentario);
    },

    async deleteComenterio(req,res){
        const {_id} = req.headers;
        const comentario = await Comentario.findByIdAndRemove(_id);

        // Delete comentariorios da coleção usuario
        await Usuario.findByIdAndRemove(
          { _id: comentario.autor },
          { $pull: { comentarios: comentario.id } }
        );
         // Delete comentarios da coleção post
        await Post.findOneAndUpdate(
          { _id: comentario.post },
          { $pull: { comentarios: comentario.id } }
        );
    
        return  res.json(comentario);
      },

      async listComentarios(req,res){
        const coments = await Comentario.find({});
        return res.json(coments);
      }
    }
