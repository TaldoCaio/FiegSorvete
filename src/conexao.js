const mongoose = require('mongoose');
const express = require('express');
const app = express();
const URI = "mongodb+srv://Admin:DefaultPassword@serveradote.fbcdvgq.mongodb.net/sorveteDB?retryWrites=true&w=majority"
const User = require('./models/cadastroSchema');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))



mongoose.connect(URI).then(() => {
    console.log('Conectado ao mongoDB')
    app.listen(3100, () => {
        console.log('SFV1 rodando na porta 3100');
    })
}).catch(() => {
    console.log(error)
});


app.post('/cadastro', async (req, res) => {
    try {
        const user = await User.create(req.body)
        const newUser = user
        res.status(200).json(newUser);

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
});

app.get('/busca', async (req, res) => {
    try {
        const user = await User.find({})
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.get('/busca/datas', async (req, res) => {
    try {
        const user = await User.find({}, { aniversario: 1, _id: 1, nome: 1 })
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.get('/busca/mes/:aniversario', async (req, res) => {
    try {
        const { aniversario } = req.params;
        const month = parseInt(aniversario);

        const user = await User.aggregate([
            {
                $project: {
                    nome: 1,
                    _id: 1,
                    mesAniversario: { $month: '$aniversario' },
                    aniversario: 1
                }
            },
            {
                $match: {
                    $expr: { $eq: [month, '$mesAniversario'] }
                }
            }
        ]);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/busca/:id', async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findOne({id})
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})