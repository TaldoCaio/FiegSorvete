const express = require('express');;
const app = express();
const URI = "mongodb+srv://Admin:DefaultPassword@serveradote.fbcdvgq.mongodb.net/sorveteDB?retryWrites=true&w=majority"
const cors = require('cors');
const Routes = require('./src/routes/routes')

app.use(cors())
app.use(Routes)
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.listen(3000, () => {
    console.log('API rodando na porta 3000');
})


