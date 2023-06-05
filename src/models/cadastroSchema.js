const mongoose = require('mongoose');


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