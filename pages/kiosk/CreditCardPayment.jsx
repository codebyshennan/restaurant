import React from 'react'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { motion } from 'framer-motion'

function CreditCardPayment() {
  return (
    <div className="pt-8 mt-11"
    >
      <Typography variant="h3" color="initial">Please select your mode of payment</Typography>
      <motion.div className="mt-8"
          initial={{y: -50, opacity: 0}}
    animate={{y: 0, opacity: 1 }} 
    transition={{ duration: 0.5 }}>
      <Button variant="success" style={{backgroundColor: '#FFFFFF', color: '#000000'}} className="pt-8 shadow-md" >
        <div className="p-11">
          NETS
        </div>
      </Button>
      </motion.div>
      <motion.div className="mt-8"
          initial={{y: -50, opacity: 0}}
    animate={{y: 0, opacity: 1 }} 
    transition={{ duration: 1 }}>
      <Button variant="error" style={{backgroundColor: '#FFFFFF', color: '#000000'}}className="pt-8 shadow-md">
        <div className="p-11">
          <p>Samsung Pay <br />
          OR <br />
          Apple Pay
          </p>
        </div>
      </Button>
      </motion.div>
      <motion.div className="mt-11"
      initial={{y: -100, opacity: 0}}
    animate={{y: 0, opacity: 1 }} 
    transition={{ duration: 1.5 }}>
        <Button variant="error" style={{backgroundColor: '#FFFFFF', color: '#000000'}} className="pt-8 shadow-md">
        <div className="p-11">
          <p>VISA/Mastercard <br />
          </p>
        </div>
      </Button>
      </motion.div>
      <motion.div className="mt-11"
      initial={{y: -100, opacity: 0}}
    animate={{y: 0, opacity: 1 }} 
    transition={{ duration: 2 }}>
        <Button variant="error" style={{backgroundColor: '#fe6f5e', color: '#000000'}} className="pt-8 shadow-md">
        <div className="p-11">
          Cancel Item
        </div>
      </Button>
      </motion.div>
    </div>
  )
}

export default CreditCardPayment
