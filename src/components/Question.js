import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {handleAnswerQuestion} from '../actions/questions'

class Question extends Component {

  state = {
    checkedValue:'',
    toHome: false
  }

  handleToggle = (e) => {
    const checkedValue=e.target.value
    console.log(checkedValue)
    this.setState(() => ({
      checkedValue
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {checkedValue} = this.state
    const {dispatch,id} = this.props

    dispatch(handleAnswerQuestion(id,checkedValue))
    console.log(checkedValue)
    this.setState(() => ({
      checkedValue: '',
      toHome: true
    }))
  }

  render() {

    const {checkedValue,toHome} = this.state
    const {users,pageAvailable,questionAnswered,question} = this.props

    if(toHome === true){
      return (
        <Redirect to='/'/>
      )
    }

    if(!(pageAvailable)){
      return (
        <div>404 Page Not Found</div>
      )
    }
    else if(questionAnswered){
      return(
        <div>Results Dabba </div>
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

export default connect(mapStateToProps)(Question)
