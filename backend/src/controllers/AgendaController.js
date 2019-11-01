const Agenda = require('../models/Agenda');

module.exports = {
    
    async Strore(req,res)
    {
        const {titulo,descricao,data} = req.body;
        const{aluno_id,professor_id} = req.headers;
        const {filename} = req.file;

        if(!titulo || !descricao|| !data|| !aluno_id|| !professor_id){
            return res.json({"Erro":"Todos os campos são requeridos"});
        }

        const newAgenda = await new Agenda({
            titulo,
            descricao,
            data,
            image:filename,
            aluno:aluno_id,
            professor : professor_id,
        }).save();

        return res.json(newAgenda);
    },
    async buscar(req,res){
        const {_id} = req.headers;
        const agendas = await Agenda.find({_id});
        return res.json(agendas);
    },
    async listAll(req,res){
        const agendas = await Agenda.find({});
        return res.json(agendas);
    },
}