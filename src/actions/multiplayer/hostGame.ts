import { ERROR_MULTIPLAYER, LOBBY_HOSTED } from "../types";

const hostGame = (username) => async dispatch => {
  let type
  let url = 'http://10.0.0.7:4005/lobby/host'
  let data = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username })
  }

  const hostRes = await fetch(url, data)
  const hostPayload = await hostRes.json()

  if (hostRes.status === 200)
    type = LOBBY_HOSTED
  else type = ERROR_MULTIPLAYER

  dispatch({ type, payload: hostPayload })
}

export default hostGame
