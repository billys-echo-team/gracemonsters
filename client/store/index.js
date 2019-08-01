import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'

import itemsReducer from './itemsReducer'

const reducer = combineReducers({ user })  //?? need to have user reduecer....?

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)
const store = createStore(reducer, middleware)

const rootReducer = combineReducers({
  items: itemsReducer,
  // users: userReducer
})

export default rootReducer

// Not sure about there are TWO default export

export default store
export * from './user'
