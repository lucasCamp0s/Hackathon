const Nota = require('../models/Nota');
const Usuario = require('../models/Usuario');

module.exports = {
    async Store(req, res){
        const { nota } = req.body;
        const { professor_id } = req.headers;
        const { disciplina_id } = req.body;
        const { aluno_id } = req.body;

        const newNota = await new Nota({
            nota,
            disciplina: disciplina_id,
            aluno: aluno_id,
            professor: professor_id,
        }).save();

        await Usuario.findOneAndUpdate({_id: aluno_id},{$push:{notas : newNota.id}});
        return res.json(newNota);
    },

    async deleteNota(req, res){
        const {_id} = req.headers;
        const nota = await Nota.findByIdAndRemove(_id);

        await Usuario.findByIdAndRemove(
            {_id: nota.aluno},
            {$pull: { notas: nota.id}}
        );

        return res.json(nota);
    },

    async listNotas(req, res){
        const notas = await Nota.find({});
        return res.json(notas);
    }
}