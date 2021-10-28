const secretKey = process.env.STRIPE_SECRET_KEY


const stripeHandler = async (req,res) => {

  const stripe = require('stripe')(secretKey)

  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1000,
    currency: 'sgd',
    payment_method_types: ['card'],
  });

  res.status(200).json(paymentIntent)

}

export default stripeHandler