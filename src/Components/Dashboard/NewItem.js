import React, { useState } from 'react'
import { motion } from "framer-motion"
import style from "./dashboard.module.scss"
import { db, auth } from "../../Firebase"
import Button from '@material-ui/core/Button';
import Priority from "./Priority"
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import tags from "./constant"

const NewItem = ({ toggle }) => {
    const [item, setitem] = useState({
        id: uuidv4(), priority: "high", tags: [],
        title: "To do", time: new Date().toISOString().substring(0, 10)
    })
    const clickHandler = (e) => {
        e.stopPropagation()
    }

    const submitItem = (e) => {
        db.ref(`list/${auth.currentUser.uid}/todo/${item.id}`)
            .set(item)
            .then(
                () => {
                    toast("Successusful!");
                    toggle(e)
                }

            )
            .catch(() => toast("Something wrong during creating new Item!"))
    }

    const handleTags = (e) => {
        let tag = e.target.innerHTML.trim();
        let tags = item.tags;
        tags.includes(tag) ? setitem({ ...item, tags: tags.filter(x => x !== tag) }) : setitem({ ...item, tag: tags.unshift(tag) })

    }



    return (
        <motion.div
            onClick={toggle}
            initial={{ opacity: 0, x: 1000, scale: 0 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 1005, scale: 0 }}
            key="newItem"
            className={style.itemContainer}>

            <motion.div
                onClick={clickHandler}
                className={style.itemContent}

            >
                <div className={style.betweenContainer}>   <h2 >  New Item  </h2>
                    <motion.svg
                        onClick={toggle}
                        width={30} height={30}

                        className={style.close}

                        stroke="white" strokeWidth="5" fill="red"
                        viewBox="0 0 60 60">
                        <circle cx="30" cy="30" r="25" stroke="none"  ></circle>
                        <path d="M 20 20 L 40 40  "></path>
                        <path d="M 20 40 L 40 20 " ></path>
                    </motion.svg></div>
                <div className={style.divider} />
                <div className={style.betweenContainer} style={{ margin: "15px 5px" }}>
                    <input type="text" placeholder="Title"
                        onChange={(e) => { setitem({ ...item, title: e.target.value }) }}
                        className={style.titleInput} />


                </div>
                <div className={style.betweenContainer} style={{ flexGrow: 1 }}>
                    <h3 style={{ display: "inline" }}>Priority</h3>

                    <Priority
                        selected={item.priority}
                        setSelected={(p) => { setitem({ ...item, priority: p }) }}
                    /></div>


                <h3 style={{ margin: "20px 0px" }}>Tags</h3>
                <div>
                    {tags.map(tag => (
                        <span key={tag.name}
                            className={style.tag + " " + (item.tags.includes(tag.name) ? style.highlight : null)}
                            onClick={handleTags}
                            style={{ backgroundColor: tag.color }}> {tag.name}</span>
                    )
                    )}
                </div>


                <Button
                    style={{ margin: "20px  0 20px auto", display: "block" }}
                    variant="contained"
                    onClick={submitItem}
                    color="primary">
                    Create </Button>

            </motion.div>

        </motion.div>
    )
}

export default NewItem
