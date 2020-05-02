import { CHANGE_P1_CHARACTER, CHANGE_P2_CHARACTER, WHOLE_NEW_PLAYER_CHARACTERS } from "../actions/types"

export interface SymbolChoicesTypes {
   1: string
   2: string
}
const initialState: SymbolChoicesTypes = { 1: '🤩', 2: '😃' }
// const symbolChoices = { 0: '🙃', 1: '😃', 2: '🥰', 3: '🤓', 4: '🙃', 5: '💪' }


export default (state = initialState, { type, payload }) => {
   switch (type) {

      case WHOLE_NEW_PLAYER_CHARACTERS:
         return payload
      // case CHANGE_P1_CHARACTER:
      //    return { ...state, 1: payload }

      // case CHANGE_P2_CHARACTER:
      //    return { ...state, 2: payload }



      default:
         return state
   }
}
