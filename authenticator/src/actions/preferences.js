import {
  PREFERENCES_SEND_PENDING,
  PREFERENCES_SEND_SUCCESS,
  PREFERENCES_SEND_FAIL,
  PREFERENCES_TEMP_CHANGE,
  PREFERENCES_UMID_CHANGE,
  PREFERENCES_INITIAL_STATE
} from './types'

import API from '../api'

export const preferencesTempChanged = temp => {
  return { type: PREFERENCES_TEMP_CHANGE, payload: temp }
}

export const preferencesUmidChanged = umid => {
  return { type: PREFERENCES_UMID_CHANGE, payload: umid }
}

export const preferencesInitialState = preferences => {
  return { type: PREFERENCES_INITIAL_STATE, payload: preferences }
}

export const registerUserPreferences = ({ userId, email, tempMin, tempMax, umidMin, umidMax }) => {
  return dispatch => {
    dispatch({ type: PREFERENCES_SEND_PENDING })

    return API.registerPreferences({ userId, email, tempMin, tempMax, umidMin, umidMax })
      .then(res => res.json())
      .then(res => {
        if (res.erro) {
          registerPreferencesFail(dispatch, res.erro)

          return Promise.reject(new Error('failed'))
        }

        return Promise.resolve('done')
      })
      .catch(() => {
        registerPreferencesFail(dispatch, 'Ocorreu um erro inesperado.')

        return Promise.reject(new Error('failed'))
      })
  }
}

export const registerPreferencesSuccess = () => {
  return { type: PREFERENCES_SEND_SUCCESS }
}

const registerPreferencesFail = (dispatch, error) => {
  dispatch({ type: PREFERENCES_SEND_FAIL, payload: error })
}
