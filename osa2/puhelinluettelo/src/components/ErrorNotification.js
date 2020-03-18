import React from 'react'

const SuccessNotification = ({message}) => {
    if(message === null){
        return null
    }
    const successStyle = {
        color: 'red',
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

export default SuccessNotification