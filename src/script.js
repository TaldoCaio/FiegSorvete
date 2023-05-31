const mongoose = require('mongoose');
const express = require('express');
const app = express();
const URI = "mongodb+srv://Admin:DefaultPassword@serveradote.fbcdvgq.mongodb.net/sorveteDB?retryWrites=true&w=majority"
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


app.post('/cobranca/gerar', (req,res)=>{
    try {
        
    } catch (error) {
        
    }
})