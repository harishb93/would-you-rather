import React, { Component , Fragment } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import handleInitialData from '../actions/shared'
import { SyncLoader } from 'react-spinners';
import NewQuestion from './NewQuestion'
import LoginPage from './LoginPage'
import Leaderboard from './Leaderboard'
import Home from './Home'
import Nav from './Nav'
import Question from './Question'

class App extends Component {
  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }
  //Handle routing/page navigation
  render() {
    const {user,loading} = this.props
    return (
      <Router>
        <Fragment>
          <div className='container'>
            <div>
              {
                loading ?
                <div style={{position:'fixed',top:'50%', left:'50%'}} >
                  <SyncLoader color='#3B84E1'/>
                </div>
                :
                this.props.authenticated === true
                ?
                //Add Login Component
                <LoginPage/>
                :
                //Home page component
                <div>
                  <Nav user={user}/>
                  <Route path='/' exact component={Home}/>
                  <Route path='/new' exact component={NewQuestion}/>
                  <Route path='/leaderboard' exact component={Leaderboard}/>
                  <Route path='/question/:id' exact component={Question}/>
                </div>
              }
            </div>
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({authedUser,users}){

  const user = authedUser===null ? null : users[authedUser]
  return {
    loading : Object.keys(users).length === 0 ? true : false,
    authenticated: authedUser===null,
    user: user
  }
}

//Using the connect function upgrades a component to a container. Containers can read state from the store and dispatch actions.
//Signature of connect function - connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
/*
mapStateToProps - If this argument is specified, the new component will subscribe to Redux store updates. This means that any time the store is updated, mapStateToProps will be called. The results of mapStateToProps must be a plain object, which will be merged into the component’s props. If you don't want to subscribe to store updates, pass null or undefined in place of mapStateToProps.
mapDispatchToProps - If an object is passed, each function inside it is assumed to be a Redux action creator. An object with the same function names, but with every action creator wrapped into a dispatch call so they may be invoked directly, will be merged into the component’s props. If a function is passed, it will be given dispatch as the first parameter. It’s up to you to return an object that somehow uses dispatch to bind action creators in your own way. (Tip: you may use the bindActionCreators(https://redux.js.org/api/bindactioncreators) helper from Redux.)
*/
export default connect(mapStateToProps)(App)
