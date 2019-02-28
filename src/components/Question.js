import React, { Component } from 'react'
import {connect} from 'react-redux'
import {handleAnswerQuestion} from '../actions/questions'
import PollResult from './PollResult'

class Question extends Component {

  state = {
    checkedValue:''
  }

  handleToggle = (e) => {
    const checkedValue=e.target.value

    this.setState(() => ({
      checkedValue
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {checkedValue} = this.state
    const {answerQuestion, id} = this.props

    //using dispatch via dispatch function mapped prop 'answerQuestion' which will called handleAnswerQuestion thunk action creator
    answerQuestion(id,checkedValue)

    this.setState(() => ({
      checkedValue: '',
      questionAnswered: true
    }))

  }

  render() {

    const {checkedValue} = this.state
    const {users,pageAvailable,questionAnswered,question,authedUser} = this.props

    if(!(pageAvailable)){
      return (
        <div className='center'>
          <h3>404 Error : Question Not Found</h3>
        </div>
      )
    }
    else if(questionAnswered){
      return(
        <PollResult users={users} question={question} authedUser={authedUser} />
      )
    }
    else{
      return (
        <div className='question'>
          <div className='row-data'>
            <div className='question-data'>
              <div>
                <span>{users[question.author].name} asked:</span>
              </div>
            </div>
            <div className='poll-avatar-holder'>
              <img
                src={users[question.author].avatarURL}
                alt={`Avatar of ${question.author}`}
                className='poll-avatar'
                />
            </div>
          </div>
          <div className='row-data-1'>
            <div className='question-data'>
              <div>
                <span className='center'>Would You Rather...</span>
                <hr/>
                <div className='radio'>
                  <label><input type='radio' name='options'
                    value='optionOne'
                    onClick={this.handleToggle}/>{question.optionOne.text}</label>
                </div>
                <div className='radio'>
                  <label><input type='radio' name='options'
                    value='optionTwo'
                    onClick={this.handleToggle}/>{question.optionTwo.text}</label>
                </div>
                <div className='center'>
                  <button className='btn btn-primary' type='submit'
                    onClick={this.handleSubmit} disabled={checkedValue === ''}>Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

function mapStateToProps({users,questions,authedUser},props){

  const id = props.match.params.id
  const pageAvailable = questions[id] ? true : false
  const question = pageAvailable ? questions[id] : null
  const questionAnswered = pageAvailable ? Object.keys(users[authedUser].answers).includes(id) ? true : false : false

  return {
    users,
    authedUser,
    id,
    pageAvailable,
    questionAnswered,
    question
  }
}

function mapDispatchToProps(dispatch){
  return (
    {
      answerQuestion: (id,checkedValue) => {dispatch(handleAnswerQuestion(id,checkedValue))}
    }
  )
}

export default connect(mapStateToProps,mapDispatchToProps)(Question)
