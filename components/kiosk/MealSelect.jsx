import React, {useContext} from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import 'tailwindcss/tailwind.css'
import { motion } from 'framer-motion'
import {
  NavLink,
  useLocation
} from "react-router-dom";
import { CompatibleMealContext, CartContext, SubtotalContext} from '../../pages/kiosk'

export const MealSelect = (props) => {
  let location = useLocation()
  const item = location.itemProp.item
  const {cartItems, setCartItems} = useContext(CartContext)
  const {subtotal, setSubtotal} = useContext(SubtotalContext)
  const meals = useContext(CompatibleMealContext)
  const itemMeal = meals.filter((itemSet) => {
    return itemSet.main_id === item[0]._id
  })
  console.log(item.ingredients)
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
      {itemMeal[0] && (
        <motion.div className="mt-8"
      initial={{y: -50, opacity: 0}}
    animate={{y: 0, opacity: 1 }} 
    transition={{ duration: 0.5 }}>
        <Button variant="success" style={{backgroundColor: '#12824C', color: '#FFFFFF'}} className="pt-8 shadow-md" >
          <div className="p-11">
            <NavLink to={
                {pathname:"/siderequest",
                itemProp: {itemMeal: itemMeal[0]}
            }}>
              Yes, please! <br />
              ${itemMeal[0].total_cost.regular} 
            </NavLink>
          </div>
        </Button>
      </motion.div>
      )}
      <motion.div className="mt-8" initial={{y: -50, opacity: 0}}
    animate={{y: 0, opacity: 1 }} 
    transition={{ duration: 1 }}>
      {item.ingredients !== undefined && (
        <NavLink to={
                {pathname:path(),
                itemProp: {item: item}
            }}>
          <Button variant="error" style={{backgroundColor: '#cd5c5c', color: '#FFFFFF'}}className="pt-8 shadow-md">
            <div className="p-11">
                <p>No, thank you! <br />
                <span className="font-extralight">A-la Carte: {item[0].price[0].price} </span>
                </p> 
            </div>
          </Button>
        </NavLink>
      )}
        {item.ingredients === undefined && (
                  <NavLink to={
                {pathname: path(),
                itemProp: {item: item}
            }}>
          <Button variant="error" style={{backgroundColor: '#cd5c5c', color: '#FFFFFF'}}className="pt-8 shadow-md" onClick={()=> {addToCart()}}>
            <div className="p-11">
                <p>No, thank you! <br />
                <span className="font-extralight">A-la Carte: {item[0].price[0].price} </span>
                </p> 
            </div>
          </Button>
        </NavLink>
        )}
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