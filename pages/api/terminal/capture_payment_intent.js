import React from 'react'
const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)

const capturePaymentIntent = async (req,res) => {
  const { method } = req
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST')
  res.setHeader(
  'Access-Control-Allow-Headers',
  'X-CSRF-Token, X-Requested-With, Accept, Authorization, Accept-Version, X-User-Email, X-Auth-Token, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  if(method == "POST") {

    const intent = await stripe.paymentIntents.capture(req.body.id)
    res.send(intent)
  }
}
export default capturePaymentIntent