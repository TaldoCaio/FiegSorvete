const mongoose = require('mongoose');

//modelo de geração de cobrança
const cobrancaSchema = mongoose.Schema(
    {
        cobStatus: String,
        idCobrado: String,
        dataSorvete: Date
    },
    {
        timestamps: true
    }
)

const Cobranca = mongoose.model('Cobranca',cobrancaSchema)
module.exports = Cobranca