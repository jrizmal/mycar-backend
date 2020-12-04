const mongoose = require('mongoose');

const connectionString = process.env.CONNECTION_STRING || ''
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Mongoose connected');
});

module.exports = db