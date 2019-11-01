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

app.use(routes);
app.listen(3000);