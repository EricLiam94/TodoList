import React, { useState } from 'react'
import { useSelector } from "react-redux"
import { motion, AnimatePresence } from "framer-motion"
import LoginPage from "../LoginPage"
import style from "./dashboard.module.scss"
import Button from '@material-ui/core/Button';
import Card from "./Card"
import NewItem from "./NewItem"


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
    const auth = useSelector(state => state.auth.isLoggin)

    const [isShow, setShow] = useState(false)
    if (!auth) return <LoginPage></LoginPage>
    const toggle = (e) => {
        e.preventDefault()
        setShow(!isShow)
    }

    return (

        <motion.div
            variants={variants}
            initial="hidden"
            animate="show"
            exit="hidden"

            className={style.container}>


            <motion.div
                variants={itemAni}
                className={style.inputField}  >
                <h1 style={{ flexGrow: 1 }}>Board</h1>
                <div style={{ flexGrow: 3 }} >
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
                        <Card title="abc" time="2020-10-15" priority="medium" tags={["abc", "bcd", "qwe"]} />
                        <Card title="abc" time="2020-10-15" priority="low" tags={["abc", "bcd", "qwe"]} />

                    </div>
                </div>
                <div className={style.mainContainer} >
                    <h2> Doing</h2>
                    <div className={style.content}>
                        <Card title="abc" time="2020-10-15" tags={["abc", "bcd", "qwe"]} />
                        <Card title="abc" time="2020-10-15" priority="high" tags={["abc", "bcd", "qwe"]} />

                    </div>
                </div>
                <div className={style.mainContainer} >
                    <h2> Done</h2>
                    <div className={style.content}>
                        <Card title="abc" time="2020-10-15" priority="high" tags={["Social", "Life", "Work"]} />
                        <Card title="abc" time="2020-10-15" priority="high" tags={["Social", "Life", "Work"]} />
                        <Card title="abc" time="2020-10-15" priority="high" tags={["Social", "Life", "Work"]} />
                        <Card title="abc" time="2020-10-15" priority="high" tags={["Social", "Life", "Work"]} />
                    </div>
                </div>
                <div className={style.mainContainer} >
                    <h2> Backlog</h2>
                    <div className={style.content}>  <Card title="abc" time="2020-10-15" priority="high" tags={["abc", "bcd", "qwe"]} />
                        <Card title="abc" time="2020-10-15" priority="high" tags={["abc", "bcd", "qwe"]} />
                    </div>
                </div>
            </motion.div>
            <AnimatePresence >
                {isShow && <NewItem toggle={toggle} />}

            </AnimatePresence>

        </motion.div >

    )
}

export default Dashboard
