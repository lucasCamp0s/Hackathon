const Turma = require('../models/Turma');
const Usuario = require('../models/Usuario');
const Serie = require('../models/Serie');

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

    async listDisciplinas(req, res){
        const turmas = await Turma.find({});
        return res.json(turmas);
    }
}