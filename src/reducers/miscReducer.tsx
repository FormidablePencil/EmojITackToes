import { TOGGLE_USERNAME_POPUP_TOOLTIP } from "../actions/types"

export interface miscT {
  usernamePopupToolTip: boolean
}

const initialState: miscT = {
  usernamePopupToolTip: false
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

    case TOGGLE_USERNAME_POPUP_TOOLTIP:
      return { ...state, usernamePopupToolTip: !state.usernamePopupToolTip }

    default:
      return state
  }
}
