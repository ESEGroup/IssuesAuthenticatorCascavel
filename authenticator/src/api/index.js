import { SERVER_URL } from '../config'

const fetchUser = ({ userId, email }) =>
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

const registerExit = ({ userId, labId }) =>
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

const registerEnter = ({ userId, labId }) =>
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

const updatePreferences = ({ userId, email, tempMin, tempMax, umidMin, umidMax }) =>
  fetch(`${SERVER_URL}/atualizar_preferencias_authenticator`, {
    method: 'POST',
    body: JSON.stringify({
      userId,
      email,
      tempMin,
      tempMax,
      umidMin,
      umidMax
    }),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin'
  })

export default {
  fetchUser,
  registerEnter,
  registerExit,
  updatePreferences
}
