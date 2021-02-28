import React from 'react';
import Weather from './Weather';


const Country = ({country, visible}) => {   
    
    if (visible){
    return (
        <div>
            <h3>{country.name}</h3>
            <p>capital: {country.capital}</p>
            <p>population: {country.population}</p>
            <h4>languages</h4>
            <img src={country.flag} alt="flag" style={{width: 100 + 'px'}} />
            <Weather country={country} />
        </div>
    )
    } else {
        return null
    }
}

export default Country;