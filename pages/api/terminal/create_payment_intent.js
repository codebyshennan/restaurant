const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const createPaymentIntent = async (req, res) => {
  const { method } = req
  const { amount } = req.body

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

