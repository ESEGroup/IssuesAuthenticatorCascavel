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

import API from '../api'

export const registerUserEnter = (userId, labId) => {
  return dispatch => {
    dispatch({ type: USER_AUTH_ENTER_PENDING })

    return API.registerEnter({ userId, labId })
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

        return Promise.reject(new Error('failed'))
      })
  }
}

export const registerUserLeave = (userId, labId) => {
  return dispatch => {
    dispatch({ type: USER_AUTH_LEAVE_PENDING })

    return API.registerExit({ userId, labId })
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

        return Promise.reject(new Error('failed'))
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
