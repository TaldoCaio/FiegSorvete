const mongoose = require('mongoose');
const express = require('express');
const app = express();
const URI = "mongodb+srv://Admin:DefaultPassword@serveradote.fbcdvgq.mongodb.net/sorveteDB?retryWrites=true&w=majority"
const cors = require('cors');
const Router = require('./src/routes/routes')

app.use(cors());
app.use(Router)
app.use(express.json());
app.use(express.urlencoded({ extended: false }))


mongoose.connect(URI).then(() => {
    console.log('Conectado ao mongoDB')
}).catch(() => {
    console.log(error)
});

app.listen(3000, () => {
    console.log('SFV1 rodando na porta 3000');
})