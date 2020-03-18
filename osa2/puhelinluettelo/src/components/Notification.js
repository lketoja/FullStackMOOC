import React from 'react'

const Notification = ({message, colour}) => {
    if(message === null){
        return null
    }
    console.log(colour)
    const successStyle = {
        color: colour,
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15
    }
    return(
        <div style={successStyle}>
            {message}
        </div>
    )
}

export default Notification