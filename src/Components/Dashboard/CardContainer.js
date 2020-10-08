import React, { useRef } from 'react'
import style from "./dashboard.module.scss"

import Card from "./Card"
const CardContainer = ({ list, deleteItem, type }) => {
    const ref = useRef()

    return (
        <div className={style.mainContainer}
            ref={ref}>
            <h2 style={{ textTransform: "capitalize" }}> {type}</h2>

            <div className={style.content}>
                {list.map(item =>
                    <Card
                        width={ref.current?.getBoundingClientRect().width}
                        key={item.id}
                        item={item}
                        type={type}
                        deleteItem={() => deleteItem(type, item.id)} />
                )}
            </div>

        </div>
    )
}

export default CardContainer
