import { CHAR_ANIM_OUT_FALSE, CHAR_ANIM_OUT_TRUE, STATE_NEW_GAME, TOGGLE_USERNAME_POPUP_TOOLTIP } from "../actions/types"

export interface miscT {
  characterAnimateOut: boolean,
  usernamePopupToolTip: boolean,
  
}

const initialState: miscT = {
  characterAnimateOut: false,
  usernamePopupToolTip: false,
  
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

    case TOGGLE_USERNAME_POPUP_TOOLTIP:
      return { ...state, usernamePopupToolTip: !state.usernamePopupToolTip }

    case CHAR_ANIM_OUT_TRUE:
    case STATE_NEW_GAME:
      return { ...state, characterAnimateOut: true }

    case CHAR_ANIM_OUT_FALSE:
      return { ...state, characterAnimateOut: false }

    default:
      return state
  }
}
