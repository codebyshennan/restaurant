import React from 'react'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { motion } from 'framer-motion'
import {
  NavLink,
} from "react-router-dom";

export const PaymentMode = (props) => {
  return (
    <div className="pt-8 mt-11">
      <Typography variant="h3" color="initial">Please select your mode of payment</Typography>
      <motion.div className="mt-8" initial={{y: -50, opacity: 0}}
    animate={{y: 0, opacity: 1 }} 
    transition={{ duration: 0.5 }}>
      <Button variant="success" style={{backgroundColor: '#FFFFFF', color: '#000000'}} className="pt-8 shadow-md" >
        <NavLink to='/creditcardpayment'>
          <div className="p-11">
            $INSERTICONS
            Credit Card/Mobile Payment
          </div>
        </NavLink>
      </Button>
      </motion.div>
      <motion.div className="mt-8"initial={{y: -50, opacity: 0}}
    animate={{y: 0, opacity: 1 }} 
    transition={{ duration: 1 }}>
      <Button variant="error" style={{backgroundColor: '#FFFFFF', color: '#000000'}}className="pt-8 shadow-md">
        <div className="p-11">
          <p>Cash Payment <br />
          </p>
        </div>
      </Button>
      </motion.div>
      <motion.div className="mt-11 flex justify-center" initial={{y: -50, opacity: 0}}
    animate={{y: 0, opacity: 1 }} 
    transition={{ duration: 1.5 }}>
        <div className="p-11 shadow-md w-1/2">
          <p>Subtotal <br />
          </p>
        </div>
      </motion.div>
            <motion.div className="mt-11" initial={{y: -50, opacity: 0}}
    animate={{y: 0, opacity: 1 }} 
    transition={{ duration: 2 }}>
        <Button variant="error" style={{backgroundColor: '#fe6f5e', color: '#000000'}} className="pt-8 shadow-md">
        <NavLink to='/cart'>
          <div className="p-11">
            Cancel Item
          </div>
        </NavLink>
      </Button>
      </motion.div>
    </div>
  )
}

export default PaymentMode