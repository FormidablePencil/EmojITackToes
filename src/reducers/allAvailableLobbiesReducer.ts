import { QUERIED_ALL_AVAILABLE_LOBBIES } from "../actions/types"

export interface lobbyDataT {
  _id: string,
  lobbyId: string,
  host: {
    id: string,
    username: string,
  },
  guest: {
    id: string,
    username: string,
  }
}

const initialState: lobbyDataT[] = []

export default (state = initialState, { type, payload }) => {
  switch (type) {

    case QUERIED_ALL_AVAILABLE_LOBBIES:
      return payload

    default:
      return state
  }
}
