import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import {logoutUser} from '../actions/authedUser'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

//Component for Navigation bar
class Nav extends Component {

  state = {
  toHome: false
}

  handleLogout = (e) => {
    e.preventDefault()
    this.props.dispatch(logoutUser())

    this.setState(() => ({
      toHome: true
    }))
  }

  render(){
    const {user} = this.props
    const {toHome} = this.state

    if(toHome === true){
      return <Redirect to='/'/>
    }

    return (
        <nav className='navbar'>
          <ul className='nav'>
            <li>
              <NavLink to='/' exact>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to='/add'>
                New Question
              </NavLink>
            </li>

            <li>
              <NavLink to='/leaderboard'>
                Leaderboard
              </NavLink>
            </li>
          </ul>
          {
            user &&
            <ul className='navbar nav-right'>
              <li>
                Hello, {user.name}
              </li>
              <li>
                <div className='inset'><img src={user.avatarURL}
                  alt={`Avatar`}/>
                </div>
              </li>
              <li onClick={this.handleLogout}>
                <NavLink to='/'>
                  Logout
                </NavLink>
              </li>
            </ul>
          }
        </nav>
    )
  }

}

export default connect()(Nav)
