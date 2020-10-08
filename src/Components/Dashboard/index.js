import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from "react-redux"
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion"
import { auth, db } from "../../Firebase"
import LoginPage from "../LoginPage"
import style from "./dashboard.module.scss"
import Button from '@material-ui/core/Button';
import NewItem from "./NewItem"
import CardContainer from "./CardContainer"
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
    const [todo, setTodo] = useState([])
    const [doing, setDoing] = useState([])
    const [done, setDone] = useState([])
    const [backlog, setBacklog] = useState([])
    const [key, setkey] = useState("")

    const inputRef = useRef(null)

    const deleteItem = (type, id) => {
        console.log(id)
        db.ref(`list/${auth.currentUser.uid}/${type}/${id}`).remove();
    }

    useEffect(() => {
        const temp = () => {
            if (auth.currentUser) {
                const listMap = {
                    "todo": setTodo,
                    "doing": setDoing,
                    "done": setDone,
                    "backlog": setBacklog
                }
                for (let type in listMap) {
                    db.ref(`list/${auth.currentUser.uid}/${type}/`)
                        .on("value", snapshot => {
                            let temp = []
                            snapshot.forEach(snap => {
                                temp.push(snap.val())
                            });
                            listMap[type](temp)
                        });
                }
            }
        }
        temp()
    }, [isLoggin])


    if (!isLoggin) return <LoginPage></LoginPage>
    const toggle = (e) => {
        e.preventDefault()
        setShow(!isShow)
    }

    const filter = (list) => (key && key.length > 0) ? list.filter((r) => JSON.stringify(r).toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1) : list


    const searchByKey = () => {
        console.log("key", inputRef.current.value)
        setkey(inputRef.current.value)

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
                        <input className={style.searchBar}
                            ref={inputRef}
                            placeholder="Search here" type="text" />
                        <Button
                            style={{ marginLeft: "-100px" }}
                            variant="contained"
                            onClick={searchByKey}
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
                    <CardContainer type="todo" list={filter(todo)} deleteItem={deleteItem} />
                    <CardContainer type="doing" list={filter(doing)} deleteItem={deleteItem} />
                    <CardContainer type="done" list={filter(done)} deleteItem={deleteItem} />
                    <CardContainer type="backlog" list={filter(backlog)} deleteItem={deleteItem} />
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
