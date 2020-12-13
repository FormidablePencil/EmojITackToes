import { LEAVE_LOBBY } from "../types"

const leaveLobby = lobbyId => async dispatch => {
  const url = 'https://tick-tack-toes.herokuapp.com/lobby'
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
