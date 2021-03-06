const Usuario = require('../models/Usuario');
const Disciplina = require('../models/Disciplina');
const Serie = require('../models/Serie');
const Turma = require('../models/Turma');


const bcrypt = require('bcryptjs');


/**
 * paramentros para cadastro de um novo usuario
 * @param {Numeral} matricula
 * @param {String} tipo
 * @param {Bollean} ativo
 * @param {String} nomeCompleto
 * @param {String} email
 * @param {String} password
 * @param {String} descricao
 * @param {String} telefone
 * @param {String} dataNascimento 
 */
module.exports = {
    async Authenticate(req, res){
        const { matricula, password } = req.body;

        const user = await Usuario.findOne({ matricula }).select('+password');
    
        if(!user)
            return res.status(400).send({ error: 'Usuario nao encontrado' });
        
        if(!await bcrypt.compare(password, user.password))
            return res.status(400).send({ error: 'Senha invalida'});
        
        user.password = undefined;
    
        res.json(user, user.tipo);
    },

    async buscarUsuario(req,res){
        const {_id} = req.headers;
        const user = await Usuario.findOne({_id});

        return res.json(user);
    },
    async listAll(req,res){
        const {_id} = req.headers;
        const user = await Usuario.find({});

        return res.json(user);
    },
    
    async Store(req,res){
        
        const {matricula,
            tipo,
            ativo,
            nomeCompleto,
            email,
            password,
            descricao,
            telefone,
            dataNascimento} = req.body;
        const {serie_id} = req.headers;
         
            const user = await Usuario.findOne().or([{matricula,email}]);

            if(user){
                const field = user.email == email ? 'email' : 'matricula';
                throw new Error(`Úsuario com essa(e) : ${field} já existe`);
                }
              
            //validação de campos vazios
          /*  if(!nomeCompleto || !matricula || !tipo || !ativo || !email || !password || !descricao || !telefone || !dataNascimento){
                console.log(req.body);
                throw new Error('Todos os campos são requeridos.');
            }*/
            //validação de nome
            if(nomeCompleto.length > 60){
                throw new Error('O tamanho maxímo do nome é de 60 caracteres')
            }
            if(nomeCompleto.length < 4){
                throw new Error('O tamanho mínimo do nome é de 4 caracteres')
            }
        
            //Validação email
            const emailExpressaoRegular = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!emailExpressaoRegular.test(String(email).toLowerCase())) {
              throw new Error('Entre com um E-mail válido');
            }

            //validação senha
            if(password.length < 6){
                throw new Error('Digite uma senha com no mínimo 6 caracteres');
            }

    
           const novoUsuario = await new Usuario({
                matricula,
                tipo,
                ativo,
                nomeCompleto,
                email,
                password,
                descricao,
                telefone,
                dataNascimento,
                serie : serie_id,
            }).save();
            return res.json(novoUsuario);       
            
    },
    async cadastrarDisciplinasTurma(req,res){        

        const {usuario_id} = req.headers;
        const {turma_id} = req.headers;

        if(!usuario_id || ! turma_id){
            return res.json({"erro":"Todos os campos são obrigatórios"});
        }
        await Turma.findOneAndUpdate(
        {_id:turma_id},{$push:{alunos : usuario_id}}
        )
        await Usuario.findByIdAndUpdate({_id:usuario_id},{$push:{turmas : turma_id}});
        return res.json(Usuario);
    },  

    async buscarEscolaAluno(req,res){
        const {aluno_id} = req.headers;
        console.log(aluno_id);
        const usuario = await Usuario.findOne({_id:aluno_id});
        const serie = await Serie.findOne({_id:usuario.serie});
        console.log(serie);
        const escola = await Usuario.findOne({_id:serie.escola});
        console.log(escola);
    },


    
};