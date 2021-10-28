import React from 'react'
import { connect } from 'react-redux'
import Grid from '@mui/material/Grid'
import Item from './Item.jsx'
import { motion } from 'framer-motion'
import Button from '@mui/material/Button'
import {
  NavLink,
} from "react-router-dom";

const sideItems = [
  {id: 1, name: "Rocket Fries(L) Diet Coke(L)", price: 5.95},
  {id: 2, name: "Rocket Fries(M) Diet Coke(M)", price: 4.95},
  {id: 3, name: "Rocket Salad", price: 5.95},
  {id: 4, name: "Rocket Sundae", price: 8.95},
]
// sidebar for sideitems
export const SideSelection = (props) => {
  return (
    <div>
      <Grid container justify="center" spacing={4}>
        {sideItems.map((item) => (
           <motion.div className="my-4 px-4 w-1/2 overflow-hidden" initial={{x: 300, opacity: 0}}
            animate={{x: 0, opacity: 1 }} 
            transition={{ duration: 1 }} key={item.id}>
              <Grid item>
                <Item item={item} id={item.id}/>
              </Grid>
            </motion.div>
           ))}
        </Grid>
     <motion.div className="mt-11" initial={{y: -50, opacity: 0}}
      animate={{y: 0, opacity: 1 }} 
      transition={{ duration: 2 }}>
        <Button variant="error" style={{backgroundColor: '#fe6f5e', color: '#000000'}} className="pt-8 shadow-md">
          <div className="p-11">
          <NavLink to='/menu'>Cancel</NavLink>
          </div>
      </Button>
      </motion.div>
    </div>
  )
}

export default SideSelection