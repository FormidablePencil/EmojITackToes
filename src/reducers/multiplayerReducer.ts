import { ERROR_MULTIPLAYER, JOINED_LOBBY, LOBBY_HOSTED, LEAVE_LOBBY, UPDATE_USERNAME, MATCH_FOUND, UPATE_GAMEBOARD_MULTIPLAYER } from "../actions/types"
import { initialSqs } from "../screens/TickTackToeScreen"
import { GameBoardInterface } from "../TypesTypeScript/TypesAndInterface"

export interface multiplayerT {
  socketIoData: {
    lobbyId: string,
    host: {
      id: string, username: string
    },
    guest: {
      id: string, username: string
    }
  }
  enterLobby: false,
  error: null,
  username: string,
  gameboard: GameBoardInterface
}

export const defaultSocketIdData = {
  lobbyId: 'global chatroom',
  host: {
    id: '', username: ''
  },
  guest: {
    id: '', username: ''
  },
  gameboard: initialSqs
}

const initialState: multiplayerT = {
  socketIoData: defaultSocketIdData,
  enterLobby: false,
  error: null,
  username: '',
  gameboard: initialSqs
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

    case UPDATE_USERNAME:
      return { ...state, username: payload }

    case LOBBY_HOSTED:
      return { ...state, socketIoData: { ...defaultSocketIdData, ...payload } }

    case JOINED_LOBBY:
    case MATCH_FOUND:
      return { ...state, socketIoData: payload }

    case LEAVE_LOBBY:
      return { ...state, socketIoData: defaultSocketIdData }

    case UPATE_GAMEBOARD_MULTIPLAYER:
      return { ...state, gameboard: payload }

    case ERROR_MULTIPLAYER:
      return { ...state, error: payload }

    default:
      return state
  }
}
