import React, {useContext, useState} from 'react'
import Grid from '@mui/material/Grid'
import Item from './Item.jsx'
import SidebarMenu from '../SidebarMenu.jsx'
import CartFooter from './CartFooter.jsx'
import { motion } from 'framer-motion'
import { MenuContext, MealContext } from '../../../pages/kiosk/index.js'
import Image from 'next/image'


function Lunch() {
  const menuItems = useContext(MenuContext)
  const mealItems = useContext(MealContext)
  const [category, setCategory] = useState("main")
  const [isMain, setIsMain] = useState(true)
  const items = menuItems.filter((item) => {
    if (item.type === category) {
      return item
    }
  })

  return (
    <>
        <Grid container className = "h-screen w-screen" spacing = {10} justifyContent ="center">
          <Grid item xs={3} justifyContent="center">
            <SidebarMenu setCategory={setCategory} setIsMain={setIsMain}/>
          </Grid>
          <Grid item xs={9} sx={{maxHeight: '80vh'}} className="overflow-y-scroll">
            <Grid container justifyContent="center" spacing={4}>
              {items.map((item) => (
                 <Grid item xs={4} key={item._id}>
                   <motion.div 
                  initial={{x: 300, opacity: 0}}
                  animate={{x: 0, opacity: 1 }} 
                  transition={{ duration: 1 }} 
                >
                  <Item item={item} id={item._id}
                  isMain={isMain}/>
                  </motion.div>
                </Grid>

              ))}
            </Grid>
          </Grid>
        <Grid item xs={12} sx={{maxHeight: '20vh'}}>
          <CartFooter/>
        </Grid>
      </Grid>
    </>
  )
}

export default Lunch
