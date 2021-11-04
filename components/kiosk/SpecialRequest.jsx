import React, {useContext, useState, Fragment, useEffect, useReducer} from 'react'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveIcon from '@mui/icons-material/Remove';
import { motion } from 'framer-motion'
import {
  NavLink,
  useLocation
} from "react-router-dom";
import {CartContext, SubtotalContext} from '../../pages/kiosk/index.js'


export const SpecialRequest = (props) => {
  let location = useLocation()
  const item = location.itemProp.item
  console.log(item)
  const initialState = JSON.parse(JSON.stringify(item[0]))
  console.log(initialState === item[0])
  // const initialState = JSON.parse(JSON.stringify(currentItems[index]))
  // console.log(initialState === currentItems[index])
  // change to allow sets
  //change to index for diff prices
  const {cartItems, setCartItems} = useContext(CartContext)
  const {subtotal, setSubtotal} = useContext(SubtotalContext)
  const [currentItem, setCurrentItem] = useState(initialState)
  const changeAddons = (itemIndex, didAdd) => {
    if (didAdd && currentItem.ingredients[itemIndex].quantity < currentItem.ingredients[itemIndex].limit) {
      currentItem.ingredients[itemIndex].quantity += 1
      currentItem.price[0].price += currentItem.ingredients[itemIndex].price_per_unit
    }
    else if (!didAdd && currentItem.ingredients[itemIndex].quantity > 0) {
      currentItem.ingredients[itemIndex].quantity -= 1
      currentItem.price[0].price -= currentItem.ingredients[itemIndex].price_per_unit
    }
    setCurrentItem({...currentItem, price: currentItem.price, ingredients: currentItem.ingredients})
  }

  const handleAddToCart = () => {
    // need to change to allow sets
    setSubtotal(subtotal += currentItem.price[0].price)
    if (cartItems === []) {
      setCartItems(meal)
    }
    else{
    setCartItems([...cartItems, currentItem])
    }
  }

  const data = currentItem.ingredients
                .map((ingredient, idx)=>{
                  return ( 
                      <Grid container key={idx} >
                        <Grid item xs={8}>
                          <div className="pr-5 py-5">
                           {ingredient.name}
                          </div>
                        </Grid>

                        <Grid item xs={4}>
                          <div className="pt-5">
                            <p>
                              {ingredient.quantity}
                            </p>
                            <p>
                              <a onClick={() => {changeAddons(idx, false)}}><RemoveIcon color="error"/></a>
                              <a onClick={() => {changeAddons(idx, true)}}><ControlPointIcon color="success"/></a>
                            </p>

                          </div>
                        </Grid>
                      </Grid>
                  )
                })

  return (

      <>

        <div className="pt-8 mt-11">

          <Typography variant="h3" color="initial">Any Special Requests?</Typography>
        {/* {location.itemProp.item.map((item, i) =>)} */}
          <Grid container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={3}>
            <Grid item xs>
              <div className="mt-8 shadow-lg rounded-3xl">
                { data }
              </div>
              <Typography variant="h6" color="initial">
               Subtotal: {currentItem.price[0].price.toFixed(2)}
              </Typography>
            </Grid>
          </Grid>

           {/* <motion.div className="mt-11" initial={{y: -50, opacity: 0}}
            animate={{y: 0, opacity: 1 }} 
            transition={{ duration: 1 }}>

           </motion.div> */}

          <motion.div className="mt-11" initial={{y: -50, opacity: 0}}
            animate={{y: 0, opacity: 1 }} 
            transition={{ duration: 1.5 }}>


          <NavLink to="/menu">
            <Button variant="success" style={{backgroundColor: '#009900', color: '#FFFFFF'}} className="pt-8 shadow-md" onClick={() => { handleAddToCart()}}>
            <div className="p-11">
                  I'm done customising
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
                    Cancel
                </div>
              </Button>
            </NavLink>

          </motion.div>
        </div>
      </>
  )
}

export default SpecialRequest
