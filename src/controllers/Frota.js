const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const create = async (req, res) => {
    let frota = await prisma.frota.create({
        data: req.body
    });

    res.status(200).json(frota).end();
}

const readOne = async (req, res) => {
    let frota = await prisma.frota.findUnique({
        where: {
            id: Number(req.params.id)
        },
        select: {
            placa: true,
            modelo: true,
            marca: true
        }
    });

    //SELECT * FROM frota INNER JOIN publicacao ON frota.id = publicacao.usuario_id WHERE ....

    res.status(200).json(frota).end();
}

const read = async (req, res) => {
    let frota = await prisma.frota.findMany({
        select: {
            id: true,
            placa: true,
            modelo: true,
            marca: true
        }
    });

    //SELECT email, nome FROM frota WHERE email = ''

    res.status(200).json(frota).end();
}

const update = async (req, res) => {
    const frota = await prisma.frota.update({
        where: {
            id: Number(req.params.id)
        },
        data: req.body
    })
    res.status(202).json(frota).end();
}

const del = async (req, res) => {
    const frota = await prisma.frota.delete({
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