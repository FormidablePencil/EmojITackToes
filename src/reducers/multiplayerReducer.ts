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
    initialTurnIsHost: boolean,
  }
  clientIsHost: boolean,
  enterLobby: boolean,
  error: null,
  username: string,
  gameboard: GameBoardInterface,
  isClientTurn: boolean,
}

export const defaultSocketIdData = {
  lobbyId: 'global chatroom',
  host: {
    id: '', username: ''
  },
  guest: {
    id: '', username: ''
  },
  initialTurnIsHost: false,
}

const initialState: multiplayerT = {
  clientIsHost: false,
  socketIoData: defaultSocketIdData,
  enterLobby: false,
  error: null,
  username: '',
  gameboard: initialSqs,
  isClientTurn: false,
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

    case UPDATE_USERNAME:
      return { ...state, username: payload }

    case LOBBY_HOSTED:
      console.log(payload.initialTurnIsHost)
      return {
        ...state,
        socketIoData: { ...defaultSocketIdData, ...payload },
        clientIsHost: true,
      }

    case JOINED_LOBBY:
    case MATCH_FOUND:
      return {
        ...state,
        socketIoData: payload,
        isClientTurn: clientGoesFirst({ clientIsHost: state.clientIsHost, initialTurnIsHost: payload.initialTurnIsHost }),
      }

    case LEAVE_LOBBY:
      return { ...state, socketIoData: defaultSocketIdData, gameboard: initialSqs, clientIsHost: false }

    case UPATE_GAMEBOARD_MULTIPLAYER:
      console.log(payload, 'move?')
      return { ...state, gameboard: { ...state.gameboard, [payload.col]: payload.boxPressed } }

    case ERROR_MULTIPLAYER:
      return { ...state, error: payload }

    default:
      return state
  }
}

const clientGoesFirst = ({ clientIsHost, initialTurnIsHost }) => {
  if (clientIsHost && initialTurnIsHost) return true
  else if (!clientIsHost && !initialTurnIsHost) return true
  else return false
}