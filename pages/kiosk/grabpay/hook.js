import React, {useEffect} from 'react'

const RedirectHook = () => {

  useEffect(()=> {
    const paymentIntent = new URLSearchParams(window.location.search).get('payment_intent')
    const clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret")
    const redirectStatus = new URLSearchParams(window.location.search).get("redirect_status")
    const redirectURL = `http://localhost:3000/kiosk/payment_success?paymentIntent=${paymentIntent}&paymentMethod=grabPay`

    if(redirectStatus == "succeeded") {
      window.opener.location.replace(redirectURL)
      window.close()
    }
  }, [])
  

  return (
    <div>
      Redirecting...
    </div>
  )
}

export default RedirectHook
