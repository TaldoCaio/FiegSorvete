const mongoose = require('mongoose');
const express = require('express');
const app = express();
const URI = "mongodb+srv://Admin:DefaultPassword@serveradote.fbcdvgq.mongodb.net/sorveteDB?retryWrites=true&w=majority"
const cors = require('cors');
const Cobranca = require('./models/cobrancaSchema');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))



mongoose.connect(URI).then(() => {
    console.log('Conectado ao mongoDB')
    app.listen(3000, () => {
        console.log('SFV1 rodando na porta 3000');
    })
}).catch(() => {
    console.log(error)
});


app.post('/cobranca/gerar', async (req, res) => {
    try {
        const { dataSorvete, idCobrado } = req.body;

        const cobrancaExistente = await Cobranca.findOne({ dataSorvete, idCobrado });

        if (cobrancaExistente) {
            return res.status(400).json("Essa cobrança já existe");
        } else {
            const cobranca = await Cobranca.create(req.body);
            return res.status(200).json(cobranca);
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});


app.get('/cobranca/buscar/:idCobrado', async (req, res) => {
    try {
        const { idCobrado } = req.params
        const cobranca = await Cobranca.find({ idCobrado }, { _id: 0, idCobrado: 1, cobStatus: 1 })
        res.status(200).json(cobranca)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}),


    app.get('/cobranca/buscar', async (req, res) => {
        try {
            const cobranca = await Cobranca.find({})
            res.status(200).json(cobranca)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    })