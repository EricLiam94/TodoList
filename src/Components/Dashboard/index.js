import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux"
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion"
import { auth, db } from "../../Firebase"
import LoginPage from "../LoginPage"
import style from "./dashboard.module.scss"
import Button from '@material-ui/core/Button';
import Card from "./Card"
import NewItem from "./NewItem"

import { ToastContainer } from "react-toastify"
const variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.5
        }
    }

}

const itemAni = {
    hidden: { opacity: 0, y: 50 },
    show: {
        opacity: 1, y: 0

    }

}

const Dashboard = () => {
    const isLoggin = useSelector(state => state.auth.isLoggin)

    const [isShow, setShow] = useState(false)
    const [list, setList] = useState([])
    const deleteItem = (id) => {
        console.log(id)
        db.ref(`list/${auth.currentUser.uid}/todo/${id}`).remove();
    }

    useEffect(() => {
        const temp = () => {
            if (auth.currentUser) {
                db.ref(`list/${auth.currentUser.uid}/todo/`)
                    .on("value", snapshot => {
                        let temp = []
                        snapshot.forEach(snap => {
                            temp.push(snap.val())
                        });
                        setList(temp)
                    });
            }

        }

        temp()


    }, [isLoggin])


    if (!isLoggin) return <LoginPage></LoginPage>
    const toggle = (e) => {
        e.preventDefault()
        setShow(!isShow)
    }



    return (
        <AnimateSharedLayout>

            <motion.div
                variants={variants}
                initial="hidden"
                animate="show"
                exit="hidden"

                className={style.container}>


                <motion.div
                    variants={itemAni}
                    className={style.inputField}  >
                    <h1 className={style.name} >Board</h1>
                    <div className={style.flex3}>
                        <input className={style.searchBar} placeholder="Search here" type="text" />
                        <Button
                            style={{ marginLeft: "-100px" }}
                            variant="contained"
                            color="primary">
                            Search </Button>
                    </div>

                    <motion.svg
                        onClick={toggle}
                        width={30} height={30}

                        className={style.add}
                        stroke="white" strokeWidth="5" fill="#4CAF50"
                        viewBox="0 0 60 60">
                        <circle cx="30" cy="30" r="25" stroke="none"  ></circle>
                        <path d="M 30 15 V 30 45  "></path>
                        <path d="M 15 30 H 45 15 " ></path>
                    </motion.svg>
                </motion.div>
                <motion.div
                    variants={itemAni}
                    className={style.main}>
                    <div className={style.mainContainer}>
                        <h2> Todo</h2>
                        <div className={style.content}>
                            {list.map(item =>
                                <Card title={item.title}
                                    time={item.time}
                                    key={item.id} priority={item.priority}
                                    tags={item.tags} deleteItem={() => deleteItem(item.id)} />
                            )}
                        </div>
                    </div>
                    <div className={style.mainContainer} >
                        <h2> Doing</h2>
                        <div className={style.content}>

                        </div>
                    </div>
                    <div className={style.mainContainer} >
                        <h2> Done</h2>
                        <div className={style.content}>

                        </div>
                    </div>
                    <div className={style.mainContainer} >
                        <h2> Backlog</h2>
                        <div className={style.content}>

                        </div>
                    </div>
                </motion.div>
                <AnimatePresence >
                    {isShow ? <NewItem toggle={toggle} /> : null}

                </AnimatePresence>

            </motion.div >

            <ToastContainer />
        </AnimateSharedLayout>
    )
}

export default Dashboard
