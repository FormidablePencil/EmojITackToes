import { ERROR_MULTIPLAYER, LOBBY_HOSTED, TOGGLE_USERNAME_POPUP_TOOLTIP } from "../types";

const hostGame = (username) => async dispatch => {
  let url = 'http://10.0.0.7:4005/lobby/host'
  let data = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username })
  }

  const hostRes = await fetch(url, data)

  if (hostRes.status === 200) {
    const hostPayload = await hostRes.json()
    dispatch({ type: LOBBY_HOSTED, payload: hostPayload })
  } else if (hostRes.status === 400)
    dispatch({ type: TOGGLE_USERNAME_POPUP_TOOLTIP })
}

export default hostGame
