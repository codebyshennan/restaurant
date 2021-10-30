const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
console.log(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)
const handler = async (req, res) => {
  if (req.method === 'POST') {
    const {items} = req.body

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000,
      currency: 'sgd',
      payment_method_types:[
        'grabpay',
        'card',
        'alipay',
      ]
    })

    res.send({clientSecret: paymentIntent.client_secret})
  }
}

export default handler