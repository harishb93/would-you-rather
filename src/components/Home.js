import React, { Component } from 'react'
import {connect} from 'react-redux'
import UnansweredPoll from './UnansweredPoll'
import AnsweredPoll from './AnsweredPoll'


class Home extends Component {

  render() {

    const {questionIds,answered}=this.props

    return (
        <div className='center'>
            <nav>
              <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <a className="nav-item nav-link active" id="unanswered-questions-tab" data-toggle="tab" href="#unanswered-questions" role="tab" aria-controls="unanswered-questions" aria-selected="true">Unanswered</a>
                <a className="nav-item nav-link" id="answered-questions-tab" data-toggle="tab" href="#answered-questions" role="tab" aria-controls="answered-questions" aria-selected="false">Answered</a>
                </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
              <div className="tab-pane fade show active" id="unanswered-questions" role="tabpanel" aria-labelledby="unanswered-questions-tab">
                <div className='list-polls'>
                  <ul className='poll-list'>
                    {questionIds.map((id)=>(
                      !(answered.includes(id)) &&
                      <li key={id}>
                         <UnansweredPoll className='poll-list-item' id={id}/>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="tab-pane fade" id="answered-questions" role="tabpanel" aria-labelledby="answered-questions-tab">
                <div className='list-polls'>
                  <ul className='poll-list'>
                    {questionIds.map((id)=>(
                       answered.includes(id)
                       &&
                       <li key={id} >
                      <AnsweredPoll className='poll-list-item' id={id}/>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
        </div>
    )
  }
}

function mapStateToProps({questions,users,authedUser}){

    const questionIds=Object.keys(questions)
    const answered=Object.keys(users[authedUser].answers)

    return {
    answered,
    questionIds: questionIds
    .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
  }
}

export default connect(mapStateToProps)(Home)
