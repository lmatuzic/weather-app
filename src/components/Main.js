import { useState } from 'react'
import axios from 'axios'
import Header from './Header'
import Content from './Content'
import Search from './Search'
import WeatherData from './WeatherData'
import Context from '../Context'
import Error from './Error'
import DateTime from './DateTime'
import Tagline from './Tagline'


const Main = () => {
  const [weather, setWeather] = useState()
  const [city, setCity] = useState()
  const [error, setError] = useState()

  const api_call = async (e) => {
    e.preventDefault();
    const location = e.target.location.value
    if (!location) {
      return (
        setError("Please enter the name of the city."),
        setWeather(null)
      )
    }
    const API_KEY = 'd0b41efc5b1235812f9f4b27b2123d81'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
    const request = axios.get(url)
    const response = await request
    setWeather(response.data.main);
    setCity(response.data.name)
    setError(null)
  }

  return (
    <div className="main">
      <Header />
      <Content>
        <DateTime />
        <Tagline />
        <Context.Provider value={{ 
          api_call: api_call,
          weather: weather,
          city: city
         }}>
          <Search />
          { error &&  <Error error={error} /> }
          {weather && <WeatherData />}
        </Context.Provider>
      </Content>
    </div>
  )
}

export default Main
