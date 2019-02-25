import React, { Component } from 'react'
import {connect} from 'react-redux'
import RankCard from './RankCard'

class Leaderboard extends Component {

  render() {

    const {rankings,users} = this.props

    return (
        <div className='center new-tweet'>
          {rankings.map((userId)=>(
            <li key={userId}>
              <RankCard user={users[userId]}/>
          </li>
          ))}
        </div>
    )
  }
}


function mapStateToProps({users}){

  return {
    rankings: Object.keys(users)
    .sort((a,b) => ((Object.keys(users[b].answers).length + users[b].questions.length) -
    (Object.keys(users[a].answers).length + users[a].questions.length))) ,
    users
  }
}

export default connect(mapStateToProps)(Leaderboard)
