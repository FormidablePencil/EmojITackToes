import { REGISTERED, LOGGED_IN, SAVE_FETCHED_USER_DATA } from "./types"
import { validateInputs, AuthValidationResponses } from "../logic/validateInputFormats"
import { ControlledInputsTypes } from '../components/authComponents/AuthsCompToRender'

export enum AuthActionResponses {
  register_form_validation_failed = 'registration form validation failed',
  successfully_registered = 'successfully registered',
  username_field_empty = 'username field is empty',
  password_field_empty = 'password field is empty',
  login_form_validation_failed = 'login form validation failed',
  user_exists_by_username = 'user already exists',
  user_exists_by_email = 'user exists by email',
  successfully_registered_in = 'successfully signed up in',
  successfully_logged_in = 'successfully logged in',
} //there are two enums with multiple repeating responses because the AuthActionResponses is the data that's going to be see by the user and should be easily modifed if there was a need to change there
export enum serverAuthResponses {
  username_field_empty = 'username field is empty',
  password_field_empty = 'password field is empty',
  user_exists_by_username = 'account by that username exists',
  user_exists_by_email = 'account by that email exists',
  successfully_registered_in = 'successfully signed up in',
  successfully_logged_in = 'successfully logged in'
}



export const registerAction = (controlledInputs: ControlledInputsTypes) => async (dispatch) => {
  const returnedValidation = validateInputs({
    username: controlledInputs.username,
    password: controlledInputs.password,
    email: controlledInputs.email
  })
  if (
    returnedValidation.username[0] ||
    returnedValidation.password[0] ||
    !returnedValidation.email
  ) return { type: AuthActionResponses.register_form_validation_failed, payload: returnedValidation }
  const request = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: controlledInputs.username,
      password: controlledInputs.password,
      email: controlledInputs.email
    })
  }
  const fetchedData = await fetch('http://10.0.0.6:4003/auth/register', request)
  const { accessToken, refreshToken, message, username, email } = await fetchedData.json()
  if (accessToken && refreshToken) {
    console.log("logged in")
    dispatch({ type: REGISTERED, payload: { accessToken, refreshToken, username, email } })
    return { type: AuthActionResponses.successfully_registered }
  } else {
    console.log("00")
    console.log(message)
    if (message === serverAuthResponses.user_exists_by_username) {
      console.log("1")
      return { type: AuthActionResponses.user_exists_by_email }
    }
    if (message === serverAuthResponses.user_exists_by_email) {
      console.log("2")
      return { type: AuthActionResponses.user_exists_by_email }
    }
  }
}




export const loginAction = (controlledInputs: ControlledInputsTypes) => async (dispatch) => {
  const returnedValidation = validateInputs({
    username: controlledInputs.username,
    password: controlledInputs.password,
    email: controlledInputs.email
  })
  if (returnedValidation.username[0] || returnedValidation.password[0]) {
    return { type: AuthActionResponses.login_form_validation_failed, payload: returnedValidation }
  }
  const request = {
    method: 'post',
    headers: { 'Content-Type': 'application/json', },
    body: JSON.stringify({
      username: controlledInputs.username,
      password: controlledInputs.password,
    })
  }
  const fetchedData = await fetch('http://10.0.0.6:4003/auth/login', request)
  const { accessToken, refreshToken, username, email, message } = await fetchedData.json()

  if (accessToken && refreshToken) {
    dispatch({ type: LOGGED_IN, payload: { accessToken, refreshToken, username, email } })
    return serverAuthResponses.successfully_logged_in
  } else if (message === serverAuthResponses.user_exists_by_email) {
    return AuthActionResponses.user_exists_by_email
  } else if (message === serverAuthResponses.user_exists_by_username) {
    return AuthActionResponses.user_exists_by_username
  }
}



export const refreshToken = (authData) => async (dispatch) => {
  const request = {
    method: 'post',
    header: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: authData.token })
  }
  const fetchedData = await fetch('http://10.0.0.6:4003/auth/login', request)
  const { userData, message } = await fetchedData.json()
  if (userData) {
    dispatch({ type: FETCHED_USER_DATA, payload: userData })
    return  AuthActionResponses.successfully_retrieved_user_data
  } else {
    console.log(message)
  }
}
