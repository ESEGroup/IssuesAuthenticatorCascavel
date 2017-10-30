import {
  CREDENTIALS_USER_ID_CHANGED,
  CREDENTIALS_EMAIL_CHANGED,
  CREDENTIALS_PENDING,
  CREDENTIALS_SUCCESS,
  CREDENTIALS_FAIL
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

    fetch('http://localhost:8080/validar_usuario_authenticator', {
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
      .then(console.log)
      .catch(console.log)
  }
}
