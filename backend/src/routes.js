

//declarando as classes que serão usadas
const UsuarioController = require('./controllers/UsuarioController');
const PostController = require('./controllers/PostController');
const UploadConfig = require('./config/upload');
const ComentarioController = require('./controllers/ComentarioController');
const SerieController = require('./controllers/SerieControler');
const DisciplinaController = require('./controllers/DisciplinaController');
const AgendaController = require('./controllers/AgendaController');
const multer = require('multer');
//importando bibliotecas
const express = require('express');

//codigo para exportar rotas
const routes = express.Router();
const upload = multer(UploadConfig);
routes.post('/user/register',UsuarioController.Store);
routes.post('/post/register',upload.single('image'),PostController.Store);
routes.post('/comentario/register',ComentarioController.Store);
routes.delete('/comentario/delete',ComentarioController.deleteComenterio);
routes.post('/serie/register', SerieController.cadastrarSerie);
routes.get('/user',UsuarioController.Store);
routes.get('/user/listAll',UsuarioController.listAll);
routes.get('/comentario/list',ComentarioController.listComentarios);
routes.get('/post/listAll',PostController.listAll);
routes.get('/serie/listAll',SerieController.listAll);
routes.post('/disciplina/cadastrarDisciplina', DisciplinaController.Store);
routes.get('/disciplina/listAll',DisciplinaController.listDisciplinas);
routes.post('/serie/cadastrarDisciplina',SerieController.cadastrarDisciplina);
routes.post('/cadastrarAgenda',upload.single('image'),AgendaController.Strore);

module.exports = routes;