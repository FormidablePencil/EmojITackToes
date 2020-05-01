import { CHANGE_SYMBOL } from "../actions/types"

const initialState = { 1: '🤩', 2: '😃' }
const symbolChoices = { 0: '🙃', 1: '😃', 2: '🥰', 3: '🤓', 4: '🙃', 5: '💪' }

export const symbolChoicesReducer = (state = initialState, action) => {
   switch (action.type) {
      case CHANGE_SYMBOL:
         return {...state, [payload.player]: symbolChoices[payload.whatSymbol]}
      default:
         return state
   }
}

export default symbolChoicesReducer