const mongoose = require('mongoose')

async function connect() {

    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/e-commerce-db');
        console.log('Connect DB Successfully!')
    } catch (error) {
        console.log('Connect DB Failure!')
    }
}

module.exports = { connect }