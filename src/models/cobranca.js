const mongoose = require('mongoose');


const cobrancaSchema = mongoose.Schema(
    {
        cobStatus: String,
        idCobrado: String
    },
    {
        timestamp: true
    }
)

const cobranca = mongoose.model(cobrancaSchema)
module.exports = cobranca