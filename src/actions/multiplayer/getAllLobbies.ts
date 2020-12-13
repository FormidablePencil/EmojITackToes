import { ERROR_MULTIPLAYER, QUERIED_ALL_AVAILABLE_LOBBIES } from "../types"

const getAllLobbies = () => async dispatch => {
  let url = 'https://tick-tack-toes.herokuapp.com/lobby/available'
  const resAllLobbies = await fetch(url)
  // console.log(resAllLobbies, 'resAllLobbies')
  const dataAllLobbies = await resAllLobbies.json()
  if (resAllLobbies.status === 400) {
    dispatch({ type: ERROR_MULTIPLAYER, dataAllLobbies })
  } else {
    dispatch({ type: QUERIED_ALL_AVAILABLE_LOBBIES, payload: dataAllLobbies })
  }
}

export default getAllLobbies