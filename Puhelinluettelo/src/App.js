import React from 'react';
import Filter from './components/Filter'
import Data from './components/Data'
import Notification from './components/Notification'
import personService from './services/persons'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            newName: '',
            newNumber: '',
            filter: '',
            added: null,
            removed: null,
            changed: null
        }
    }

    componentDidMount() {
        personService.getAll()
            .then(persons => {
                this.setState({ persons })
            })
    }


    addPerson = (event) => {
        event.preventDefault()
        if (!this.state.persons.map(person => person.name).includes(this.state.newName)) {
            const personObject = {
                name: this.state.newName,
                number: this.state.newNumber
            }
            personService.create(personObject)
                .then(response => {
                    const persons = this.state.persons.concat(response)
                    this.setState({
                        persons,
                        added: `lisättiin '${this.state.newName}' `
                    })
                    setTimeout(() => {
                        this.setState({
                            added: null
                        })
                    }, 5000)
                })
        }
        else {
            if (window.confirm(this.state.newName + " on jo luettelossa, korvataanko vanha numero uudella?")) {
                const person = this.state.persons.find(person => person.name === this.state.newName)
                person.number = this.state.newNumber
                personService.update(person.id, person).then(response => {
                    const persons = this.state.persons.filter(p => p.name !== this.state.newName).concat(response)
                    this.setState({
                        persons,
                        changed: `henkilön '${person.name}' uusi numero on '${person.number}' `
                    })
                }).catch(error => {
                    alert(`henkilö '${person.name}' on jo valitettavasti poistettu palvelimelta`)
                    this.setState({ persons: this.state.persons.filter(p => p.name !== this.state.newName) })
                })
                setTimeout(() => {
                    this.setState({
                        changed: null
                    })
                }, 5000)
            }
        }
    }


    handleDelete = (event, person) => {
        event.preventDefault()
        if (window.confirm("poistetaanko " + person.name)) {
            personService.deletePerson(person.id)
                .then(response => {
                    const persons = this.state.persons.filter(p => p.id !== person.id);
                    this.setState({
                        persons,
                        removed: `poistettiin '${person.name}' `
                    })
                    setTimeout(() => {
                        this.setState({
                            removed: null
                        })
                    }, 5000)
                })
        }

    }

    handleNameChange = (event) => {
        this.setState({ newName: event.target.value })
    }

    handleNumberChange = (event) => {
        this.setState({
            newNumber: event.target.value
        }
        )
    }

    handleFilter = (event) => {
        this.setState({ filter: event.target.value })
    }

    render() {
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <p>Jos poistat jonkun henkilön toisesta selaimesta hieman ennen kun yrität muuttaa henkilön numeroa toisesta selaimesta, tapahtuu virhetilanne:</p>
                <Notification message={this.state.added} style='added' />
                <Notification message={this.state.removed} style='removed' />
                <Notification message={this.state.changed} style='changed' />
                <Filter value={this.state.filter} change={this.handleFilter} />
                <h2>Lisää uusi / muuta olemassaolevan numeroa</h2>
                <form onSubmit={this.addPerson}>
                    <div>
                        nimi: <input
                            value={this.state.newName}
                            onChange={this.handleNameChange}
                        />
                    </div>
                    <div>
                        numero: <input
                            value={this.state.newNumber}
                            onChange={this.handleNumberChange}
                        />
                    </div>
                    <div>
                        <button type="submit">lisää</button>
                    </div>

                </form>
                <h2>Numerot</h2>
                <Data persons={this.state.persons} filter={this.state.filter} handleDelete={this.handleDelete} />
            </div>

        )
    }
}

export default App