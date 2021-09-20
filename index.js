import { doPause, getInputTask, inquirerMenu, listOfOptions } from './helpers/inquirer.js'
import Search from './models/search.js'

const main = async () => {
  const search = new Search()

  let opt
  do {
    opt = await inquirerMenu()

    switch (opt) {
      case 1: {
        const place = await getInputTask('🔎 Buscar ciudad: ')
        const searchResults = await search.city(place)
        const selectionId = await listOfOptions(searchResults)
        if (selectionId === 0) return
        const placeSelected = searchResults.find(place => place.id === selectionId)
        search.addHistory(placeSelected.name)

        const weather = await search.weather(placeSelected.coordinates.lat, placeSelected.coordinates.lng)

        console.clear()
        console.log('\nInformación de la ciudad\n'.blue)
        console.log('Ciudad: '.white, placeSelected.name.toString().green)
        console.log(`Coordenadas: ${placeSelected.coordinates.lat.toString().green}, ${placeSelected.coordinates.lng.toString().green}`)
        console.log('Tiempo actual:'.white, weather.description.toString().green)
        console.log('Humedad:'.white, (weather.humidity + '%').green)
        console.log('Temperatura:'.white, (weather.temperature + '°C').green)
        console.log('Temperatura mínima:'.white, (weather.tempMin + '°C').green)
        console.log('Temperatura máxima:'.white, (weather.tempMax + '°C').green)
        break
      }
      case 2: {
        search.history.forEach((place, i) => {
          const idx = `${i + 1}.`.green
          console.log(`${idx} ${place}`)
        })
      }
    }
    await doPause()
  } while (opt !== 0)
}

main()
