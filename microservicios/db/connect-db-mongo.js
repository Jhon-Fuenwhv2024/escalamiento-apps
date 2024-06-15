const mongoose = require('mongoose');

const getConnection = async () => {

    try {

        const url = process.env.MONGO_URI

        await mongoose.connect(url)
        console.log('Connected to MongoDB your db')

    } catch(error) {
        console.log('Error connecting to Mongo')

    }
}

module.exports = {
    getConnection
}