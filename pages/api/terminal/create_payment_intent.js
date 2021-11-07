import React from 'react'
const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)

const createPaymentIntent = async (req, res) => {
  const { method } = req
  const { amount } = req.body
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST')
  res.setHeader(
  'Access-Control-Allow-Headers',
  'X-CSRF-Token, X-Requested-With, Accept, Authorization, Accept-Version, X-User-Email, X-Auth-Token, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  // for terminal payments, the 'payment_method_types' parameter must include
  // 'card present' and the 'capture method' must be set to 'manual'
  if(method == "POST") {

    const intent = await stripe.paymentIntents.create({
      amount: parseInt(Number(amount) * 100),
      currency: 'sgd',
      payment_method_types: ['card_present'],
      capture_method: 'manual',
      description: 'test payment'
    })
    res.json({client_secret: intent.client_secret})
  } else {
    res.status(405).send("Invalid request")
  }


}

export default createPaymentIntent

