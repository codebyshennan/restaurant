const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_LIVE_SECRET);
// console.log(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)
const handler = async (req, res) => {
  const { amount } = req.body
  if (req.method === 'POST') {
    const {items} = req.body

    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(Number(amount) * 100),
      currency: 'sgd',
      payment_method_types:[
        'grabpay'
      ]
    })

    res.json({clientSecret: paymentIntent.client_secret})
  }
}

export default handler