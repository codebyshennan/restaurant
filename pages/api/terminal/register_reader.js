import React from 'react'
const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)

const RegisterReader = async (req,res) => {

  const { registration_code, label, location } = req.params

    const reader = await stripe.terminal.reader.create(registration_code, label, location)
    res.send(reader)

}

export default RegisterReader
