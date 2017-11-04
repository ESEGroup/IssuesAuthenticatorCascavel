import {
  FETCH_USER_SUCCESS,
  USER_AUTH_ENTER_PENDING,
  USER_AUTH_ENTER_SUCCESS,
  USER_AUTH_ENTER_FAIL,
  USER_AUTH_LEAVE_PENDING,
  USER_AUTH_LEAVE_SUCCESS,
  USER_AUTH_LEAVE_FAIL,
  USER_AUTH_CHANGE_SELECTED_LAB,
  USER_AUTH_STATE_DELETE
} from '../actions/types'

const INITIAL_STATE = {
  error: '',
  labs: []
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isInsideLab: action.payload.labs[0].present,
        selectedLabId: action.payload.labs[0].labId
      }

    case USER_AUTH_ENTER_PENDING:
      return { ...state, loadingEnter: true }

    case USER_AUTH_LEAVE_PENDING:
      return { ...state, loadingLeave: true }

    case USER_AUTH_ENTER_SUCCESS:
      return {
        ...state,
        loadingEnter: false,
        labs: state.labs.map(lab => {
          lab.present = lab.labId === state.selectedLabId

          return lab
        })
      }

    case USER_AUTH_LEAVE_SUCCESS:
      return {
        ...state,
        loadingLeave: false,
        labs: state.labs.map(lab => {
          if (lab.labId === state.selectedLabId) {
            lab.present = false
          }

          return lab
        })
      }

    case USER_AUTH_ENTER_FAIL:
      return {
        ...state,
        loadingEnter: false,
        error: 'Ocorreu um erro no registro da entrada.'
      }

    case USER_AUTH_LEAVE_FAIL:
      return {
        ...state,
        loadingLeave: false,
        error: 'Ocorreu um erro no registro da saída.'
      }

    case USER_AUTH_CHANGE_SELECTED_LAB:
      return {
        ...state,
        selectedLabId: action.payload
      }

    case USER_AUTH_STATE_DELETE:
      return { ...INITIAL_STATE }

    default:
      return state
  }
}
