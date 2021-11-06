
import React from 'react'
const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)

const webhook = (req, res) => {
  const { method } = req
  // bodyParser.raw({type: 'application/json'})
  if (method == "POST") {
    const event = req.body

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log('PaymentIntent was successful!');
        break;
      case 'payment_method.attached':
        const paymentMethod = event.data.object;
        console.log('PaymentMethod was attached to a Customer!');
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST')
    res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Authorization, Accept-Version, X-User-Email, X-Auth-Token, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )

    // Return a 200 response to acknowledge receipt of the event
    res.json({received: true});

  }
}

export default webhook
