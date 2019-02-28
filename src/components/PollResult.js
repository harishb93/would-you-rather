import React from 'react'

const PollResult = ({users,question,authedUser}) => {

  const optOneVotes = question.optionOne.votes.length
  const optTwoVotes = question.optionTwo.votes.length
  const totalVotes = optOneVotes + optTwoVotes
  const optOnePercentage = (optOneVotes / totalVotes) * 100
  const optTwoPercentage = (optTwoVotes / totalVotes) * 100

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

            <div className='center'>
              {
                question.optionOne.votes.includes(authedUser)
                ?
                <div className="list-group-item list-group-item-success">
                  <span className="badge"><span className="glyphicon glyphicon-star"></span>You Voted</span>
                  <p>{question.optionOne.text}</p>
                  <div className='center progress'>
                    <div className='center progress-bar bg-success' role='progressbar' style={{width: `${optOnePercentage}%`}} aria-valuenow={optOnePercentage} aria-valuemin='0' aria-valuemax='100'>{optOneVotes} out of {totalVotes} votes</div>
                  </div>
                </div>
                :
                <div className="list-group-item">
                  <p>{question.optionOne.text}</p>
                  <div className='center progress'>
                    <div className='center progress-bar bg-success' role='progressbar' style={{width: `${optOnePercentage}%`}} aria-valuenow={optOnePercentage} aria-valuemin='0' aria-valuemax='100'>{optOneVotes} out of {totalVotes} votes</div>
                  </div>
                </div>
              }
            </div>

            <div className='center'>
              {
                question.optionTwo.votes.includes(authedUser)
                ?
                <div className="list-group-item list-group-item-success">
                  <span className="badge"><span className="glyphicon glyphicon-star"></span>You Voted</span>
                  <p>{question.optionTwo.text}</p>
                  <div className='center progress'>
                    <div className='center progress-bar bg-success' role='progressbar' style={{width: `${optTwoPercentage}%`}} aria-valuenow={optTwoPercentage} aria-valuemin='0' aria-valuemax='100'>{optTwoVotes} out of {totalVotes} votes</div>
                  </div>
                </div>
                :
                <div className="list-group-item">
                  <p>{question.optionTwo.text}</p>
                  <div className='center progress'>
                    <div className='center progress-bar bg-success' role='progressbar' style={{width: `${optTwoPercentage}%`}} aria-valuenow={optTwoPercentage} aria-valuemin='0' aria-valuemax='100'>{optTwoVotes} out of {totalVotes} votes</div>
                  </div>
                </div>
              }
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default PollResult
