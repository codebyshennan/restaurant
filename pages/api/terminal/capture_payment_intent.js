const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const capturePaymentIntent = async (req,res) => {
  const { method } = req

  if(method == "POST") {

    const intent = await stripe.paymentIntents.capture(req.body.id)
    res.send(intent)
  }
}
export default capturePaymentIntent