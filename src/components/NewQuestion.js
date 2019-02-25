import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {handleAddQuestion} from '../actions/questions'

class NewQuestion extends Component {

  state = {
    option1: '',
    option2:'',
    toHome: false
  }

  handleChangeOption1 = (e)=> {
    const option1=e.target.value
    this.setState(() => ({
      option1
    }))
  }

  handleChangeOption2 = (e)=> {
    const option2=e.target.value
    this.setState(() => ({
      option2
    }))
  }

  handleSubmit = (e) => {
  e.preventDefault()
  console.log("Inside handleSubmit")
  const {option1,option2} = this.state
  const {dispatch} = this.props

  dispatch(handleAddQuestion(option1,option2))

  this.setState(() => ({
    option1: '',
    option2:'',
    toHome: true
  }))
}

  render() {

    const {option1,option2,toHome} = this.state

    if(toHome === true){
      return <Redirect to='/'/>
    }

    return (

        <div className='center new-tweet'>
          <h3>Create New Question</h3>
          <hr/>
          <form className='new-question' onSubmit={this.handleSubmit}>
            <h5>Would You Rather...</h5>
            <input className='center' placeholder="Enter Option 1"
              onChange={this.handleChangeOption1} value={option1}></input>
            <span className='center'>OR</span>
            <input className='center' placeholder="Enter Option 2"
              onChange={this.handleChangeOption2} value={option2}></input>

            <button className='btn btn-info' type='submit' disabled={option2 === '' || option1==='' }>Submit</button>
          </form>
        </div>
    )
  }
}

export default connect()(NewQuestion)
