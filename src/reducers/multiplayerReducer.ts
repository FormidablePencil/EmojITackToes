import { ERROR_MULTIPLAYER, JOINED_LOBBY, LOBBY_HOSTED, LEAVE_LOBBY, UPDATE_USERNAME, MATCH_FOUND, CLIENT_TURN, END_CLIENT_TURN, READY_UP, ROUND_OVER, START_ROUND, OPPOSING_PLAYER_READY_UP, STATE_NEW_GAME } from "../actions/types"

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
  isClientTurn: boolean,
  readyUp: boolean,
  opposingPlayerReadyUp: boolean,
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
  username: 'Player',
  isClientTurn: false,
  readyUp: false,
  opposingPlayerReadyUp: false,
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

    case UPDATE_USERNAME:
      return { ...state, username: payload }

    case LOBBY_HOSTED:
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
        readyUp: false,
      }

    case LEAVE_LOBBY:
      return { ...state, socketIoData: defaultSocketIdData, clientIsHost: false }


    case ERROR_MULTIPLAYER:
      return { ...state, error: payload }

    case END_CLIENT_TURN:
      return { ...state, isClientTurn: false }

    case CLIENT_TURN:
      return { ...state, isClientTurn: true }

    case READY_UP:
      return { ...state, readyUp: true }

    case OPPOSING_PLAYER_READY_UP:
      return { ...state, opposingPlayerReadyUp: true }

    case ROUND_OVER:
    case STATE_NEW_GAME:
      return { ...state, readyUp: false, opposingPlayerReadyUp: false }

    default:
      return state
  }
}

const clientGoesFirst = ({ clientIsHost, initialTurnIsHost }) => {
  if (clientIsHost && initialTurnIsHost) return true
  else if (!clientIsHost && !initialTurnIsHost) return true
  else return false
}