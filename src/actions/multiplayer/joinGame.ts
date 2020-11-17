import { ERROR_MULTIPLAYER, JOINED_LOBBY } from "../types";

const joinGame = (payload) => async dispatch => {
  console.log('joinGame');
  let type
  let url = 'http://10.0.0.7:4005/lobby/join'
  let data = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: payload.username,
      lobbyId: payload.lobbyId,
    })
  }
  console.log(data);

  const resJoin = await fetch(url, data)
  const joinPayload = await resJoin.json()

  console.log(resJoin);
  if (resJoin.status === 202)
    type = JOINED_LOBBY
  else type = ERROR_MULTIPLAYER

  dispatch({ type, payload: joinPayload })
}

export default joinGame
