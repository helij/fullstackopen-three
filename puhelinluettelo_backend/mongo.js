const mongoose = require('mongoose')

// korvaa url oman tietokantasi urlilla. ethän laita salasanaa Githubiin!
const url = 'mongodb://:@ds143593.mlab.com:43593/fullstackopen'

mongoose.connect(url)

var args = process.argv.slice(2);

const Person = mongoose.model('Person', {
    name: String,
    number: String
})

if (args.length > 0) {

    const person = new Person({
        name: args[0],
        number: args[1]
    })


    person
        .save()
        .then(response => {
            console.log(`lisätään henkilö ${args[0]} numero ${args[1]} luetteloon`)
            mongoose.connection.close()
        })
}
else {
    console.log('puhelinluettelo')
    Person
        .find({})
        .then(result => {
            result.forEach(person => {
                console.log(person)
            })
            mongoose.connection.close()
        })

}