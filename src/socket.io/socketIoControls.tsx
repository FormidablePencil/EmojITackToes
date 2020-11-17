import { socket } from ".";
import { ERROR_MULTIPLAYER, JOINED_LOBBY, LOBBY_HOSTED, QUIT_LOBBY } from "../actions/types";

export enum commandsSocketIo {
  makeMove,
  quit,
  selectEmoji,
  selectAnim,
  hostGame,
  joinGame,
}

const socketIoControls = (command, payload) => async dispatch => {
  let type
  switch (command) {
    case commandsSocketIo.makeMove:
      socket.emit(payload.lobbyId, { move: payload.move, character: payload.character });
      break;

    case commandsSocketIo.quit:
      dispatch({ type: QUIT_LOBBY })

      break;

    case commandsSocketIo.selectEmoji:
      break;

    case commandsSocketIo.selectAnim:
      break;

    case commandsSocketIo.hostGame:
      const hostRes = await fetch('')
      const hostPayload = await hostRes.json()
      if (payload.status === 202)
        type = LOBBY_HOSTED
      else
        type = ERROR_MULTIPLAYER
      dispatch({ type, payload: hostPayload })
      break;

    case commandsSocketIo.joinGame:
      const resJoin = await fetch('')
      const joinPayload = await resJoin.json()
      if (joinPayload.status === 202)
        type = JOINED_LOBBY
      else
        type = ERROR_MULTIPLAYER
      dispatch({ type, payload: joinPayload })
      break;

    default:
      break;
  }
}

export default socketIoControls
