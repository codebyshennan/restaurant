import React from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import {
  NavLink,
} from "react-router-dom";

function Footer() {
  return (
    <div className="flex justify-center">
          <div className="rounded-2xl mb-16">
            <p className="border-2 p-8 border-opacity-100 font-bold mb-16">
            Subtotal: $100.00
            </p>
            <Button variant="text" className="shadow-lg"> 
              <NavLink to="/cart">
                <p className="p-10">Checkout</p>
              </NavLink>
            </Button ></div>
          <div className="bg-yellow-300 font-bold h-page flex align-items-center rounded-2xl ml-64">Scan QR Code</div>
    </div>
  )
}

export default Footer
