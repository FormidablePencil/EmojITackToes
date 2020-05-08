import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import playerCharacterSettingsReducer from './reducers/playerCharacterSettingsReducer'
import authDataReducer from './reducers/authDataReducer'
import animationSettingReducer from './reducers/animationSettingReducer'

const rootReducer = combineReducers({
  playerCharacterSettings: playerCharacterSettingsReducer,
  authData: authDataReducer,
  animationSetting: animationSettingReducer  
})

const initialState = {}

const middleware = [thunk] 

const configureStore = () => createStore(rootReducer, initialState, applyMiddleware(...middleware))

export default configureStore
