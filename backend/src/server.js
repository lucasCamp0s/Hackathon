const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();
mongoose.connect('mongodb+srv://hackasenai:hackasenai@cluster0-xsrgs.mongodb.net/test?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: true,  useCreateIndex: true, });

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname,'..','uploads')));
//mongoose.connect('mongodb://hackasenai:hackasenai@cluster0-shard-00-00-xsrgs.mongodb.net:27017,cluster0-shard-00-01-xsrgs.mongodb.net:27017,cluster0-shard-00-02-xsrgs.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority',{ useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: true,  useCreateIndex: true, });
app.use(routes);
app.listen(3000);