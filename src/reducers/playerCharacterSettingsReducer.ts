import { LOAD_LOCALLY_SAVED_CHARACTERS, UPDATE_CHARACTER, WHOLE_NEW_PLAYER_CHARACTERS } from "../actions/types"
import { saveLocallyPlayerCharacterSettings } from "../hooks/useLocalStorage"

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
         saveLocallyPlayerCharacterSettings(payload)
         return payload

      case UPDATE_CHARACTER:
         const newState = {
            ...state,
            playerCharacter: { ...state.playerCharacter, [payload.player]: payload.emoji },
         }
         saveLocallyPlayerCharacterSettings(newState)
         return newState

      case LOAD_LOCALLY_SAVED_CHARACTERS:
         return payload

      default:
         return state
   }
}
