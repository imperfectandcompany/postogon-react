import { motion } from "framer-motion";
import React from "react";


export class Home extends React.Component {
  render() {
    return (
      <motion.div
        transition={{ ease: "easeIn", duration: 2 }}
        animate="visible"
      >
ddd
      </motion.div>
    );
  }
}

export default Home;
