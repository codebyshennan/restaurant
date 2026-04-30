import React, {useEffect, useState, useContext} from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Link from "next/link";
import Receipt from '../../components/kiosk/Receipt.jsx';

const PaymentSuccess = () => {

  const [paymentIntent, setPaymentIntent ] = useState('')
  const [paymentMethod, setPaymentMethod ] = useState('')
  const [cartItems, setCartItems] = useState([])
  const [cartPrice, setCartPrice ] = useState(0)
  const [dineIn, setDineIn] = useState(false)
  const [queue, setQueue] = useState('')



  useEffect(()=> {
    const paymentMethod = new URLSearchParams(window.location.search).get("paymentMethod")

    setPaymentIntent(new URLSearchParams(window.location.search).get("paymentIntent"))
    setPaymentMethod(paymentMethod)

    let cartItems, cartPrice, dineIn
    try {
      cartItems = JSON.parse(localStorage.getItem("cart"))
      cartPrice = JSON.parse(localStorage.getItem("subtotal"))
      dineIn = JSON.parse(localStorage.getItem("dineIn"))
    } catch (e) {
      console.error("Failed to read order data from localStorage:", e)
      return
    }

    if (!cartItems) {
      console.error("No cart data found in localStorage")
      return
    }

    setDineIn(dineIn)
    setCartPrice(cartPrice)
    setCartItems(cartItems)
    console.log(cartItems)

    const sendOrder = async() => {
      if (sessionStorage.getItem('orderSent')) {
        return
      }

      const order = {
        "order_list": [...cartItems],
        "status": "processing",
        "mode" : dineIn ? "dine-in" : "delivery",
        "payment_by": paymentMethod,
        "total_cost": cartPrice,
        "created_at": new Date(),
      }

      await fetch('/api/orders', {
              method: 'POST',
              body: JSON.stringify(order),
          })
          .then(res => res.json())
          .then(data => console.log(data))

      sessionStorage.setItem('orderSent', 'true')

      await fetch('/api/queue', {
        method: 'GET'
      }).then(res=> res.json())
        .then(data => setQueue(data))

      // const queueNumber = JSON.parse(response).queue
      // console.log(response)
      // setQueue(queueNumber)

      localStorage.clear()
    }

    sendOrder()
    
  }, [])

  

  return (
    <div className="ml-20">
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
        Your queue number is: {queue}
        <br />
      </Typography>

      <Typography variant="h5" color="initial">
        Here is your Receipt:
        <br />
      </Typography>
        <div className='ml-20'>
          <Receipt cartItems={cartItems} cartPrice={cartPrice} queue={queue}/>
        </div>

        <Link href='/kiosk'>
          <a>
          <Button variant="outlined" className="p-16">
            Ok!
          </Button>
          </a>
        </Link>
    </div>
  )
}

export default PaymentSuccess
