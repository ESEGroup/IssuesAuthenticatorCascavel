import {
  CREDENTIALS_USER_ID_CHANGED,
  CREDENTIALS_EMAIL_CHANGED,
  FETCH_USER_PENDING,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAIL,
  CREDENTIALS_INVALID_EMAIL,
  CREDENTIALS_INVALID_USER_ID
} from './types'

import API from '../api'

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

    return API.fetchUser({ userId, email })
      .then(res => res.json())
      .then(res => {
        if (res.erro) {
          validateUserFail(dispatch, res.erro)

          return Promise.reject(new Error('issues-failed'))
        }

        validateUserSuccess(dispatch, res)
        return Promise.resolve('done')
      })
      .catch((e) => {
        if (e.message !== 'issues-failed') {
          validateUserFail(dispatch, 'Ocorreu um erro inesperado.')
        }

        return Promise.reject(new Error('failed'))
      })
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

const validateUserSuccess = (dispatch, user) => {
  dispatch({ type: FETCH_USER_SUCCESS, payload: user })
}

const validateUserFail = (dispatch, error) => {
  dispatch({ type: FETCH_USER_FAIL, payload: error })
}
