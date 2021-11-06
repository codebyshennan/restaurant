
const connectionTokenHandler = async (req,res) => {
  const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)
  const { method } = req 

  if (method == 'POST') {
    let connectionToken = await stripe.terminal.connectionTokens.create();
    console.log(connectionToken)
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST')
    res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Authorization, Accept-Version, X-User-Email, X-Auth-Token, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    res.json({secret: connectionToken.secret});
    
  } else {
    res.status(405).send('Invalid Request')
  }
}

export default connectionTokenHandler