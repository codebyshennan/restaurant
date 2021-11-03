import React, {useContext, useState} from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import {
  NavLink,
  useLocation
} from "react-router-dom";
import {CartContext, SubtotalContext} from '../../../pages/kiosk/index.js'
import {CartPopUp} from './CartPopUp.jsx'
import {MenuCartFooter} from './MenuCartFooter.jsx'



function ReviewScreen() {
  const {cartItems, setCartItems} = useContext(CartContext)
  const {subtotal, setSubtotal} = useContext(SubtotalContext)
    const addToCart = () => {
    setSubtotal(subtotal += currentPrice)
    setCartItems(...cartItems, currentItems)
  }
  console.log(cartItems)
  return (
    <div className="mt-16 mx-8">
      <Grid container spacing = {3}>
        <Grid item xs={4}>
          <Typography variant="h6" color="initial">
          </Typography>
          <Button variant="text" color="default">
            Customize
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button variant="text" color="default">
            Customize
          </Button>
          <Button variant="text" color="default">
            Change Item
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button variant="text" color="default">
            Customize
          </Button>
          <Button variant="text" color="default">
            Change Item
          </Button>
        </Grid>
      </Grid>
      <MenuCartFooter currentPrice={subtotal} />
    </div>
  )
}

export default ReviewScreen
