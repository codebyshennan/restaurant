const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const connectionTokenHandler = async (req,res) => {

  const { method } = req 
  
  if (method == 'POST') {
    let connectionToken = await stripe.terminal.connectionTokens.create();
    res.json({secret: connectionToken.secret});
  } else {
    res.status(405).send('Invalid Request')
  }
}

export default connectionTokenHandler