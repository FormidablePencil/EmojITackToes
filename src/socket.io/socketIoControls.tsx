import { socket } from "./useSocketIo";
import { LEAVE_LOBBY } from "../actions/types";

export enum commandsSocketIo {
  makeMove,
  quit,
  selectEmoji,
  selectAnim,
  hostGame,
  joinGame,
  getAllLobbies,
}

// socketIoControls not mongodb fetching/querying. refractor!
const socketIoControls = (command, payload?) => async dispatch => {

  switch (command) {
    case commandsSocketIo.makeMove:
      socket.emit(payload.lobbyId, { move: payload.move, character: payload.character });
      break;

    case commandsSocketIo.selectEmoji:
      break;

    case commandsSocketIo.selectAnim:
      break;

    case commandsSocketIo.quit:
      dispatch({ type: LEAVE_LOBBY })
      break;

    // case commandsSocketIo.getAllLobbies:
    // break;

    // case commandsSocketIo.hostGame:
    //   break;

    // case commandsSocketIo.joinGame:
    //   break;

    default:
      break;
  }
}



export default socketIoControls
