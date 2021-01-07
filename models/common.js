const mongoose = require('mongoose')

const fuelingSchema = new mongoose.Schema({
    amount: Number,
    kilometers: Number,
    price: Number,
    date: Date,
    user: String,
})
const Fueling = mongoose.model('fueling', fuelingSchema, 'fuelings')

const tiresSchema = new mongoose.Schema({
    kilometers: Number,
    price: Number,
    date: Date,
    manufacturer: String,
    user: String,
    winter: Boolean,
    model: String,
})
const Tires = mongoose.model('tires', tiresSchema, 'tires')

const serviceSchema = new mongoose.Schema({
    items: [String],
    price: Number,
    date: Date,
    vendor: String,
    user: String,
})
const Service = mongoose.model('service', serviceSchema, 'services')

const firstAidSchema = new mongoose.Schema({
    date: Date,
    price: Number,
    expiration: Date,
    user: String,
})

const FirstAid = mongoose.model('firstaid', firstAidSchema, 'firstaids')
module.exports = {
    Fueling,
    Tires,
    Service,
    FirstAid,
}