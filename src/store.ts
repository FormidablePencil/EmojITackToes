import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import playerCharacterSettingsReducer, { playerCharacterSettingsTypes } from './reducers/playerCharacterSettingsReducer'
import animationSettingReducer from './reducers/animationSettingReducer'
import multiplayerReducer, { multiplayerT } from './reducers/multiplayerReducer'
import allAvailableLobbiesReducer, { lobbyDataT } from './reducers/allAvailableLobbiesReducer'
import muteReducer from './reducers/muteReducer'
import gameboardReducer from './reducers/gameboardReducer'
import { GameBoardInterface } from './TypesTypeScript/TypesAndInterface'
import miscReducer, { miscT } from './reducers/miscReducer'
import locallyStoredDataLoadedReducer from './reducers/locallyStoredDataLoadedReducer'

export interface rootT {
  gameboard: GameBoardInterface
  playerCharacterSettings: playerCharacterSettingsTypes
  animationSetting: any
  multiplayer: multiplayerT,
  allAvailableLobbies: lobbyDataT[],
  mute: boolean,
  misc: miscT,
  locallyStoredDataLoaded: boolean,
}
const rootReducer = combineReducers<rootT>({
  gameboard: gameboardReducer,
  playerCharacterSettings: playerCharacterSettingsReducer,
  animationSetting: animationSettingReducer,
  multiplayer: multiplayerReducer,
  allAvailableLobbies: allAvailableLobbiesReducer,
  mute: muteReducer,
  misc: miscReducer,
  locallyStoredDataLoaded: locallyStoredDataLoadedReducer,
})

const initialState = {}

const middleware = [thunk]

const configureStore = () => createStore(rootReducer, initialState, applyMiddleware(...middleware))

export default configureStore
