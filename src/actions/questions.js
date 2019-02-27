import {_saveQuestion,_saveQuestionAnswer} from '../utils/_DATA'
import {addQuestionToUser,addAnswerToUser} from './users'

export const RECEIVE_QUESTIONS='RECEIVE_QUESTIONS'
export const ADD_QUESTION='ADD_QUESTION'
export const ANSWER_QUESTION='ANSWER_QUESTION'
//addTweet action creator
function addQuestion(question){
  return {
    type: ADD_QUESTION,
    question
  }
}

function answerQuestion(authedUser,qid,answer){
  return {
    type: ANSWER_QUESTION,
    authedUser,
    qid,
    answer
  }
}

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

//receiveTweets action creator
export function receiveQuestions(questions){
  return{
    type: RECEIVE_QUESTIONS,
    questions
  }
}
