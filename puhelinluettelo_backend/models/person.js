const mongoose = require('mongoose')
require('dotenv').config();
// korvaa url oman tietokantasi urlilla. ethän laita salasanaa Githubiin!
const url = `mongodb://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@ds143593.mlab.com:43593/fullstackopen`

mongoose.connect(url)

const Person = mongoose.model('Person', {
    name: String,
    number: String
})

module.exports = Person