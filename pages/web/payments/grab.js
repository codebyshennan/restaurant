import React, {useEffect, useState} from 'react';
// import {withRouter, useLocation} from 'react-router-dom';
import {useStripe, useElements} from '@stripe/react-stripe-js';
// import StatusMessages, {useMessages} from './StatusMessages';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const GrabpayForm = () => {

  const stripe = useStripe();
  const elements = useElements();
  const [name, setName] = useState('Jenny Rosen');

  const handleSubmit = async (e) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const {error: backendError, clientSecret} = await fetch(
      '/create-payment-intent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethodType: 'grabpay',
          currency: 'myr',
        }),
      }
    ).then((r) => r.json());


    const {
      error: stripeError,
      paymentIntent,
    } = await stripe.confirmGrabPayPayment(clientSecret, {
      payment_method: {
        billing_details: {
          name,
        },
      },
      return_url: `${window.location.origin}/grabpay?return=true`,
    });

    if (stripeError) {
      // Show error to your customer (e.g., insufficient funds)
      addMessage(stripeError.message);
      return;
    }

    // Show a success message to your customer
    // There's a risk of the customer closing the window before callback
    // execution. Set up a webhook or plugin to listen for the
    // payment_intent.succeeded event that handles any business critical
    // post-payment actions.
    addMessage(`Payment ${paymentIntent.status}: ${paymentIntent.id}`);
  };

  return (
    <>
      <h1>Grabpay</h1>

      <form id="payment-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <button type="submit">Pay</button>
      </form>
    </>
  );
};

const Grabpay = () => {
    return (
    <Elements stripe={stripePromise}>    <GrabpayForm /></Elements>
    )
};

export default Grabpay;