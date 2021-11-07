import React, {useEffect, useState, useContext} from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import {
  NavLink
} from "react-router-dom";
import { DineInContext } from '../../pages/kiosk/index.js'

const PaymentSuccess = () => {

  const {dineIn, setDineIn} = useContext(DineInContext)
  const [data, setData] = useState()

  useEffect(() => {
    const getResult = async() => {
      const result = await fetch('/api/queue', {method:"GET"})
      console.log(JSON.stringify(result))
      const orderData = await result.json()
      setData(orderData[0].seq_value)
    }
    const queueResult = getResult() 
  }, [])

  return (
    <div>
      <Typography variant="h3" color="initial">
        Payment succeeded!<br />
      </Typography>

        {
          dineIn && (
            <Typography variant="h5" color="initial">
              You have selected to Dine in.
            </Typography>
          )
        }
        {
          !dineIn && (
            <Typography variant="h5" color="initial">
              You have selected to takeout your food.
            </Typography>
          )
        }

      <Typography variant="h5" color="initial">
        Your queue number is:
        <br />
      </Typography>

      <Typography variant="h1" color="initial">
        {data}
      </Typography>
    
      <NavLink to="/">
        <Button variant="outlined" className="p-16">
          Ok!
        </Button>
      </NavLink>
      
    </div>
  )
}

export default PaymentSuccess
