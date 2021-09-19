import inquirer from 'inquirer'
import 'colors'

const menuQuestion = [
  {
    type: 'list',
    name: 'option',
    message: '¿Qué desea hacer?',
    choices: [
      {
        value: 1,
        name: `${'1.'.green} Buscar ciudad.`
      },
      {
        value: 2,
        name: `${'2.'.green} Historial.`
      },
      {
        value: 0,
        name: `${'3.'.green} Salir.`
      }
    ]
  }
]

const doPauseProps = [
  {
    type: 'input',
    name: 'pause',
    message: `Preciones ${'ENTER'.green} para continuar.`
    // validate: async input => input === 'enter'
  }
]

export const inquirerMenu = async () => {
  console.clear()
  console.log('============================='.red)
  console.log('    seleccione una opción'.white)
  console.log('============================='.red)

  const { option } = await inquirer.prompt(menuQuestion)
  return option
}

export const doPause = async () => {
  console.log('\n')
  await inquirer.prompt(doPauseProps)
}

export const getInputTask = async (message) => {
  const inputTaskProps = [
    {
      type: 'input',
      name: 'taskInput',
      message,
      validate (value) {
        if (value.length === 0) {
          return 'Por favor ingrese un valor'
        }
        return true
      }
    }
  ]
  const { taskInput } = await inquirer.prompt(inputTaskProps)

  return taskInput
}

export const listOfTasksCanDelete = async (tasks = []) => {
  const listOfTasksCanDeleteProps = [
    {
      type: 'list',
      name: 'id',
      message: 'Borrar',
      choices: tasks.map((task, i) => ({
        value: task.id,
        name: `${i + 1} ${task.description}`
      }))
    }
  ]

  const { id } = await inquirer.prompt(listOfTasksCanDeleteProps)

  return id
}

export const confirm = async (message = '') => {
  const question = [{
    type: 'confirm',
    name: 'ok',
    message
  }]

  const { ok } = await inquirer.prompt(question)

  return ok
}

export const checkListOfTasks = async (tasks = []) => {
  const listOfTasksCanDeleteProps = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Seleccione',
      choices: tasks.map((task, i) => ({
        value: task.id,
        name: `${i + 1} ${task.description}`,
        checked: Boolean(task.finallyDate)
      }))
    }
  ]

  const { ids } = await inquirer.prompt(listOfTasksCanDeleteProps)

  return ids
}
