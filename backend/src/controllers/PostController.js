const Post = require('../models/Post');
const Usuario = require('../models/Usuario');


/**
 * 
 */
module.exports = {
     
    /**
     * 
     * @param {string} image 
     * @param {string} autorId 
     * @param {String} mensagem;
     */
       async Store(req,res){
        const {mensagem} = req.body;
        const {autorid} = req.headers;
        const {filename} = req.file;
        console.log(req.headers);
        console.log();

    //colocar parte do codigo da semana omnistack
       const newPost = await new Post({
            mensagem,
            image : filename,          
            autor : autorid,
        }).save();
        
        console.log(autorid);
        await Usuario.findByIdAndUpdate(
            {_id: autorid},
            {$push:{posts:newPost.id}}
            );
            
            return res.json(newPost);      
    },
    async listAll(req,res){
        const posts = await Post.find({});
        return res.json(posts);
    },
}