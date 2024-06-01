import React, { useState } from 'react';
import React, {useEffect} from 'react';

const API_KEY = '30d38b26954359266708f92e1317dac0';

function App() {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        fetchWeatherData('Salta');
    }, 
    []);

    const fetchWeatherData = async (city) => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=-24.7829&lon=-65.4122&appid=${API_KEY}`);
            
            if(!response.ok){
                throw new Error('No se pudo obtener los datos del clima');
            }

            const data = await response.json();

            setWeatherData(data);
        } catch (error) {
            console.error('Error al obtener datos del clima', error);
        }
    };

    const handleCiudadClick = (city) => {
        fetchWeatherData(city);
    };
return (
    <>
        <nav>
            <ul>
                <li>
                    <h1>Clima</h1>
                </li>
            </ul>

            <ul>
                <li><a href="#" className="contrast" onClick={() => handleCiudadClick('Tucumán')}>Tucumán</a></li>
                <li><a href="#" className="contrast" onClick={() => handleCiudadClick('Salta')}>Salta</a></li>
                <li><a href="#" className="contrast" onClick={() => handleCiudadClick('Buenos Aires')}>Buenos Aires</a></li>
            </ul>
        </nav>

        <input type="search" name="search" 
        value={ciudadSeleccionada} placeholder="Buscar ciudad" 
        aria-label="search" onChange={(e) => setCiudadSeleccionada(e.target.value)}/>
        
        {weatherData && (
        <article>
            <header>
                <h2>{weatherData.name}</h2>
            </header>
            <img
                src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                alt={weatherData.weather[0].description} height="48"/>
            <footer>
                <h3>Temperatura: {weatherData.main.temp}°C</h3>
                <p className="m">Mínima: {weatherData.main.max}°C</p>
                <p className="m">/ Máxima: {weatherData.main.min}°C</p>
                <p className="hum">Humedad: {weatherData.main.humedity}%</p>
            </footer>
        </article>
        )}
    </>
    );
}

export default App;