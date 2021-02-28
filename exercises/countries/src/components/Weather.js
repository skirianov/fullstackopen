import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Weather = ({ country }) => {
    const [ weather, setWeather ] = useState({});
    const [ show, setShow ] = useState(false);

    useEffect(() => {
        axios
        .get(`http://api.weatherstack.com/current?access_key=eaed26033049f2035c0a2f9ecf027d45&query=${country.capital}`)
            .then(response => {
                setWeather(response.data);
                setShow(true);
            })
    }, [country])

    if (show) {
        return (
            <div>
                <h3>Weather in {weather.location.name}</h3>
                <p><strong>temperature: </strong> {weather.current.temperature} Celcius</p>
                <img src={weather.current.weather_icons} alt="weather icon" />
                <p><strong>wind: </strong>{weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
            </div>
        )
    } else {
        return null;
    }
}

export default Weather;