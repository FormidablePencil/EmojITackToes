import { LOCALLY_STORED_DATA_LOADED } from "../actions/types"

const initialState = false

export default (state = initialState, { type }) => {
  switch (type) {

  case LOCALLY_STORED_DATA_LOADED:
    return true

  default:
    return state
  }
}
