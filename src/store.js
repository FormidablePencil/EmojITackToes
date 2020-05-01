import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import symbolChoicesReducer from './reducers/symbolChoicesReducer'

const rootReducer = combineReducers({
  symbolChoices: symbolChoicesReducer,
})

const initialState = {}

const middleware = [thunk] 

const configureStore = () => createStore(rootReducer, initialState, applyMiddleware(...middleware))

export default configureStore
