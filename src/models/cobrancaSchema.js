const mongoose = require('mongoose');


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