import {
  _getUsers,
  _getQuestions
} from './_DATA.js'

//API to get Users and Questions as part of initial application loading
export function getInitialData () {
  return Promise.all([
    _getUsers(),
    _getQuestions(),
  ]).then(([users, questions]) => ({
    users,
    questions,
  }))
}
