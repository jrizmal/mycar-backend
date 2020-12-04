const mongoose = require('mongoose')

const fuelingSchema = new mongoose.Schema({
    amount: Number,
    kilometers: Number,
    price: Number,
    date: Date
})

const Fueling = mongoose.model('fueling', fuelingSchema, 'fuelings')
module.exports = Fueling