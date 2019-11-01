

//declarando as classes que serão usadas
const UsuarioController = require('./controllers/UsuarioController');
const PostController = require('./controllers/PostController');
const UploadConfig = require('./config/upload');
const multer = require('multer');
//importando bibliotecas
const express = require('express');

//codigo para exportar rotas
const routes = express.Router();
const upload = multer(UploadConfig);
routes.post('/user/register',UsuarioController.Store);
routes.post('/post/register',upload.single('image'),PostController.Store);

routes.get('/user',UsuarioController.Index);
module.exports = routes;