const mongoose = require('mongoose')

// korvaa url oman tietokantasi urlilla. ethän laita salasanaa Githubiin!
const url = 'mongodb://:@ds143593.mlab.com:43593/fullstackopen'

mongoose.connect(url)

const Person = mongoose.model('Person', {
    name: String,
    number: String
})

module.exports = Person