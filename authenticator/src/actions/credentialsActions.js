import {
  CREDENTIALS_USER_ID_CHANGED,
  CREDENTIALS_EMAIL_CHANGED,
  FETCH_USER_PENDING,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAIL,
  CREDENTIALS_INVALID_EMAIL,
  CREDENTIALS_INVALID_USER_ID,
  CREDENTIALS_FETCHED_INITIAL_STATE,
  CREDENTIALS_FETCH_INITIAL_STATE,
  USER_STATE
} from './types'

import { getFromStorage } from '../utils'
import { SERVER_URL } from '../config'

export const userIdChanged = text => {
  return { type: CREDENTIALS_USER_ID_CHANGED, payload: text }
}

export const emailChanged = text => {
  return {
    type: CREDENTIALS_EMAIL_CHANGED,
    payload: text
  }
}

export const validateUser = ({ userId, email }) => {
  return dispatch => {
    dispatch({ type: FETCH_USER_PENDING })

    fetch(`${SERVER_URL}/validar_usuario_authenticator`, {
      method: 'POST',
      body: JSON.stringify({
        userId,
        email
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    })
      .then(res => res.json())
      .then(res => {
        if (res.erro) {
          return validateUserFail(dispatch, res.erro)
        }

        return validateUserSuccess(dispatch, res)
      })
      .catch(() => validateUserFail(dispatch, 'Ocorreu um erro inesperado.'))
  }
}

export const invalidEmail = () => ({
  type: CREDENTIALS_INVALID_EMAIL,
  payload: 'Endereço de email inválido.'
})

export const invalidUserId = () => ({
  type: CREDENTIALS_INVALID_USER_ID,
  payload: 'Identificador inválido.'
})

export const getInitialState = () => {
  return dispatch => {
    dispatch({
      type: CREDENTIALS_FETCH_INITIAL_STATE
    })

    getFromStorage(USER_STATE)
      .then(user =>
        dispatch({
          type: CREDENTIALS_FETCHED_INITIAL_STATE,
          payload: user
        })
      )
      .catch(() => {
        dispatch({ type: CREDENTIALS_FETCHED_INITIAL_STATE, payload: null })
      })
  }
}

const validateUserSuccess = (dispatch, user) => {
  dispatch({ type: FETCH_USER_SUCCESS, payload: user })
}

const validateUserFail = (dispatch, error) => {
  dispatch({ type: FETCH_USER_FAIL, payload: error })
}
