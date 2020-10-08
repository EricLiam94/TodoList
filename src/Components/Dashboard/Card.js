import React from 'react'
import style from "./dashboard.module.scss"
import { motion } from "framer-motion"
import { colorMap } from "./constant"
import { constMoveToNext, dragTo } from "./moveTo"

const variants = {
    hidden: { y: 50, opacity: 0 },
    show: {
        y: 0, opacity: 1,
        transition: { delay: 0.2, duration: 0.5 }
    }
}

const Card = ({ item, deleteItem, type, width }) => {

    const { title, tags, time, priority } = item;

    const handleDrag = (e, info) => {
        console.log(info)
        dragTo(width, info.offset.x, type, item)
    }

    return (
        <motion.div
            variants={variants}
            drag
            layoutId={item.id}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={1}
            onDragEnd={handleDrag}
            whileHover={{ scale: 1.1, opacity: 0.8 }}
            layout
            exit={{ opacity: 0 }}
            className={style.card}>
            <div className={style.betweenContainer}>
                <h4 className={style.title}> {title} </h4>
                <span className={style.priority + " " + style[priority?.toLowerCase()]} />
            </div>
            <div>{tags && tags.map(tag => <span className={style.tag}
                style={{ backgroundColor: colorMap[tag] }}
                key={tag} > {tag}</span>)}</div>

            <div className={style.betweenContainer}><h5 className={style.time}> {time}</h5>
                <span>
                    {type !== "backlog" && <i className={"fas fa-arrow-right  " + style.icon}
                        onClick={() => constMoveToNext(item, type)}
                    ></i>}
                    <i className={"fas fa-trash-alt " + style.icon}
                        onClick={deleteItem}

                    /></span>  </div>
        </motion.div>
    )
}



export default Card
