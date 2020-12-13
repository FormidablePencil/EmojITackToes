import { JOINED_LOBBY, LEAVE_LOBBY, MATCH_FOUND, STATE_NEW_GAME, UPDATE_GAME_BOARD } from "../actions/types"
import { GameBoardInterface } from "../TypesTypeScript/TypesAndInterface"

export const initialSqs: GameBoardInterface = {
  0: { sq0: null, sq1: null, sq2: null, },
  1: { sq0: null, sq1: null, sq2: null, },
  2: { sq0: null, sq1: null, sq2: null, },
}

export default (state = initialSqs, { type, payload }) => {
  switch (type) {

    case STATE_NEW_GAME:
    case LEAVE_LOBBY:
    case JOINED_LOBBY:
    case MATCH_FOUND:
      return initialSqs

    case UPDATE_GAME_BOARD:
      return {
        ...state, [payload.col]: {
          ...state[payload.col],
          [payload.boxPressed]: payload.player
        }
      }
    // return { ...state, [payload.col]: { ...state[payload.col], [boxPressed]: playerOneTurn ? sqTypes.p1 : sqTypes.p2 }
    // return { ...state, [payload.col]: payload.boxPressed }

    default:
      return state
  }
}
