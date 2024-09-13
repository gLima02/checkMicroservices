const repository = require('../repositories/produto-repository');

exports.get = async (req, res, next) => {
        const data = await repository.get();
        return res.status(200).send(data);
};

exports.post = async (req, res) => {
        await repository.create(req.body);
        res.status(201).send({ mensagem: "Criado com sucesso!" });
};
exports.put = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).send({ mensagem: "ID do produto é necessário." });
        }

        const updated = await repository.update(id, req.body);
        if (!updated) {
            res.status(200).send({mensagem: "sucesso"}); 
        } else {
            return res.status(404).send({ mensagem: "Produto não encontrado para atualização." });
        }

        
    } catch (error) {
        res.status(500).send({ mensagem: "Erro ao atualizar o produto." });
    }
};

exports.notFound = (req, res) => {
    res.status(404).send({ mensagem: "Recurso não encontrado." });
};


