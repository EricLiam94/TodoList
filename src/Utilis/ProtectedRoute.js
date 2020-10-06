import React from 'react'
import { Route } from "react-router-dom"
import LoginPage from "../Components/LoginPage"
// import { useSelector } from "react-redux"
import UseAuth from "../Hooks/UseAuth"
const ProtectedRoute = ({ path, children, render }) => {

    return (
        <Route path={path} render={() => UseAuth.isLoggin ? render : <LoginPage />} >
            {children}
        </Route>
    )
}


export default ProtectedRoute
