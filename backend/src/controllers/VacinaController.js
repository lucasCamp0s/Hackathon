const Vacina = require('../models/Vacina');
const Usuario = require('../models/Usuario');

module.exports = {
    async Store(req, res){
        const { nome } = req.body;
        const { dataVacinacao } = req.body;
        const { responsavel_id } = req.headers;
        const { aluno_id } = req.body;

        const newVacina = await new Vacina({
            nome,
            dataVacinacao,
            responsavel: responsavel_id,
            aluno: aluno_id,
        }).save();

        await Usuario.findByIdAndUpdate({_id:aluno_id}, {$push: {vacinas: newVacina.id}});

        return res.json(newVacina);
    },

    async deleteVacina(req, res){
        const {_id} = req.headers;
        const vacina = await Vacina.findByIdAndRemove(_id);

        await Usuario.findByIdAndRemove(
            { _id: vacina.aluno },
            { $pull: { vacinas: vacina.id } }
          );

          return res.json(vacina);
    },

    async listVacinas(req,res){
        const vacinas = await Vacina.find({});
        return res.json(vacinas);
    }
}