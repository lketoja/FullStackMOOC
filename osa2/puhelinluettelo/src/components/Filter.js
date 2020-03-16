import React from 'react'

const Filter = ({handleFilterChange, filterText}) => 
    <div>
        filter shown with: <input onChange={handleFilterChange} value={filterText}/>
    </div>



export default Filter