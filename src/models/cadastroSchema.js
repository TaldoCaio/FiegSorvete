const mongoose = require('mongoose');

//modelo de cadastro de novo usuário
const userSchema = mongoose.Schema(
    {
        nome: String,   
        aniversario: Date,
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('User',userSchema);
module.exports = User;