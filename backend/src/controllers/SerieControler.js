const Serie = require('../models/Serie');

const Disciplina = require('../models/Disciplina');

/**
 * classe recebe referencias de disciplinas para fazer o cadastro
 */
module.exports = {
    async cadastrarSerie(req,res){
        const {nome,ano,semestre} = req.body;
        const {escola_id} = req.headers;

        const serie = await Serie.findOne({nome});
        if(serie){
            return res.json({"msg" : "Série já existe"});
            
        }

        if(!nome || !ano|| !semestre|| !escola_id ){
            return res.json({"msg":"Todos os campos são requeridos"});
        }
        const novaSerie = await new Serie({
            nome,
            ano,
            semestre,
            escola : escola_id,
        }).save();
        
        return res.json(novaSerie);
    },

    async listAll(req,res){
        const escolas = await Serie.find({});
        return res.json(escolas);
    },

    /**
     * cadastrando uma disciplina no vetor de disciplina      
     */
    async cadastrarDisciplina(req,res){
        const {serie_id, disciplina_id} = req.headers;  
        if(!serie_id || !disciplina_id){
            return res.json({"msg":"Todos os campos são requeridos"});
        }
        const disciplina = await Disciplina.findOne({_id:disciplina_id});
        const serie = await Serie.findOne({_id:serie_id});
        
        if(!disciplina){
            return res.json({"msg":"Disciplina não encontrada"});
        }
        if(!serie){
            return res.json({"msg":"Série não encontrada"});
        }

        await Serie.findByIdAndUpdate({_id:serie_id},{$push:{disciplinas:disciplina_id}});
        await Disciplina.findByIdAndUpdate({_id:disciplina_id},{$push:{series:serie_id}});
        
        return res.json(disciplina);
    }


    
}