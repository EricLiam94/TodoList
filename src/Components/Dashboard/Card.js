import React from 'react'
import style from "./dashboard.module.scss"
import { motion } from "framer-motion"

const Card = ({ title, tags, time, priority }) => {
    return (
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{
                y: 0, opacity: 1,
                transition: { delay: 0.5, duration: 1 }
            }}
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={1}
            whileHover={{ scale: 1.1, opacity: 0.8 }}
            layout
            exit={{ opacity: 0 }}
            className={style.card}>
            <div className={style.betweenContainer}>
                <h4 className={style.title}> {title} </h4>
                <span className={style.priority + " " + style[priority?.toLowerCase()]} />
            </div>
            <div>{tags.map(tag => <span className={style.tag} key={tag} > {tag}</span>)}</div>

            <div className={style.betweenContainer}><h5 className={style.time}> {time}</h5>
                <i className={"fas fa-trash-alt " + style.icon} />  </div>
        </motion.div>
    )
}



export default Card