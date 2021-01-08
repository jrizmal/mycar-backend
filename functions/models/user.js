const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    fbid: String,
    notifications: Boolean,
    fcm_id: String
})
const User = mongoose.model('user', userSchema, 'users')

module.exports = {
    User
}