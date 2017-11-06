import {
  USER_AUTH_ENTER_PENDING,
  USER_AUTH_ENTER_SUCCESS,
  USER_AUTH_ENTER_FAIL,
  USER_AUTH_LEAVE_PENDING,
  USER_AUTH_LEAVE_SUCCESS,
  USER_AUTH_LEAVE_FAIL,
  USER_AUTH_CHANGE_SELECTED_LAB,
  USER_AUTH_STATE_DELETE
} from './types'

import { SERVER_URL } from '../config'

export const registerUserEnter = (userId, labId) => {
  return dispatch => {
    dispatch({ type: USER_AUTH_ENTER_PENDING })

    return fetch(`${SERVER_URL}/registrar_entrada_authenticator`, {
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
          userRegisterFail(dispatch, USER_AUTH_ENTER_FAIL, labId)
        }

        userRegisterSuccess(dispatch, USER_AUTH_ENTER_SUCCESS, labId)

        return Promise.resolve('done')
      })
      .catch(() => {
        userRegisterFail(dispatch, USER_AUTH_ENTER_FAIL, labId)

        return Promise.resolve('done')
      })
  }
}

export const registerUserLeave = (userId, labId) => {
  return dispatch => {
    dispatch({ type: USER_AUTH_LEAVE_PENDING })

    return fetch(`${SERVER_URL}/registrar_saida_authenticator`, {
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
          userRegisterFail(dispatch, USER_AUTH_LEAVE_FAIL, labId)
        }

        userRegisterSuccess(dispatch, USER_AUTH_LEAVE_SUCCESS, labId)
        return Promise.resolve('done')
      })
      .catch(() => {
        userRegisterFail(dispatch, USER_AUTH_LEAVE_FAIL, labId)

        return Promise.resolve('done')
      })
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

const userRegisterSuccess = (dispatch, type, payload) => {
  dispatch({ type, payload })
}

const userRegisterFail = (dispatch, type, payload) => {
  dispatch({ type, payload })
}
