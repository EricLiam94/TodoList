import React from 'react'
import { motion } from "framer-motion"
import style from "./style.module.scss"

const variants = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1, transition: {
            staggerChildren: 0.5
        }
    },
    exit: { opacity: 0 }

}

const childAnimate = {
    initial: { opacity: 0, y: 50 },
    animate: {
        opacity: 1
        ,
        y: 0
    },
}

const About = () => {

    return (
        <motion.div
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={style.container}
        >
            <motion.h2
                variants={childAnimate}
            >About</motion.h2>
            <motion.div
                variants={childAnimate}
            >
                <h4> This to do list is developed by eric from scratch. <br></br>
            You can drag and drop to manipulate your tasks as will.  <br></br>
            Searching is enabled for convinence purpose.  <br></br>
            Currently only google account is accepted.  </h4>
            </motion.div>
            <motion.div
                variants={childAnimate}
            >
                <h2>Tech stack</h2>
                <ul>
                    <motion.li variants={childAnimate} > <h3> React </h3></motion.li>
                    <motion.li variants={childAnimate}> <h3> Framer-motion </h3></motion.li>
                    <motion.li variants={childAnimate}> <h3> SCSS </h3></motion.li>
                    <motion.li variants={childAnimate}> <h3> React-router-dom </h3></motion.li>
                    <motion.li variants={childAnimate}> <h3> Redux </h3></motion.li>
                    <motion.li variants={childAnimate}> <h3> Firebase </h3></motion.li>
                </ul>
            </motion.div>

            <motion.div variants={childAnimate} >
                Github: https://github.com/EricLiam94/TodoList</motion.div>
        </motion.div>
    )
}

export default About
