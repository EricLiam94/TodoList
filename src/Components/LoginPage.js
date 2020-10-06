import React from 'react'
import Button from '@material-ui/core/Button';
import { useDispatch } from "react-redux"
import { login } from "../actions/auth"
const LoginPage = () => {
    const dispatch = useDispatch()
    const handleClick = (e) => {
        dispatch(login())
    }

    return (
        <div style={{
            width: "100vw", height: "calc( 100vh - 48px )"
            , display: "flex", alignItems: "center", justifyContent: "center"
            , fontFamily: "monospace", flexDirection: "column"
        }}>
            <h2> Login is required </h2>
            <Button
                style={{ margin: "50px" }}
                onClick={handleClick}
                variant="contained"
                color="primary">
                Login
            </Button>
        </div>
    )
}

export default LoginPage
