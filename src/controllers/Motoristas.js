const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const create = async (req, res) => {
    let motorista = await prisma.motorista.create({
        data: req.body
    });

    res.status(200).json(motorista).end();
}

const readOne = async (req, res) => {
    let motorista = await prisma.motorista.findUnique({
        where: {
            id: Number(req.params.id)
        },
        select: {
            id_user: true,
            nome: true,
            cnh: true,
            cpf: true
        }
    });

    //SELECT * FROM motorista INNER JOIN publicacao ON motorista.id = publicacao.usuario_id WHERE ....

    res.status(200).json(motorista).end();
}

const read = async (req, res) => {
    let motorista = await prisma.motorista.findMany({
        select: {
            id_user: true,
            nome: true,
            cnh: true,
            cpf: true
        }
    });

    //SELECT email, nome FROM motorista WHERE email = ''

    res.status(200).json(motorista).end();
}



const update = async (req, res) => {
    const motorista = await prisma.motorista.update({
        where: {
            id: Number(req.params.id)
        },
        data: req.body
    })
    res.status(202).json(motorista).end();
}

const del = async (req, res) => {
    const motorista = await prisma.motorista.delete({
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
    update
}