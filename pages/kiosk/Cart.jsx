import React from 'react'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import { motion } from 'framer-motion'
import {
  NavLink,
} from "react-router-dom";

function Cart() {
  return (
    <div className="pt-8 mt-11">
      <Typography variant="h3" color="initial">Please select your mode of payment</Typography>
      <div className="m-12 border-2 p-8 border-opacity-100 font-bold rounded-2xl">
        <Grid container spacing={2}>
          <Grid item xs={4}>
            IMAGE
          </Grid>
          <Grid item xs={4}>
            TITLE <br />
              <RemoveIcon color="error"/>
              1
              <ControlPointIcon color="success"/>
          </Grid>
          <Grid item xs={4}>
          <CloseIcon color="error"/>
          <br />
          AMOUNT
          </Grid>
        </Grid>
      </div>
      <div>
        <motion.div className="flex justify-between mx-64 my-16 font-semibold" initial={{y: -50, opacity: 0}}
    animate={{y: 0, opacity: 1 }} 
    transition={{ duration: 0.5 }}>
        <p>Item Total:</p>
        <p>$AMOUNT</p>
        </motion.div>
        <motion.div className="flex justify-between mx-64 my-16 font-semibold" initial={{y: -50, opacity: 0}}
    animate={{y: 0, opacity: 1 }} 
    transition={{ duration: 1.0 }}>
        <p>Tax:</p>
        <p>$AMOUNT</p>
        </motion.div>
        <motion.div className="flex justify-between mx-64 my-16 font-semibold" initial={{y: -50, opacity: 0}}
    animate={{y: 0, opacity: 1 }} 
    transition={{ duration: 1.5 }}>
        <p>Total:</p>
        <p>$AMOUNT</p>
        </motion.div>
        <motion.div className="mt-11" initial={{y: -50, opacity: 0}}
    animate={{y: 0, opacity: 1 }} 
    transition={{ duration: 2 }}>
        <Button variant="text" style={{backgroundColor: '#ffae42', color: '#000000'}} className="pt-8 shadow-md">
        <div className="p-11">
          <NavLink to="/paymentmode">
            Proceed to Payment
          </NavLink>
        </div>
      </Button>
      </motion.div>
      </div>
    </div>
  )
}

export default Cart
