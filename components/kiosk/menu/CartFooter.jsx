import React, {useContext, useState} from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import {
  NavLink,
} from "react-router-dom";
import {CartContext} from '../../../pages/kiosk/index.js'
function Footer() {
    const {cartItems, setCartItems} = useContext(CartContext)
    console.log(cartItems)
    const subtotal = 0
    cartItems.forEach((item) => {
      subtotal += item.price[0].price
    })
  return (
    <div className="flex justify-center">
          <div className="rounded-2xl mb-3">
            <p className="border-2 p-6 border-opacity-100 font-bold mb-3">
            Subtotal: ${parseFloat(subtotal).toFixed(2)}
            </p>
              <NavLink to={{pathname: '/cart', cartProp: cartItems, subtotal: parseFloat(subtotal).toFixed(2)}}>
                <Button variant="text" className="shadow-lg"> 
                    <p className="p-7">Checkout</p>
                </Button >
              </NavLink>
            </div>
          <div className="bg-yellow-300 font-bold  flex align-items-center rounded-2xl ml-64">Scan QR Code</div>
    </div>
  )
}

export default Footer
