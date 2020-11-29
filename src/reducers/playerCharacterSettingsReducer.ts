import { CHANGE_P1_CHARACTER, CHANGE_P2_CHARACTER, UPDATE_CHARACTER, UPDATE_CHARACTER_AND_ANIM, WHOLE_NEW_PLAYER_CHARACTERS } from "../actions/types"

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
   playerCharacter: { 1: '🐷', 2: '🐵' },/* //! characters must be saved and pulled from local storage */
   animation: { 1: 'rotate', 2: 'rotate' },
}


export default (state = initialState, { type, payload }) => {
   switch (type) {

      case WHOLE_NEW_PLAYER_CHARACTERS:
         return payload

      case UPDATE_CHARACTER:
         /* player, playerCharacter */
         return {
            ...state,
            playerCharacter: { ...state.playerCharacter, [payload.player]: payload.emoji },
         }

      default:
         return state
   }
}
