import { signInWithGoogle } from "../Firebase"
import { LOGIN, LOGIN_SUCCESS, LOGIN_FAIL, USER_CHANGE } from "./types"
export const login = () => async (dispatch) => {
    console.log("acc")
    try {
        dispatch({ type: LOGIN })
        let user = await signInWithGoogle()
        if (user)
            dispatch({ type: LOGIN_SUCCESS, payload: { user } })
    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: { error } })
    }
}

export const setUser = (user) => {
    return {
        type: USER_CHANGE,
        payload: user
    }
}