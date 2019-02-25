import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers'
import middleware from './middleware'
import 'bootstrap/dist/css/bootstrap.min.css';

//Initialize store with reducer and middleware
const store = createStore(reducer,middleware)

//The Provider component (which comes from the react-redux package) makes it possible for all components to access the store via the connect function.
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'))
