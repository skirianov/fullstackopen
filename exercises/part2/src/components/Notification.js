import React from 'react';

const messageStyle = {
    backgroundColor: 'lightgrey',
    border: '3px solid green',
    borderRadius: '5px'
}

const errorMessageStyle = {
    backgroundColor: 'lightgrey',
    border: '3px solid red',
    borderRadius: '5px',
    color: 'red'
}

const Notification = ({message, status}) => {
    if (message === null) {
        return null;
    }

    if (status === 200){
        return (
            <div style={messageStyle}>
                <p>{message}</p>
            </div>
        )
    } else {
        return (
            <div style={errorMessageStyle}>
                <p>{message}</p>
            </div>
        )
    }
}

export default Notification;