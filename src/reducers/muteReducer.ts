import { TOGGLE_MUTE } from "../actions/types"

const initialState = true

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case TOGGLE_MUTE:
    return !state

  default:
    return state
  }
}
