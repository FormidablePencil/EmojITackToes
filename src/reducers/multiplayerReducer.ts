import { ERROR_MULTIPLAYER, JOINED_LOBBY, LOBBY_HOSTED, QUIT_LOBBY, UPDATE_USERNAME } from "../actions/types"

export interface multiplayerT {
  socketIoData: {
    roomId: string,
    host: {
      id: string, username: string
    },
    guest: {
      id: string, username: string
    }
  }
  enterLobby: false,
  error: null,
  username: string
}

export const defaultSocketIdData = {
  roomId: 'global chatroom',
  host: {
    id: '', username: ''
  },
  guest: {
    id: '', username: ''
  }
}

const initialState: multiplayerT = {
  socketIoData: defaultSocketIdData,
  enterLobby: false,
  error: null,
  username: '',
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

    case UPDATE_USERNAME:
      return { ...state, username: payload }

    case LOBBY_HOSTED:
      return { ...state, socketIoData: { ...defaultSocketIdData, ...payload } }

    case JOINED_LOBBY:
      return { ...state, error: payload }

    case QUIT_LOBBY:
      return { ...state, socketIoData: defaultSocketIdData }

    case ERROR_MULTIPLAYER:
      return { ...state, error: payload }

    default:
      return state
  }
}
