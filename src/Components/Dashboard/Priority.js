import React from 'react'
import { motion } from "framer-motion";
import style from "./dashboard.module.scss"


const Priority = ({ selected, setSelected }) => {
    return (
        // <AnimateSharedLayout>
        <ul className={style.ul}>
            {Object.keys(colorMap).map(p => (
                <Item
                    key={colorMap[p]}
                    color={colorMap[p]}
                    isSelected={selected === p}
                    onClick={() => setSelected(p)}
                />
            ))}
        </ul>

    );
}

function Item({ color, isSelected, onClick }) {
    return (
        <li className={style.item} onClick={onClick} style={{ backgroundColor: color }}>
            {isSelected && (
                <motion.div
                    layoutId="outline"
                    className={style.outline}
                    initial={false}
                    animate={{ borderColor: color }}
                    transition={spring}
                />
            )}
        </li>
    );
}


const colorMap = {
    "high": "#ff0055",
    "medium": "#ffaa00",
    "low": "#22cc88"
}


const spring = {
    type: "spring",
    stiffness: 500,
    damping: 30
};

export default Priority;