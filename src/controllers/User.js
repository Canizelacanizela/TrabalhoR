const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const create = async (req, res) => {
    let user = await prisma.user.create({
        data: req.body
    });

    res.status(200).json(user).end();
}

const readOne = async (req, res) => {
    let user = await prisma.user.findUnique({
        where: {
            id: Number(req.params.id)
        },
        select: {
            nome: true,
            email: true,
            tipo: true
        }
    });

    //SELECT * FROM user INNER JOIN publicacao ON user.id = publicacao.usuario_id WHERE ....

    res.status(200).json(user).end();
}

const read = async (req, res) => {
    let user = await prisma.user.findMany({
        select: {
            email: true,
            nome: true,
            tipo: true
        }
    });

    //SELECT email, nome FROM user WHERE email = ''

    res.status(200).json(user).end();
}

const login = async (req, res) => {
    let user = await prisma.user.findMany({
        where: {
            AND: [
                {email : req.body.email},
                {senha : req.body.senha}
            ]
        },
        select: {
            id: true,
            nome: true
        }
    })

    //SELECT id, nome FROM user WHERE email = '' AND senha = ''
    
    res.status(200).json(user[0]).end();
}

const update = async (req, res) => {
    const user = await prisma.user.update({
        where: {
            id: Number(req.params.id)
        },
        data: req.body
    })
    res.status(202).json(user).end();
}

const del = async (req, res) => {
    const user = await prisma.user.delete({
        where: {
            id: Number(req.params.id)
        }
    })
    res.status(204).end();
}


module.exports = {
    create,
    read,
    login,
    readOne,
    del,
    update
}