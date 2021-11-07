import React, {useContext, useState} from 'react'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { motion } from 'framer-motion'
import {
  NavLink,
  useLocation
} from "react-router-dom";
import {CartContext, DineInContext} from '../../pages/kiosk/index.js'


const CreditCardPayment = () => {

  let location = useLocation()
  const { cartItems, setCartItems } = useContext(CartContext)
  const { dineIn } = useContext(DineInContext)
  
   const openCreditCardTerminal = () => {

    const win = window.open('/kiosk/terminal?amount=100', 
                'targetWindow',
                'directories=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=250,height=450')

  }

  const GrabPayPayment = () => {
    const win = window.open('/kiosk/terminal?amount=100', 
                'targetWindow',
                'directories=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=250,height=450')
  }


  const handlePayment = async () => {

    const order = { 
        "order_list": [...location.cart],
        "status": "processing",
        "mode" : dineIn ? "dine-in" : "delivery",
        "payment_by": "card",
        "total_cost": location.total,
        "created_at": new Date(),
        }

    await fetch('/api/orders', {
            method: 'POST',
            body: JSON.stringify(order),
        })
        .then(res => res.json())
        .then(data => console.log(data))

    setCartItems([])
    
  }

  return (
    <div className="pt-8 mt-11"
    >
      <Typography variant="h3" color="initial">Please select your mode of payment</Typography>
      <motion.div className="mt-8"
        initial={{y: -50, opacity: 0}}
        animate={{y: 0, opacity: 1 }} 
        transition={{ duration: 0.5 }}>
          <NavLink to='/paymentsuccess'>
            <Button variant="success" style={{backgroundColor: '#FFFFFF', color: '#000000'}} className="pt-8 shadow-md" onClick={openGrabPayTerminal}>
              <div className="p-11">
                GrabPay
              </div>
            </Button>
          </NavLink>
      </motion.div>
      
      <motion.div className="mt-11"
      initial={{y: -100, opacity: 0}}
      animate={{y: 0, opacity: 1 }} 
      transition={{ duration: 1.5 }}>
          <Button variant="error" style={{backgroundColor: '#FFFFFF', color: '#000000'}} className="pt-8 shadow-md" onClick={openCreditCardTerminal}>
          <div className="p-11">
            <p> VISA / Mastercard <br />
            </p>
          </div>
        </Button>
      </motion.div>

      <motion.div className="mt-11"
      initial={{y: -100, opacity: 0}}
      animate={{y: 0, opacity: 1 }} 
      transition={{ duration: 2 }}>
        <NavLink to="/cart">
          <Button variant="error" style={{backgroundColor: '#fe6f5e', color: '#000000'}} className="pt-8 shadow-md">
          <div className="p-11">
            Back To Cart
          </div>
        </Button>
        </NavLink>
      </motion.div>
    </div>
  )
}

export default CreditCardPayment
