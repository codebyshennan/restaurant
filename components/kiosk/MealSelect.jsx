import React, {useContext} from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import 'tailwindcss/tailwind.css'
import useStyles from './menu/itemStyles.js'
import { motion } from 'framer-motion'
import {
  NavLink,
  useLocation
} from "react-router-dom";
import { CompatibleMealContext, CartContext, SubtotalContext} from '../../pages/kiosk'
import { Card, CardMedia, CardContent, CardActions, IconButton, cardActionsClasses, CardActionArea } from '@mui/material'

export const MealSelect = (props) => {
  const classes = useStyles()
  let location = useLocation()
  const item = location.itemProp.item
  const {cartItems, setCartItems} = useContext(CartContext)
  const {subtotal, setSubtotal} = useContext(SubtotalContext)
  const meals = useContext(CompatibleMealContext)
  const itemMeal = meals.filter((itemSet) => {
    return itemSet.main_id === item[0]._id
  })
  const addToCart = () => {
      const addedItem = JSON.parse(JSON.stringify(item[0]))
      addedItem.price = addedItem.price[0].price
      setCartItems([...cartItems, addedItem])
      subtotal += addedItem.price
      setSubtotal(subtotal)
  }
  const path = () => {
    if (item.ingredients === undefined){
      return '/menu'
    }
    return '/specialrequest'
  }

  return (
    <div className="pt-8 mt-11">
      <Typography variant="h3" color="initial">Would you like to make this a meal?</Typography>
      <div className="flex flex-row justify-evenly">
      {itemMeal[0] && (
        <motion.div className="mt-8 w-1/2 h-1/2 ml-24"
        initial={{y: -50, opacity: 0}}
        animate={{y: 0, opacity: 1 }} 
        transition={{ duration: 0.5 }}>
          <Card className={classes.meal} elevation={5} variant="outlined" sx={{width: '80%'}}>
        <CardActionArea>
          <NavLink to={
                  {pathname:"/siderequest",
                  itemProp: {itemMeal: itemMeal[0]}
              }}>
            <CardMedia component='img' image={itemMeal[0].image_url} height='140' width='140' alt={itemMeal[0].name} title={itemMeal[0].name} />
            <CardContent>
              <div className={classes.cardContent}>
                <Typography variant="h6">
                  {itemMeal[0].name}
                </Typography>
                <Typography variant="h6" >
                  ${itemMeal[0].total_cost.regular}
                </Typography>
              </div>
            </CardContent>
          </NavLink>
        </CardActionArea>
      </Card>
        </motion.div>
      )}
      {item.ingredients !== undefined && (
        <motion.div className="mt-8 w-1/2 h-1/2 ml-24" initial={{y: -50, opacity: 0}}
    animate={{y: 0, opacity: 1 }} 
    transition={{ duration: 1 }}>
        <Card className={classes.meal} elevation={5} variant="outlined" sx={{width: '80%'}}>
      <CardActionArea className="pt-8">
        <NavLink to={
                {pathname: '/specialrequest',
                itemProp: {item: item}
            }}>
          <CardMedia component='img' image={item[0].image_url} height='140' width='140' alt={item[0].name} title={item[0].name}  />
          <CardContent>
            <div className={classes.cardContent}>
              <Typography variant="h6">
                {item[0].name} Ala Carte
              </Typography>
              <Typography variant="h6" >
                ${item[0].price[0].price}
              </Typography>
            </div>
          </CardContent>
        </NavLink>
      </CardActionArea>
    </Card>
        </motion.div>
      )}
        {item.ingredients === undefined && (
            <motion.div className="mt-8 w-1/2 h-1/2 ml-24" initial={{y: -50, opacity: 0}}
            animate={{y: 0, opacity: 1 }} 
            transition={{ duration: 1 }}>
             <Card className={classes.meal} elevation={5} variant="outlined" sx={{width: '80%'}}>
              <CardActionArea className="pt-8">
                <a onClick={()=> {addToCart()}}>
                  <NavLink to={
                    {pathname: path(),
                    itemProp: {item: item}
                  }}>
                    <CardMedia component='img' image={item[0].image_url} alt={item[0].name} title={item[0].name}/>
                    <CardContent>
                      <div className={classes.cardContent}>
                        <Typography variant="h6">
                          {item[0].name} Ala Carte
                        </Typography>
                        <Typography variant="h6" >
                          ${item[0].price[0].price}
                        </Typography>
                      </div>
                    </CardContent>
                  </NavLink>
                </a>
              </CardActionArea>
            </Card>
          </motion.div>
        )}
        </div>
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