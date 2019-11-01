const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const authConfig = require('../config/auth');

const Escola = require('../models/Escola');

const router = express.Router();

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}
module.exports = {

async register(req, res){
    const { matricula } = req.body;

    try {
        if (await Escola.findOne({ matricula }))
            return res.status(400).send({ error: 'Escola ja existe' });

        const escola = await Escola.create(req.body);

        escola.senha = undefined;

        return res.send({
            escola,
            token: generateToken({ id: escola.id }),
        });

    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'cadastro falhou' });
    }
},

   async authenticate(req, res){
    const { matricula, senha } = req.body;

    const escola = await Escola.findOne({ matricula }).select('+senha');

    if (!escola)
        return res.status(400).json({ error: 'Usuario nao encontrado' });

    if (!await bcrypt.compare(senha, escola.senha))
        return res.status(400).json({ error: 'Senha invalida' });

    escola.senha = undefined;

    res.json({
        escola,
        token: generateToken({ id: escola.id }),
    });
},

async forget_password(req, res){
    const { email } = req.body;

    try {

        const escola = await Escola.findOne({ email });

        if (!escola)
            return res.status(400).send({ error: 'Usuario nao encontrado' });

        const token = crypto.randomBytes(20).toString('hex');

        const now = new Date();
        now.setHours(now.getHours() + 1);

        await Escola.findByIdAndUpdate(escola.id, {
            '$set': {
                passwordResetToken: token,
                passwordResetExpires: now,
            }
        });

        mailer.sendMail({
            to: email,
            from: 'loran@gmail.com.br',
            template: 'auth/forgot_password',
            context: { token },
        }, (err) => {
            if (err)
                return res.status(400).send({ error: 'Cannot send forgot password email' });

            return res.send();
        })
    } catch (err) {
        res.status(400).send({ error: 'Erro ao esquecer a senha, tente novamente' });
    }
},

 async reset_password(req, res) {

    const { email, token, senha } = req.body;

    try {
        const escola = await Escola.findOne({ email })
            .select('+senhaResetToken senhaResetExpires');

        if (!escola)
            return res.status(400).send({ error: 'Usuario nao existe' });

        if (token !== escola.senhaResetToken)
            return res.status(400).send({ error: 'Token invalido' });

        const now = new Date();

        if (now > escola.senhaResetExpires)
            return res.status(400).send({ error: 'Token expirado, gere um novo' });

        escola.senha = senha;

        await escola.save();

        res.send();

    } catch (err) {
        res.status(400).send({ error: 'não pode redefinir a senha, tente novamente' });
    }
},

 async list(req, res){
    try {
        const { _id } = req.headers;
        const resp = await Escola.findById({ _id });
        return res.json(resp);
    } catch (err) {
        console.log(err);
    }
},

async listAll(req, res){
    try {
        const resp = await Escola.find({});
        return res.json(resp);
    } catch (err) {
        console.log(err);
    }
},

}