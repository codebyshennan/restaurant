import React, {useContext, useState} from 'react'
import Grid from '@mui/material/Grid'
import { motion } from 'framer-motion'
import Button from '@mui/material/Button'
import useStyles from './itemStyles.js'
import {Typography, Badge} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  NavLink
} from "react-router-dom";
import {CartContext, SubtotalContext} from '../../../pages/kiosk/index.js'

function MenuCartFooter({currentPrice, setCurrentItems, currentItems, setGoToReview, setCategory, setCurrentPrice}) {
  const {cartItems, setCartItems} = useContext(CartContext)
  const {subtotal, setSubtotal} = useContext(SubtotalContext)
    const addToCart = () => {
    setSubtotal(subtotal += currentPrice)
    setCartItems(...cartItems, currentItems)
  }
  const handleReset = () => {
    setCurrentItems([])
    setGoToReview(false)
    setCategory('meal')
    setCurrentPrice(0.00)
  }
  return (
    <div className='mt-5'>
      <Grid container direction="column">
        <Grid item xs={6}>
          <Grid container >
            <Grid item xs={5}>
              <Badge badgeContent={1} color="primary">
                <ShoppingCartIcon color="action" />
               </Badge>
              <Typography variant="h6" color="initial"> {currentPrice}</Typography>
            </Grid>
            <Grid item xs={7}>
              <NavLink to="/menu">
              <Button variant="outlined" className='p-8' onClick={() => {addToCart()}}>
                Add to Cart
              </Button>
              </NavLink>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container >
           <Grid item xs={4}>
              <Button variant="outlined" className='p-6' onClick={() => {
                handleReset()
              }}>
                Start Over
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button variant="outlined" className='p-8'>
                Reach Mode
              </Button>
            </Grid>
            <Grid item xs={4}>
            <NavLink to="/menu">
              <Button variant="outlined" className='p-8'> 
                Cancel Item
              </Button>
            </NavLink>
          </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default MenuCartFooter
