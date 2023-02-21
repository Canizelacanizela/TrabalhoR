const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const create = async (req, res) => {
    let operacaov = await prisma.operacaov.create({
        data: req.body
    });

    res.status(200).json(operacaov).end();
}

const readOne = async (req, res) => {
    let operacaov = await prisma.operacaov.findUnique({
        where: {
            id: Number(req.params.id)
        },
        select: {
            id_motorista: true,
            id_veiculo: true,
            data_saida: true,
            data_retorno: true,
            descricao_servico: true
        }
    });

    //SELECT * FROM operacaov INNER JOIN publicacao ON operacaov.id = publicacao.usuario_id WHERE ....

    res.status(200).json(operacaov).end();
}

const read = async (req, res) => {
    let operacaov = await prisma.operacaov.findMany({
        select: {
            id: true,
            id_motorista: true,
            id_veiculo: true,
            data_saida: true,
            data_retorno: true,
            descricao_servico: true
        }
    });

    //SELECT email, nome FROM operacaov WHERE email = ''

    res.status(200).json(operacaov).end();
}


const update = async (req, res) => {
    const operacaov = await prisma.operacaov.update({
        where: {
            id: Number(req.params.id)
        },
        data: req.body
    })
    res.status(202).json(operacaov).end();
}

const toRetorno = async (req, res) => {
    let info = {
        data_retorno: new Date()
    }
    const operacaov = await prisma.operacaov.update({
        data: info,
        where: {
            id: Number(req.params.id)
        }
    })
    res.status(202).end();
}


const del = async (req, res) => {
    const operacaov = await prisma.operacaov.delete({
        where: {
            id: Number(req.params.id)
        }
    })
    res.status(204).end();
}


module.exports = {
    create,
    read,
    readOne,
    del,
    update,
    toRetorno
}