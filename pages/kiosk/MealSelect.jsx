import React from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { motion } from 'framer-motion'
import {
  NavLink,
} from "react-router-dom";

export const MealSelect = (props) => {
  return (
    <div className="pt-8 mt-11">
      <Typography variant="h3" color="initial">Would you like to make this a meal?</Typography>
      <motion.div className="mt-8"
      initial={{y: -50, opacity: 0}}
    animate={{y: 0, opacity: 1 }} 
    transition={{ duration: 0.5 }}>
        <Button variant="success" style={{backgroundColor: '#12824C', color: '#FFFFFF'}} className="pt-8 shadow-md" >
          <div className="p-11">
            <NavLink to="/sideselection">
              Yes, please!
            </NavLink>
          </div>
        </Button>
      </motion.div>
      <motion.div className="mt-8" initial={{y: -50, opacity: 0}}
    animate={{y: 0, opacity: 1 }} 
    transition={{ duration: 1 }}>
        <Button variant="error" style={{backgroundColor: '#cd5c5c', color: '#FFFFFF'}}className="pt-8 shadow-md">
          <div className="p-11">
            <NavLink to="/specialrequest">
              <p>No, thank you! <br />
              <span className="font-extralight">A-la Carte: $TOTALPRICE</span>
              </p>
            </NavLink>
          </div>
        </Button>
      </motion.div>
      <motion.div className="mt-11" initial={{y: -50, opacity: 0}}
    animate={{y: 0, opacity: 1 }} 
    transition={{ duration: 1.5 }}>
        <Button variant="error" style={{backgroundColor: '#ff0000', color: '#FFFFFF'}} className="pt-8 shadow-md">
        <div className="p-11">
          <NavLink to="/menu">
            Cancel Item
          </NavLink>
        </div>
      </Button>
      </motion.div>
    </div>
  )
}

export default MealSelect