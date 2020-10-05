
import { LOGIN, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, USER_CHANGE } from "../actions/types"

const initialState = {
    user: null,
    isLoggin: false,
    loading: false,
    error: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return { ...state, loading: true, error: null }
        case LOGIN_SUCCESS:
            return { ...state, loading: false, user: action.payload.user, isLoggin: true, error: null }
        case LOGIN_FAIL:
            return { ...state, loading: false, user: null, isLoggin: false, error: action.payload.error }
        case LOGOUT:
            return {
                user: null,
                isLoggin: false,
                loading: false,
                error: null
            }
        case USER_CHANGE:
            return { ...state, user: action.payload }
        default:
            return state
    }
}