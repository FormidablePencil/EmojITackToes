import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import playerCharacterSettingsReducer from './reducers/playerCharacterSettingsReducer'
import authDataReducer from './reducers/authDataReducer'
import animationSettingReducer from './reducers/animationSettingReducer'
import multiplayerReducer, { multiplayerT } from './reducers/multiplayerReducer'
import allAvailableLobbiesReducer, { lobbyDataT } from './reducers/allAvailableLobbiesReducer'

export interface rootT {
  playerCharacterSettings: any
  authData: any
  animationSetting: any
  multiplayer: multiplayerT,
  allAvailableLobbies: lobbyDataT[]
}
const rootReducer = combineReducers<rootT>({
  playerCharacterSettings: playerCharacterSettingsReducer,
  authData: authDataReducer,
  animationSetting: animationSettingReducer,
  multiplayer: multiplayerReducer,
  allAvailableLobbies: allAvailableLobbiesReducer,
})

const initialState = {}

const middleware = [thunk]

const configureStore = () => createStore(rootReducer, initialState, applyMiddleware(...middleware))

export default configureStore
