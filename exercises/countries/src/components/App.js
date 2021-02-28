import React, {useState, useEffect } from 'react';
import axios from 'axios';
import CountryList from './CountryList';
import Country from './Country';

const App = () => {
    const [ countries, setCountries ] = useState([]);
    const [ filtered, setFiltered ] = useState([]);
    const [ country, setCountry ] = useState({});
    const [ visible, setVisible ] = useState(false);

    useEffect( () => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then( response => {
                setCountries(response.data);
            })
    }, [])

    const findCountry = (event) => {
        const filter = countries.filter( country => country.name.toLowerCase().includes(event.target.value.toLowerCase()));
        
        if (filter.length > 10) {
            const alert = [{name: "Too many matches, specify another filter"}];
            setFiltered(alert);
            setVisible(false);
        } else if (filter.length === 1) {
            setFiltered(filter);
            setCountry(filter[0]);
            setVisible(true);
        } else {
            setFiltered(filter);
            setVisible(false);
        }
    }
    const showInfo = (event) => {
        const country = filtered.filter(country => country.name.toLowerCase() === event.target.value.toLowerCase());
        setCountry(country[0]);
        setVisible(true);
    }


    return (
        <div>
            <div>
            find countries <input onChange={findCountry}/>
            </div>
            <div>
                {filtered.map(each => <CountryList key={each.name} each={each} showInfo={showInfo}/>)}
            </div>
            <Country country={country} visible={visible}/>
        </div>
    )
}

export default App;