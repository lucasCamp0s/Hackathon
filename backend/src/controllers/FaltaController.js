const Falta = require('../models/Falta');
const Disciplina = require('../models/Disciplina');
const Usuario = require('../models/Usuario');
const Serie = require('../models/Serie');

module.exports = {
    async Store(req, res){
        const { dia } = req.body;
        const { professor_id } = req.headers;
        const { aluno_id } = req.body;
        const { disciplina_id } = req.body;
        const { serie_id } = req.body;

        const newFalta = await new Falta({
            dia,
            disciplina: disciplina_id,
            professor: professor_id,
            aluno: aluno_id,
            serie: serie_id,
        }).save();

        await Usuario.findByIdAndUpdate({_id: aluno_id}, {$push:{ faltas: newFalta.id}});
        return res.json(newFalta);
    },

    async deleteFalta(req, res){
        const {_id} = req.headers;
        const falta = await Falta.findByIdAndRemove(_id);

        await Usuario.findByIdAndRemove(
            {_id: falta.aluno},
            {$pull: { faltas: falta.id }}
        );
    },

    async listFaltas(req, res){
        const faltas = await Falta.find({});
        return res.json(faltas);
    }
}
