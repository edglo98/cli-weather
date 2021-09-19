import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

export default class Search {
  // history = ['Merida', 'CDMX', 'Chihuaha', 'Guadalajara', 'Cacun' ]

  constructo () {

  }

  async city (place = '') {
    try {
      const axiosInstance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
        params: {
          access_token: process.env.MAPBOX_KEY,
          limit: 8,
          language: 'es'
          // autocomplete: true,
        }
      })
      const { data } = await axiosInstance.get()
      console.log(data)
      return []
    } catch (err) {
      return []
    }
  }
}
