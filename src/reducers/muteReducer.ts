import { TOGGLE_MUTE } from "../actions/types"

const initialState = false

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case TOGGLE_MUTE:
    return !state

  default:
    return state
  }
}
