import { LEAVE_LOBBY } from "../types"

const leaveLobby = lobbyId => async dispatch => {
  const url = 'http://10.0.0.7:4005/lobby'
  const data = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      lobbyId,
    })
  }
  const fetchedData = await fetch(url, data)

  dispatch({ type: LEAVE_LOBBY })
}

export default leaveLobby
