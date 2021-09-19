import { getInputTask } from './helpers/inquirer.js'

const main = async () => {
  const text = await getInputTask()

  console.log(text)
}

main()
