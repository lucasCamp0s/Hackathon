const Turma = require('../models/Turma');
const Usuario = require('../models/Usuario');
const Serie = require('../models/Serie');
const Disciplina = require('../models/Disciplina');

module.exports = {
    async Store(req, res){
        const { nome } = req.body;
        const { escola_id } = req.headers;
        const { serie_id } = req.body;
        const { aluno_id } = req.body;

        const newTurma = await new Turma({
            nome,
            escola: escola_id,
            alunos: aluno_id,
            series: serie_id
        }).save();

        await Usuario.findOneAndUpdate({_id: aluno_id},{$push:{turmas : newTurma.id}});
        return res.json(newTurma);
    },

    async deleteDisciplina(req, res){
        const {_id} = req.headers;
        const turma = await Turma.findByIdAndRemove(_id);

        await Usuario.findByIdAndRemove(
            {_id: turma.alunos},
            {$pull: { turmas: turma.id}}
        );

        await Serie.findByIdAndRemove(
            {_id: turma.series},
            {$pull: { turmas: turma.id}}
        );

        return res.json(turma);
    },
  
  
    async listTurmas(req, res){
        const turmas = await Turma.find({});
        return res.json(turmas);
    },
    
    async cadastrarSerie(req,res){
        
        const {serie_id,turma_id} = req.headers;

        const serie = await Serie.findOne({_id:serie_id});
        const turma = await Turma.find({_id : turma_id});

        if(!serie){
            return res.json({"erro":"Serie não encontrada"});
        }
        if(!turma){
            return res.json({"erro":"Turma não encontrada"});
        }
       await Turma.findOneAndUpdate({_id : turma_id},{$push:{serie:serie_id}});
       
        turma = await Turma.findOne({_id : turma_id});
       return res.json(turma);
        }

}