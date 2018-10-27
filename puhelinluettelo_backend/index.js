const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')

app.use(bodyParser.json())
//app.use(morgan('tiny'));
morgan.token('request', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :request :status :res[content-length] - :response-time ms'))
let persons = [
    {
        name: 'Arto Hellas',
        number: '040-123456',
        id: 1
    },
    {
        name: 'Martti Tienari',
        number: '040-123456',
        id: 2
    },
    {
        name: 'Arto Järvinen',
        number: '040-123456',
        id: 3
    },
    {
        name: 'Lea Kutvonen',
        number: '040-123456',
        id: 4
    }
]

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    res.send(`<p>puhelinluettelossa ${persons.length} henkilön tiedot<br></br>${new Date()}</p>`)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)
    response.status(204).end()
})


app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

app.post('/api/persons/', (request, response) => {
    const body = request.body

    if (body.name === undefined) {
        return response.status(400).json({ error: 'name missing' })
    }
    if (body.number === undefined) {
        return response.status(400).json({ error: 'number missing' })
    }
    if (persons.filter(p => p.name === body.name).length > 0) {
        return response.status(400).json({ error: 'name must be unique' })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: getRandomInt(1000)
    }

    persons = persons.concat(person)

    response.json(person)
})

const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)