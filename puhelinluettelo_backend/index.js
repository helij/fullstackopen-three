const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const Person = require('./models/person')

const formatPerson = (person) => {
    return {
        name: person.name,
        number: person.number,
        id: person._id
    }
}

app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())
morgan.token('request', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :request :status :res[content-length] - :response-time ms'))

app.get('/api/persons', (req, res) => {
    Person
        .find({})
        .then(p => {
            res.json(p.map(formatPerson))
        })
})

app.get('/info', (req, res) => {
    Person
    .find({})
    .then(p => {
        res.send(`<p>puhelinluettelossa on ${p.length} henkilön tiedot<br></br>${new Date()}</p>`)
    })
    
})

app.delete('/api/persons/:id', (request, response) => {
    Person
        .findByIdAndRemove(request.params.id) .then(person => {
            response.status(204).end()
        })
    
})


app.get('/api/persons/:id', (request, response) => {
    Person
        .findById(request.params.id)
        .then(person => {
            response.json(formatPerson(person))
        })
    /*if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }*/
})

app.post('/api/persons/', (request, response) => {
    const body = request.body

    if (body.name === undefined) {
        return response.status(400).json({ error: 'name missing' })
    }
    if (body.number === undefined) {
        return response.status(400).json({ error: 'number missing' })
    }
    Person
        .find({})
        .then(p => {
            if (p.filter(p => p.name === body.name).length > 0) {
                return response.status(400).json({ error: 'name must be unique' })
            }
        })

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person
        .save()
        .then(savedPerson => {
            response.json(formatPerson(savedPerson))
        })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})