import React from 'react'
import Grid from '@mui/material/Grid'
import Item from './Item.jsx'
import SidebarMenu from '../SidebarMenu.jsx'
import CartFooter from './CartFooter.jsx'
import { motion } from 'framer-motion'
const lunchItems = [
  {id: 1, name: "Rocket Burger", price: 5.95},
  {id: 2, name: "Rocket Chicken Burger", price: 4.95},
  {id: 3, name: "Rocket Filet-O-Fish", price: 5.95},
  {id: 4, name: "Rocket Item", price: 8.95},
]
function Lunch() {
  return (
    <div>
      <div>
        <div className="flex overflow-hidden my-4">
          <SidebarMenu />
          <Grid container justify="center" spacing={4}>
            {lunchItems.map((item) => (
              <motion.div className="my-4 px-4 w-1/2 overflow-hidden" initial={{x: 300, opacity: 0}}
    animate={{x: 0, opacity: 1 }} 
    transition={{ duration: 1 }} key={item.id}>
              <Grid item>
                <Item item={item} id={item.id}
                isMain={true}/>
              </Grid>
              </motion.div>
            ))}
          </Grid>
        </div>
        <CartFooter />
      </div>
    </div>
  )
}

export default Lunch
