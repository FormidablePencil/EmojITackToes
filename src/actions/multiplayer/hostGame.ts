import { LOBBY_HOSTED, TOGGLE_USERNAME_POPUP_TOOLTIP } from "../types";

const hostGame = (username) => async dispatch => {
  let url = 'https://emojitacktoes-server.wm.r.appspot.com/lobby/host'
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
