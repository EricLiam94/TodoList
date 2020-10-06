
import React, { useEffect } from 'react'
import style from "./index.module.scss"

import { motion } from "framer-motion"
import firebase from "firebase"
import { login, setUser, logout } from "../../actions/auth"
import { useDispatch, useSelector } from "react-redux"
import { withRouter } from "react-router-dom"
const Header = ({ history }) => {
    const currentUser = useSelector(state => state.auth.user)
    const dispatch = useDispatch()
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            console.log(user)
            dispatch(setUser(user))
        })
    })

    const logoutHandler = async (e) => {
        e.preventDefault()
        dispatch(logout())
    }
    return (
        <motion.div
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ type: "ease", delay: 0.5 }}

            style={{
                display: "flex",
                alignItems: "center", justifyContent: "space-between",
                height: "56px", "background": "#212121",
                color: "white",
                padding: "0 40px",
                paddingLeft: "100px"
            }}>
            <span style={{ textDecoration: "none", cursor: "pointer" }} onClick={() => history.push("/")}   > <h3 style={{ color: "white", textDecoration: "none" }}>Ericode</h3> </span>

            <div className={style.menu}>

                {currentUser ?
                    <UserItem logoutHandler={logoutHandler} imgSrc={currentUser.photoURL} history={history} /> :
                    <motion.span
                        key="in"
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 50, opacity: 0 }}
                        className={style.item}
                        onClick={() => dispatch(login())}
                    >Login</motion.span>

                }

                <span className={style.item} onClick={() => history.push("/about")} > About</span>

            </div>




        </motion.div>
    )
}


const UserItem = ({ logoutHandler, imgSrc, history }) => {
    return (
        <motion.div initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className={style.userItem}>
            <img src={imgSrc} style={{ width: "30px", height: "30px", borderRadius: "50%" }} alt="user img" />
            <span className={style.item}
                onClick={logoutHandler}
            >Log out </span>

            <span className={style.item} onClick={() => history.push("/dashboard")} > Board</span>
        </motion.div>
    )
}

export default withRouter(Header)
