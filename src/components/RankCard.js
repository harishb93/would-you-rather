import React from 'react'

export default function RankCard(props){
  return (
    
    <div className='rankcard'>
      <div className='ranksection'>
        <div>
          <div className='rankrow'>
            <span><b>{props.user.name}</b></span>
          </div>
          <hr/>
          <div className='poll-avatar-holder rankrow'>
            <img
              src={props.user.avatarURL}
              alt={`Avatar of ${props.user.name}`}
              className='poll-avatar'
              />
          </div>
        </div>
      </div>

      <div className='ranksection'>
        <div>
          <div className='rankrow'>
            <div className='center'>
              <span><b>Split-Up</b></span>
            </div>
          </div>
          <hr/>
          <div className='rankrow'>
            <div className='center'>
              <span className='center'>Questions asked : {props.user.questions.length}</span>
            </div>
            <br/>
            <div className='center'>
              <span className='center'>Questions Answered : {Object.keys(props.user.answers).length}</span>
            </div>
          </div>
        </div>
      </div>

      <div className='ranksection'>
        <div>
          <div className='rankrow'>
            <div className='center'>
              <span><b>Final Score</b></span>
            </div>
          </div>
          <hr/>
          <div className='rankrow'>
            <div className='center'>
              <h5><b>{Object.keys(props.user.answers).length + props.user.questions.length}</b></h5>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
