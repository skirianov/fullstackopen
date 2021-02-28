import React from 'react';

const CountryList = ({ each, showInfo }) => {
    if (each.name.includes('Too')){
        return <p>{each.name}</p>
    } else {
        return (
            <div>
                <div>
                    <p>{each.name}</p>
                    <button value={each.name} onClick={showInfo}>show</button>
                </div>
            </div>
        )
    }
}

export default CountryList;