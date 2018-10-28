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

app.get('/info', (req, res) => {
    Person
        .find({})
        .then(p => {
            res.send(`<p>puhelinluettelossa on ${p.length} henkilön tiedot<br></br>${new Date()}</p>`)
        })

})

app.get('/api/persons', (req, res) => {
    Person
        .find({})
        .then(p => {
            res.json(p.map(formatPerson))
        }).catch(error => {
            console.log(error)
            response.status(404).end()
        })
})

app.get('/api/persons/:id', (request, response) => {
    Person
        .findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(formatPerson(person))
            } else {
                response.status(404).end()
            }
        }).catch(error => {
            console.log(error)
            response.status(400).send({ error: 'malformatted id' })
        })
})

app.put('/api/persons/:id', (request, response) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person
        .findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedNote => {
            response.json(formatPerson(updatedNote))
        })
        .catch(error => {
            console.log(error)
            response.status(400).send({ error: 'malformatted id' })
        })
})

app.post('/api/persons/', (request, response) => {
    const body = request.body

    if (body.name === undefined) {
        response.status(400).send({ error: 'name missing' })
    }
    if (body.number === undefined) {
        response.status(400).send({ error: 'number missing' })
    }

    Person
        .find({ name: body.name })
        .then(result => {
            if (result.length > 0) {
                return null
            }
            else {
                const person = new Person({
                    name: body.name,
                    number: body.number
                })
                return person
            }
        }).then(result => {
            if (result) {
                result.save()
                    .then(savedPerson => {
                        return formatPerson(savedPerson)
                    })
                    .then(savedAndFormattedPerson => {
                        response.json(savedAndFormattedPerson)
                    })
            } else {
                response.status(400).send({ error: 'name must be unique' })
            }
        })

})

app.delete('/api/persons/:id', (request, response) => {
    Person
        .findByIdAndRemove(request.params.id).then(person => {
            response.status(204).end()
        }).catch(error => {
            response.status(400).send({ error: 'malformatted id' })
        })

})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})