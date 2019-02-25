import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link , withRouter} from 'react-router-dom'

class AnsweredPoll extends Component {

  render() {

    const {question,user} = this.props
    const {id,optionOne,optionTwo}=question
    const {avatarURL,name}=user

    if(question === null)
    return <p></p>

    return (
      <div className='question'>
      <div className='row-data'>
        <div className='question-data'>
          <div>
            <span>{name} asked:</span>
          </div>
        </div>
        <hr/>
        <div className='poll-avatar-holder'>
          <img
            src={avatarURL}
            alt={`Avatar of ${name}`}
            className='poll-avatar'
          />
        </div>
      </div>
      <div className='row-data'>
        <div className='question-data'>
          <div>
            <span className='center'>Would You Rather...</span>
              <hr/>
              <div className='center'>{optionOne.text}</div>
              <span>...OR...</span>
              <div className='center'>{optionTwo.text}</div>
              <Link to={`/question/${id}`} className='question-info'>
                <button className='btn btn-info'>View Result</button>
              </Link>
          </div>
        </div>
      </div>
      </div>
    )
  }
}

function mapStateToProps({questions,users},{id}){
  const question=questions[id]
  const user=users[question.author]

  return {
    question,
    user
  }
}

export default withRouter(connect(mapStateToProps)(AnsweredPoll))
