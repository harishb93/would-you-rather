import thunk from 'redux-thunk'
import logger from './logger'
import {applyMiddleware} from 'redux'

//function with middlware functions - Order matters
export default applyMiddleware(
  thunk,
  logger
)
