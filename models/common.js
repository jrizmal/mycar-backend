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

const insuranceSchema = new mongoose.Schema({
    date: Date,
    price: Number,
    expiration: Date,
    agency : String,
    user: String,
    insurance_type: Number,
})
const Insurance = mongoose.model('insurance', insuranceSchema, 'insurances')

const technicalSchema = new mongoose.Schema({
    vendor: String,
    date: Date,
    price: Number,
    expiration: Date,
    user: String,
})
const Technical = mongoose.model('technical', technicalSchema, 'technicals')
const registrationSchema = new mongoose.Schema({
    date: Date,
    price: Number,
    expiration: Date,
    user: String,
})
const Registration = mongoose.model('registration', registrationSchema, 'registrations')



module.exports = {
    Fueling,
    Tires,
    Service,
    FirstAid,
    Insurance,
    Technical,
    Registration,
}