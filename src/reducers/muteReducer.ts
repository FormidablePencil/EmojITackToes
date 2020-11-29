import { LOAD_LOCALLY_SAVED_MUTE, TOGGLE_MUTE } from "../actions/types"
import { saveLocallyMute } from "../hooks/useLocalStorage"

const initialState = false

export default (state = initialState, { type, payload }) => {
  switch (type) {

    case TOGGLE_MUTE:
      saveLocallyMute(!state)
      return !state

    case LOAD_LOCALLY_SAVED_MUTE:
      return payload

    default:
      return state
  }
}
