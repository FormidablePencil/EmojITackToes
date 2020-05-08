import { REGISTERED, REST_AUTH_DATA, LOGGED_IN } from "../actions/types"

export interface AuthDataTypes {
  accessToken: string
  refreshToken: string
  username: string
  email: string
}

const initialState: AuthDataTypes = {
  accessToken: null,
  refreshToken: null,
  username: null,
  email: null
}

export default (state: AuthDataTypes = initialState, { type, payload }) => {
  switch (type) {

    case LOGGED_IN:
    case REGISTERED:
      return payload

    case REST_AUTH_DATA:
      return initialState

    default:
      return state
  }
}
