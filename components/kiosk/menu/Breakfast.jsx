import React from 'react'
import Grid from '@mui/material/Grid'
import Item from './Item.jsx'
import SidebarMenu from '../SidebarMenu.jsx'
import CartFooter from './CartFooter.jsx'
import { motion } from 'framer-motion'
import breakfast from '../../../data/breakfast.js'

function Breakfast() {
  return (
    <div>
      <div>
        <div className="flex overflow-hidden my-4">
          <SidebarMenu />
          <Grid container justify="center" spacing={4}>
            {breakfast.map((item) => (
              <motion.div className="my-4 px-4 w-1/2 overflow-hidden" initial={{x: 300, opacity: 0}}
    animate={{x: 0, opacity: 1 }} 
    transition={{ duration: 1 }} key={item._id.$oid}>
              <Grid item>
                <Item item={item} id={item._id.$oid}
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

export default Breakfast
