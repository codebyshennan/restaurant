const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const RegisterReader = async (req,res) => {

  const { registration_code, label, location } = req.body

    const reader = await stripe.terminal.reader.create(registration_code, label, location)
    res.send(reader)

}

export default RegisterReader
