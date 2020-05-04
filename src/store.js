import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import playerCharacterSettingsReducer from './reducers/playerCharacterSettingsReducer'

const rootReducer = combineReducers({
  playerCharacterSettings: playerCharacterSettingsReducer,
})

const initialState = {}

const middleware = [thunk] 

const configureStore = () => createStore(rootReducer, initialState, applyMiddleware(...middleware))

export default configureStore
