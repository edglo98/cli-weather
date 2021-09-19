import { doPause, getInputTask, inquirerMenu } from './helpers/inquirer.js'
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
        console.log(searchResults)

        console.log('\nInformación de la ciudad\n'.green)
        console.log('Ciudad:'.white)
        console.log('Lat:'.white)
        console.log('Lng:'.white)
        console.log('Temperatura:'.white)
        console.log('Mínima:'.white)
        console.log('Máxima:'.white)
        break
      }
    }
    await doPause()
  } while (opt !== 0)
}

main()
