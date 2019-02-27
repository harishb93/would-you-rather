import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {handleAddQuestion} from '../actions/questions'
import { SyncLoader } from 'react-spinners';

class NewQuestion extends Component {

  state = {
    option1: '',
    option2:'',
    toHome: false,
    questionNotSaved: false
  }

  handleOptionChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
}

  handleSubmit = (e) => {
  e.preventDefault()
  const {option1,option2} = this.state
  const {dispatch} = this.props

  this.setState(() => ({
    option1: '',
    option2:'',
    questionNotSaved: true
  }))

  dispatch(handleAddQuestion(option1,option2))

  setTimeout(() => {
    this.setState(() => ({
      toHome: true,
    }))
  },1500)
}

  render() {

    const {option1,option2,toHome,questionNotSaved} = this.state

    if(toHome === true){
      return <Redirect to='/'/>
    }
    else if(questionNotSaved === true){
      return (
        <div style={{position:'fixed',top:'50%', left:'50%'}} >
          <SyncLoader color='#3B84E1'/>
        </div>
    )
    }

    return (

        <div className='center new-tweet'>
          <h3>Create New Question</h3>
          <hr/>
          <form className='new-question' onSubmit={this.handleSubmit}>
            <h5>Would You Rather...</h5>
            <input className='center' placeholder="Enter Option 1"
              onChange={this.handleOptionChange} name="option1" value={option1}></input>
            <span className='center'>OR</span>
            <input className='center' placeholder="Enter Option 2"
              onChange={this.handleOptionChange} name="option2" value={option2}></input>

            <button className='btn btn-info' type='submit' disabled={option2 === '' || option1==='' }>Submit</button>
          </form>
        </div>
    )
  }
}

export default connect()(NewQuestion)
