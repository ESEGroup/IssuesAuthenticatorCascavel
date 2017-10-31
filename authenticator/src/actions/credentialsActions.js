import {
  CREDENTIALS_USER_ID_CHANGED,
  CREDENTIALS_EMAIL_CHANGED,
  CREDENTIALS_PENDING,
  CREDENTIALS_SUCCESS,
  CREDENTIALS_FAIL,
  CREDENTIALS_INVALID_EMAIL,
  CREDENTIALS_INVALID_USER_ID
} from './types'

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
    dispatch({ type: CREDENTIALS_PENDING })

    fetch('http://192.168.0.101:8080/validar_usuario_authenticator', {
      method: 'POST',
      body: JSON.stringify({
        user_id: userId,
        email: email
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

const validateUserSuccess = (dispatch, user) => {
  dispatch({ type: CREDENTIALS_SUCCESS, payload: user })
}

const validateUserFail = (dispatch, error) => {
  dispatch({ type: CREDENTIALS_FAIL, payload: error })
}
