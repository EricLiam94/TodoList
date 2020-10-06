import React from 'react'
import { motion } from "framer-motion"
import style from "./dashboard.module.scss"

const NewItem = ({ toggle }) => {
    const clickHandler = (e) => {
        e.stopPropagation()
    }

    return (
        <motion.div
            onClick={toggle}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            key="newItem"
            className={style.itemContainer}>

            <motion.div
                onClick={clickHandler}
                className={style.itemContent}

            > abcsd</motion.div>
        </motion.div>
    )
}

export default NewItem
