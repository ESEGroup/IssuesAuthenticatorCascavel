import {
  USER_AUTH_PENDING,
  USER_AUTH_ENTER_SUCCESS,
  USER_AUTH_ENTER_FAIL,
  USER_AUTH_LEAVE_SUCCESS,
  USER_AUTH_LEAVE_FAIL,
  USER_AUTH_CHANGE_SELECTED_LAB,
  USER_AUTH_STATE_DELETE
} from './types'

import { SERVER_URL } from '../config'

export const registerUserEnter = (userId, labId) => {
  return dispatch => {
    dispatch({ type: USER_AUTH_PENDING })

    fetch(`${SERVER_URL}/registrar_entrada_authenticator`, {
      method: 'POST',
      body: JSON.stringify({
        userId,
        labId
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    })
      .then(res => res.json())
      .then(res => {
        if (res.erro) {
          return userRegisterFail(dispatch, USER_AUTH_ENTER_FAIL)
        }

        return userRegisterSuccess(dispatch, USER_AUTH_ENTER_SUCCESS)
      })
      .catch(() => userRegisterFail(dispatch, USER_AUTH_ENTER_FAIL))
  }
}

export const registerUserLeave = (userId, labId) => {
  return dispatch => {
    dispatch({ type: USER_AUTH_PENDING })

    fetch(`${SERVER_URL}/registrar_saida_authenticator`, {
      method: 'POST',
      body: JSON.stringify({
        userId,
        labId
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    })
      .then(res => {
        if (res.erro) {
          return userRegisterFail(dispatch, USER_AUTH_LEAVE_FAIL)
        }

        return userRegisterSuccess(dispatch, USER_AUTH_LEAVE_SUCCESS)
      })
      .catch(() => userRegisterFail(dispatch, USER_AUTH_LEAVE_FAIL))
  }
}

export const changeSelectedLab = labId => {
  return {
    type: USER_AUTH_CHANGE_SELECTED_LAB,
    payload: labId
  }
}

export const deleteUserInfo = () => {
  return { type: USER_AUTH_STATE_DELETE }
}

const userRegisterSuccess = (dispatch, type) => {
  dispatch({ type })
}

const userRegisterFail = (dispatch, type) => {
  dispatch({ type })
}
