import React, { Component } from 'react'
import {connect} from 'react-redux'
import {setAuthedUser} from '../actions/authedUser'
import { Row, Col, Panel, Button,
  FormGroup, FormControl, Image } from 'react-bootstrap'
import {Redirect} from 'react-router-dom'

class LoginPage extends Component {

  state = {
    imgSrc: 'https://cdn5.vectorstock.com/i/thumb-large/21/19/unknown-person-flat-icon-vector-15222119.jpg',
    userToSignIn: null,
    disabled: true,
    toHome: false
  }

  handleChange = (e) => {
    const { [e.target.value]: selectedUser } = this.props.users
    this.setState({
      imgSrc: selectedUser.avatarURL,
      userToSignIn: selectedUser.id
    }, () => {
      if (this.state.userToSignIn) {
        this.setState({
          disabled: false
        })
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.dispatch(setAuthedUser(this.state.userToSignIn))
    this.setState({
      toHome: true
    })
  }

  renderForm = () => (
    <form onSubmit={this.handleSubmit}>
      <FormGroup controlId="formControlsSelect">
        <FormControl className="form-group col-md-6 offset-md-3 center" componentClass="select" onChange={this.handleChange}>
          <option hidden value="default">Select User...</option>
          {(Object.values(this.props.users)).map((user) => (
            <option key={user.id} value={user.id}>
              {user.id}
            </option>
          ))}
        </FormControl>
      </FormGroup>
      <Button
        disabled={this.state.disabled}
        type="submit" bsStyle="info">
        Sign In
      </Button>
    </form>
  )

  render() {
    if(this.state.toHome === true){
      return <Redirect to='/'/>
    }
    return (
      <Row>
        <Col sm={12}>
        <Panel bsStyle="primary" className='center'>
          <Panel.Heading className='center'>
            <Panel.Title componentClass="h3">
              Sign In
            </Panel.Title>
          </Panel.Heading>
          <Panel.Body className="signin center">
            <Image src={this.state.imgSrc} className='avatar' />
            {this.renderForm()}
          </Panel.Body>
        </Panel>
        </Col>
      </Row>
    );
  }
}

function mapStateToProps ({ users }) {
  return { users }
}

export default connect(mapStateToProps)(LoginPage)
