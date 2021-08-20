const mongoose = require('mongoose');

const coinSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    value: {
        type: String,
        required: true
    },
    rateUSD: {
        type: String,
        required: true
    },
    notas: String,
},{
    timestamps: true
});

const Coin = mongoose.model('Coin', coinSchema);

module.exports = Coin;