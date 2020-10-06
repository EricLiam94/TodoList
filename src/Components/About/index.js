import React from 'react'
import { motion } from "framer-motion"
const About = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}

            style={{ background: "grey", height: "100vh" }}>
            <h1>About</h1>
        </motion.div>
    )
}

export default About
