import React, { useEffect, useRef } from 'react'
import style from "./home.module.scss"
import { motion, useTransform, useMotionValue, AnimatePresence } from "framer-motion";
import Button from '@material-ui/core/Button';
import { useSelector } from "react-redux"
import { withRouter } from "react-router-dom"

const pageVariants = {
    initial: {
        opacity: 0,

        scale: 0.8
    },
    in: {
        opacity: 1,

        scale: 1
    },
    out: {
        opacity: 0,

        scale: 1.2
    }
};
const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.7
};


const Home = ({ history }) => {
    const isLoggin = useSelector(state => state.auth.isLoggin)
    const variants = {
        hidden: { opacity: 0, scaleY: 0, y: -20 },
        visible: {
            opacity: 1,
            scaleY: 1,
            y: 0,
            transition: { delay: 1 }
        }
    }

    const handleClick = (e) => {
        history.push("/dashboard")
    }

    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className={style.container}>
            <motion.div
                variants={variants}
                initial="hidden"
                animate="visible"
                className={style.banner} >
                <motion.h1
                    variants={variants}
                >Welcome to TODO  List</motion.h1>
                <motion.div
                    variants={variants}
                    className={style.desc}>
                    A simple Todo List app helping you for better performance
                </motion.div>
                <Button
                    variant="contained" color="primary">
                    Learn More
                </Button>
                <AnimatePresence>
                    {isLoggin && <motion.span

                        initial={{ opacity: 0, y: 50 }}
                        className={style.tryBt}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        exit={{ opacity: 0 }}
                    ><Button

                        onClick={handleClick}
                        variant="contained" >
                            Try out
                    </Button>
                    </motion.span>
                    }

                </AnimatePresence>
            </motion.div >


            <CircleAnimate />

        </motion.div >
    )
}


const CircleAnimate = () => {
    const ref = useRef()
    const x = useMotionValue(0);
    let input = [-300, 0]
    const tickPath = useTransform(x, input, [0, 1]);
    const color = useTransform(x, input, [
        "rgb(211, 9, 225)",
        "rgb(68, 0, 255)"
    ]);
    const circleColor = useTransform(x, input, [
        "rgb(68, 0, 255)",
        "rgb(154, 215, 0)"
    ]);
    useEffect(() => {

        let { left, top } = ref.current.getBoundingClientRect()

        const unsub = window.addEventListener("mousemove", function (e) {
            if (ref.current) {
                var x = left - e.clientX
                var y = e.clientY - top
                ref.current.style.transform = `rotateX(${-y / 8}deg) rotateY(${-x / 18}deg)`
            }
        });
        return unsub
    }, [])

    return (
        <motion.div
            ref={ref}
            className={style.circleContainer}
            style={{ x }}
            initial={{ x: -300 }}

            animate={{ x: 0 }}
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.8}
            transition={{
                duration: 2,
                ease: "easeInOut",

            }}
        >
            <motion.div
                className={style.circle}
                animate={{
                    scale: [1, 1.1, 1.2, 1, 1],
                    rotate: [0, 0, 270, 270, 0],
                    borderRadius: ["20%", "20%", "50%", "50%", "20%"]
                }}
                transition={{
                    duration: 2,
                    delay: 2,
                    ease: "easeInOut",
                    times: [0, 0.2, 0.5, 0.8, 1],
                    loop: Infinity,
                    repeatDelay: 4
                }}
            >

                <svg viewBox="0 0 50 50">
                    <motion.path

                        fill="none"
                        strokeWidth="2"
                        stroke={circleColor}
                        d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
                        style={{ translateX: 5, translateY: 5 }}
                    />
                    <motion.path
                        fill="none"
                        strokeWidth="2"
                        stroke={color}
                        d="M14,26 L 22,33 L 35,16"
                        strokeDasharray="0 1"
                        style={{ pathLength: tickPath }}
                    />
                </svg>
            </motion.div>
        </motion.div>)
}

export default withRouter(Home)
