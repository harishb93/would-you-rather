import {getInitialData} from '../utils/api'
import {receiveUsers} from '../actions/users'
import {receiveQuestions} from '../actions/questions'

//handleInitialData thunk action creator - Returns function instead of action for thunk to invoke the dispatch functions given here
export default function handleInitialData(){
  return (dispatch) => {
  getInitialData()
    .then(({users,questions}) => {
      dispatch(receiveUsers(users))
      dispatch(receiveQuestions(questions))
      
    })
  }
}
