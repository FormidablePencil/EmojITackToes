import socketIoCommands from "../../socket.io/socketIoCommandCenter";
import { ERROR_MULTIPLAYER, JOINED_LOBBY } from "../types";

const joinGame = ({ username, lobbyId }) => async dispatch => {
  // console.log('joinGame');
  let type
  let url = 'https://tick-tack-toes.herokuapp.com/lobby/join'
  let data = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: username,
      lobbyId: lobbyId,
    })
  }

  const resJoin = await fetch(url, data)
  const joinPayload = await resJoin.json()

  if (resJoin.status === 200) {
    type = JOINED_LOBBY
    socketIoCommands.matchUp({ lobbyData: joinPayload })
  }
  else type = ERROR_MULTIPLAYER

  dispatch({ type, payload: joinPayload })
}

export default joinGame
