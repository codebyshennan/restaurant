import React from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import 'tailwindcss/tailwind.css'
import { motion } from 'framer-motion'
import {
  NavLink,
  useLocation
} from "react-router-dom";

export const MealSelect = (props) => {
  let location = useLocation()
  console.log(location)
  const item = location.itemProp.item
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
        <NavLink to={
                {pathname:"/specialrequest",
                itemProp: {item: [item]}
            }}>
          <Button variant="error" style={{backgroundColor: '#cd5c5c', color: '#FFFFFF'}}className="pt-8 shadow-md">
            <div className="p-11">
                <p>No, thank you! <br />
                <span className="font-extralight">A-la Carte: $TOTALPRICE</span>
                </p> 
            </div>
          </Button>
        </NavLink>
      </motion.div>
      <motion.div className="mt-11" initial={{y: -50, opacity: 0}}
    animate={{y: 0, opacity: 1 }} 
    transition={{ duration: 1.5 }}>
        <NavLink to="/menu">
          <Button variant="error" style={{backgroundColor: '#ff0000', color: '#FFFFFF'}} className="pt-8 shadow-md">
            <div className="p-11">
                Cancel Item
            </div>
          </Button>
        </NavLink>
      </motion.div>
    </div>
  )
}

export default MealSelect