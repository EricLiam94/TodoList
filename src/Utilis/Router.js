import React from 'react'
import {
    Switch,
    Route, useLocation
} from "react-router-dom";
import { AnimatePresence } from "framer-motion"
import Home from "../Components/Home"
import DashBoard from "../Components/Dashboard"
import About from "../Components/About"

const Router = () => {
    const location = useLocation()
    return (
        <AnimatePresence exitBeforeEnter>
            <Switch location={location} key={location.pathname}>
                <Route
                    exact
                    path='/dashboard'
                    render={() => <DashBoard />}
                />
                <Route
                    exact
                    path='/about'
                    render={() => <About />}
                />

                <Route
                    path='/'
                    render={() => <Home />}
                />

            </Switch>
        </AnimatePresence>
    )
}

export default Router
