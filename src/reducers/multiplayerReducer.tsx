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
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

    // case typeName:
      // return { ...state, ...payload }

    default:
      return state
  }
}
