import React, {useState} from 'react'
import {
  Route,
  NavLink,
  Switch,
  BrowserRouter as Router
} from "react-router-dom";
import Button from '@mui/material/Button';
import { motion } from 'framer-motion'

function SplashButtons({dineIn, setDineIn}) {
  const handleSetDineIn = (dineInInput) => {
    console.log(dineIn)
    setDineIn(dineInInput)
  }
  return (
      <div>
        <motion.div id = 'orderNow' className="flex flex-col space-y-8"
          initial={{y: -200, opacity: 0}}
      animate={{y: 0, opacity: 1 }} 
      transition={{ duration: 1 }}>
            <Button  variant="text" className="shadow-lg" onClick ={()=>{handleSetDineIn(true)}}>
              <p className="p-10">
                <NavLink to='/menu'>Dine In</NavLink>
              </p> 
            </Button >
            <Button  variant="text" className="shadow-lg" onClick ={()=>{handleSetDineIn(false)}}>
              <p className="p-10">
                <NavLink to='/menu'>Take out</NavLink>
              </p>
            </Button >
          </motion.div>
      </div>
  )
}

export default SplashButtons
