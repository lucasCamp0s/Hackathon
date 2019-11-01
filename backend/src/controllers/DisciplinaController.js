const Disciplina = require('../models/Disciplina');
const Usuario = require('../models/Usuario');
const Serie = require('../models/Serie');

module.exports = {
    async Store(req, res){
        const { nome } = req.body;
        const { professor_id } = req.headers;

        const newDisciplina = await new Disciplina({
            nome,
            professor: professor_id,
        }).save();

        await Usuario.findOneAndUpdate({_id:professor_id},{$push:{disciplinas : newDisciplina.id}});
        return res.json(newDisciplina);
    },

    async deleteDisciplina(req, res){
        const {_id} = req.headers;
        const disciplina = await Disciplina.findByIdAndRemove(_id);

        await Usuario.findByIdAndRemove(
            {_id: disciplina.professor},
            {$pull: { disciplinas: disciplina.id}}
        );

        await Serie.findByIdAndRemove(
            {_id: disciplina.series},
            {$pull: { disciplinas: disciplina.id}}
        );

        return res.json(disciplina);
    },

    async listDisciplinas(req, res){
        const disciplinas = await Disciplina.find({});
        return res.json(disciplinas);
    }
}