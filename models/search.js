import fs from 'fs'
import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

export default class Search {
  constructor () {
    this.history = []
    this.readDB()
  }

  async city (place = '') {
    try {
      const axiosInstance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
        params: {
          access_token: process.env.MAPBOX_KEY,
          limit: 8,
          language: 'es'
        }
      })
      const { data } = await axiosInstance.get()

      return data.features.map(place => ({
        id: place.id,
        name: place.place_name,
        coordinates: {
          lng: place.center[0],
          lat: place.center[1]
        }
      }))
    } catch (err) {
      return []
    }
  }

  async weather (lat, lon) {
    try {
      const axiosInstance = axios.create({
        baseURL: 'https://api.openweathermap.org/data/2.5/weather',
        params: {
          appid: process.env.OPENWEATHER_KEY,
          units: 'metric',
          lang: 'es',
          lat,
          lon
        }
      })
      const { data } = await axiosInstance.get()

      return {
        description: data.weather[0].description,
        temperature: data.main.temp,
        tempMin: data.main.temp_min,
        tempMax: data.main.temp_max,
        humidity: data.main.humidity
      }
    } catch (err) {
      console.log('😓 eeorror', err)
    }
  }

  addHistory (place = '') {
    if (this.history.includes(place.toLowerCase())) return
    console.log(this.history)
    this.history.unshift(place.toLowerCase())

    this.writeDB()
  }

  writeDB () {
    fs.writeFileSync('./db/history.json', JSON.stringify(this.history))
  }

  readDB () {
    if (!fs.existsSync('./db/history.json')) return
    const file = fs.readFileSync('./db/history.json', { encoding: 'utf-8' })
    const db = JSON.parse(file)

    this.history = db
  }
}
