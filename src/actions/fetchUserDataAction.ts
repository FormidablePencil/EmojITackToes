import { useCardAnimation } from "@react-navigation/stack"
import { FETCHED_USER_DATA } from "./types"
import { AuthActionResponses } from "./authActions"

export enum mainApiResponses {
  successfully_retrieved_user_data = 'successfully retrieved user data'
}

export const fetchUserDataAction = (authData) => async (dispatch) => {
  const request = {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authData.accessToken}`
    }
  }
  const fetchedData = await fetch('http://10.0.0.6:4005/something', request)
  const { userData, message } = await fetchedData.json()
  if (userData) {
    dispatch({ type: FETCHED_USER_DATA, payload: userData })
    return mainApiResponses.successfully_retrieved_user_data
  } else {
    console.log(message)
  }
}
