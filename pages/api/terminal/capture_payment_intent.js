import React from 'react'

const capturePaymentIntent = async (req,res) => {
  const { method } = req

  if(method == "POST") {

    const intent = await stripe.paymentIntents.capture(req.body.id)
    res.send(intent)
  }
}
export default capturePaymentIntent