import {_saveQuestion,_saveQuestionAnswer} from '../utils/_DATA'
import {addQuestionToUser,addAnswerToUser} from './users'

export const RECEIVE_QUESTIONS='RECEIVE_QUESTIONS'
export const ADD_QUESTION='ADD_QUESTION'
export const ANSWER_QUESTION='ANSWER_QUESTION'
//addQuestion action creator
function addQuestion(question){
  return {
    type: ADD_QUESTION,
    question
  }
}

//receiveQuestions action creator
export function receiveQuestions(questions){
  return{
    type: RECEIVE_QUESTIONS,
    questions
  }
}

//answerQuestion action creator
function answerQuestion(authedUser,qid,answer){
  return {
    type: ANSWER_QUESTION,
    authedUser,
    qid,
    answer
  }
}

//handleAnswerQuestion thunk action creator - Returns function instead of action for thunk to invoke the dispatch functions given here
export function handleAnswerQuestion(qid,answer){
  return (dispatch,getState) => {
    const {authedUser} = getState()
    return _saveQuestionAnswer({
      authedUser,
      qid,
      answer
    })
    .then(() => {
      dispatch(addAnswerToUser(authedUser,qid,answer))
      dispatch(answerQuestion(authedUser,qid,answer))
    })
    .catch((e) => {
      console.warn('Error in handleAnswerQuestion: ',e)
      alert('There was an error saving your response. Try again.')
    })
  }
}

//handleAddQuestion thunk action creator - Returns function instead of action for thunk to invoke the dispatch functions given here
export function handleAddQuestion(optionOneText, optionTwoText){
  return (dispatch, getState) => {
    const {authedUser} = getState()

    return _saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser
    })
    .then((question) => {
      dispatch(addQuestion(question))
      dispatch(addQuestionToUser(question))
    })
    .catch((e) => {
      console.warn('Error in handleAddQuestion: ',e)
      alert('There was an error adding the question. Try again.')
    })
  }
}
