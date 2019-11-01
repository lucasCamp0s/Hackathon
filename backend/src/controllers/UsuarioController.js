const Usuario = require('../models/Usuario');
const Disciplina = require('../models/Disciplina');

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
        const {disciplina_id} = req.headers;
         
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
            }).save();
            return res.json(novoUsuario);       
            
    },

    async cadastrarDisciplinas(req,res){        

        const {usuario_id} = req.headers;
        const {disciplina_id} = req.headers;

        if(!usuario_id || ! disciplina_id){
            return res.json({"erro":"Todos os campos são obrigatórios"});
        }
        await Disciplina.findOneAndUpdate(
        {_id:disciplina_id},{$push:{alunos : usuario_id}}
        )
        await Usuario.findByIdAndUpdate({_id:usuario_id},{$push:{disciplinas : disciplina_id}});
        return res.json(Usuario);
    }

    
};