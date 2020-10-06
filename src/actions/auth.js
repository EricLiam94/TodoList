import { signInWithGoogle, auth } from "../Firebase"
import { LOGIN, LOGIN_FAIL, USER_CHANGE, LOGOUT } from "./types"
export const login = () => async (dispatch) => {
    try {
        dispatch({ type: LOGIN })
        let user = await signInWithGoogle()
        if (user)
            dispatch(setUser(user))
        else {
            throw new Error("Login Failed")
        }
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


export const logout = () => async (dispatch) => {
    await auth.signOut()
    dispatch({ type: LOGOUT })
} 