
import React, { useState, useEffect } from 'react'
import style from "./index.module.scss"
import { signInWithGoogle, auth } from "../../Firebase"
import { motion, AnimatePresence } from "framer-motion"
import firebase from "firebase"
import { login, setUser } from "../../actions/auth"
import { useDispatch, useSelector } from "react-redux"
import { withRouter, Link } from "react-router-dom"
const Header = ({ history }) => {

    const currentUser = useSelector(state => state.auth.user)
    const dispatch = useDispatch()
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            dispatch(setUser(user))
        })
    }, [])

    const logout = async (e) => {
        e.preventDefault()
        auth.signOut()
    }
    return (
        <div style={{
            display: "flex",
            alignItems: "center", justifyContent: "space-between",
            height: "56px", "background": "black",
            color: "white",
            padding: "0 40px",
            paddingLeft: "100px"
        }}>
            <Link style={{ textDecoration: "none" }} to="/"> <h3 style={{ color: "white", textDecoration: "none" }}>Ericode</h3> </Link>

            <div className={style.menu}>
                <AnimatePresence exitBeforeEnter initial={false}>
                    {currentUser ?
                        <motion.span className={style.item}
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                            key="out"
                            onClick={logout}
                        >Log out </motion.span> :
                        <motion.span
                            key="in"
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                            className={style.item}
                            onClick={() => dispatch(login())}
                        >Login</motion.span>}
                </AnimatePresence>
                <span className={style.item} onClick={() => history.push("/about")} > About</span>

            </div>




        </div>
    )
}

export default withRouter(Header)
