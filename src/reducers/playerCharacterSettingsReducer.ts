import { CHANGE_P1_CHARACTER, CHANGE_P2_CHARACTER, WHOLE_NEW_PLAYER_CHARACTERS } from "../actions/types"

export interface playerCharacterSettingsTypes {
   playerCharacter: {
      1: string
      2: string
   },
   animation: {
      1: string
      2: string
   }
}
const initialState: playerCharacterSettingsTypes = {
   playerCharacter: { 1: '🐷', 2: '🐵' },
   animation: { 1: 'rotate', 2: 'rotate' }
}


export default (state = initialState, { type, payload }) => {
   switch (type) {

      case WHOLE_NEW_PLAYER_CHARACTERS:
         return payload

      default:
         return state
   }
}
