import { socket } from "../../socket.io/useSocketIo";
import { ERROR_MULTIPLAYER, JOINED_LOBBY } from "../types";

const joinGame = ({ username, lobbyId }) => async dispatch => {
  // console.log('joinGame');
  let type
  let url = 'http://10.0.0.7:4005/lobby/join'
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
    socket.emit('multiplayer', { lobbyData: joinPayload, action: 'match up' })
  }
  else type = ERROR_MULTIPLAYER

  dispatch({ type, payload: joinPayload })
}

export default joinGame
