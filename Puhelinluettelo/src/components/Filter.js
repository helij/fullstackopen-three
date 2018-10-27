import React from 'react'

const Filter = (props) => {
    return (
        <div>
            rajaa näytettäviä: <input
                value={props.value}
                onChange={props.change}
            />
        </div>





    )
    
  }

  export default Filter