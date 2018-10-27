import React from 'react'

const Data = (props) => {
    return (
        props.persons.filter(person => person.name.toUpperCase().includes(props.filter.toUpperCase())).map(person =>
            <form key={person.name} onSubmit={e => props.handleDelete(e, person)}>
                <table key={person.name}><tbody>
                    <tr><td>{person.name}</td><td>{person.number}</td>
                        <td><button type="submit">poista</button></td></tr></tbody>
                </table>
            </form>


        )
    )

}

export default Data