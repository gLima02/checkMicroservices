const express = require('express');
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/mydatabase')


// Habilita o CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

//registrar a model
require('./models/produto')


//criar rotas
const index = require('./routes/index')
app.use('/', index)

//criar rota para produto
const produtoRouter = require('./routes/produto-route')
app.use('/produtos', produtoRouter)

app.use((req, res) => {
    produtoController.notFound(req, res);
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(404).send({ mensagem: "erro 404 - item não encontrado." });
});

module.exports = app;