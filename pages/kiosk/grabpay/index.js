import React, {useEffect, useState} from 'react';
import { loadStripe } from '@stripe/stripe-js/pure';
import CheckoutForm from '../../../components/payments/stripe/CheckoutForm'
import { Elements } from '@stripe/react-stripe-js'

// Make sure to call `loadStripe` outside of a component’s render to avoid
// // recreating the `Stripe` object on every render.
// TAKE NOTE: LIVE KEY
const stripePromise = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_LIVE_PUBLISH);
const appDomain = process.env.APP_DOMAIN

const PaymentElement = () => {

  const [clientSecret, setClientSecret] = useState("")
  const [ amount, setAmount ] = useState(0)
  
  useEffect(()=> {

    const amount = new URLSearchParams(window.location.search).get("amount");
    setAmount(amount)

    // create paymentIntent as soon as page loads
    fetch(`/api/stripe/checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({amount: amount})
    })
    .then(res => res.json())
    .then(data=> {
      console.log(data)
      setClientSecret(data.clientSecret)
    })
  },[])
  

  const appearance = {
    theme: 'stripe',
  }
  const options = {clientSecret, appearance}

  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  )
}

export default PaymentElement

