import { motion } from "framer-motion";
import React from "react";
import { NavLink } from "react-router-dom";
import { getUser, removeLoginSession } from '../Utils/Common';


function Dashboard(props: { history: string[]; }) {
  const user:any = getUser();
 
  // handle click event of logout button
  const handleLogout = () => {
    removeLoginSession();
    props.history.push('/login');
  }

    return (
      
      <motion.div
        transition={{ ease: "easeIn", duration: 2 }}
        animate="visible"
      >

<div className="header">
            <NavLink exact activeClassName="active" to="/">Home</NavLink>
            <input type="button" onClick={handleLogout} value="Logout" />
          </div>
    <div>
      Welcome {user}!<br /><br />
      <input type="button" onClick={handleLogout} value="Logout" />
    </div>
      </motion.div>
    );
}

export default Dashboard;
